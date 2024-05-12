<?php

namespace App\Services;

use Throwable;
use Carbon\Carbon;
use App\Models\Git;
use App\Models\Repository;
use Illuminate\Support\Str;
use App\Jobs\RepositoryNotifierJob;
use Illuminate\Support\Facades\Log;
use GuzzleHttp\Client as GuzzleClient;
use Illuminate\Support\Facades\Storage;

class GitlabService
{
    public static function getUserID(Git $gitlab): void
    {
        $client = new GuzzleClient([
            'base_uri' => 'https://gitlab.com/api/v4/',
        ]);

        try {
            $response = $client->request('GET', 'users', [
                'query' => [
                    'username' => $gitlab->username,
                ],
            ]);

            $body = json_decode($response->getBody()->getContents())[0];

            $gitlab->update([
                'user_id' => $body->id,
                'username' => $body->username,
                'user_avatar_url' => $body->avatar_url,
            ]);

            self::downloadAvatar($gitlab);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public static function downloadAvatar($gitlab): void
    {
        $client = new GuzzleClient([
            'base_uri' => 'https://gitlab.com/api/v4/',
        ]);

        try {
            $response = $client->request('GET', $gitlab->user_avatar_url);

            $body = $response->getBody();

            $path = 'avatars/' . $gitlab->username . '.png';

            Storage::disk('public')->put($path, $body);
        } catch (Throwable $th) {
            Log::error($th->getMessage() . 'download avatar error', ['gitlab' => $gitlab]);
        }
    }

    public static function getRepositories($gitlab): void
    {
        $client = new GuzzleClient([
            'base_uri' => 'https://gitlab.com/api/v4/',
        ]);

        try {
            $response = $client->request('GET', 'groups/64297613/projects', [
                'headers' => [
                    'Authorization' => 'Bearer ' . $gitlab->api_token,
                ],
                'query' => [
                    'order_by' => 'updated_at',
                    'sort' => 'desc',
                ]
            ]);

            $repositories_api = json_decode($response->getBody()->getContents());

            foreach ($repositories_api as $repository_api) {
                $repository = Repository::query()
                    ->withTrashed()
                    ->find($repository_api->id);

                if ($repository) {

                    $repository->update([
                        'name' => $repository_api->name,
                        'slug' => Str::slug($repository_api->name),
                        'repository_url' => $repository_api->web_url,

                        'repository_created_at' => Carbon::parse($repository_api->created_at),
                    ]);
                } else {
                    $repository = $gitlab->repositories()->create([
                        'id' => $repository_api->id,
                        'name' => $repository_api->name,
                        'slug' => Str::slug($repository_api->name),
                        'repository_url' => $repository_api->web_url,

                        'repository_created_at' => Carbon::parse($repository_api->created_at),
                    ]);
                }

                self::getRepositorylastCommit($repository);
                self::downloadRepositoryAvatar($repository, $repository_api, $gitlab);
            }
        } catch (Throwable $th) {
            Log::error($th->getMessage() . 'get repositories error', ['gitlab' => $gitlab]);
        }
    }

    public static function getRepositorylastCommit($repository): void
    {
        $gitlab = Git::whereSlug('gitlab')->first();

        $client = new GuzzleClient([
            'base_uri' => 'https://gitlab.com/api/v4/',
        ]);

        try {
            $response = $client->request('GET', 'projects/' . $repository->id . '/repository/commits', [
                'headers' => [
                    'Authorization' => 'Bearer ' . $gitlab->api_token,
                ],
                'query' => [
                    'per_page' => 1,
                    'page' => 1,
                ]
            ]);

            $repository_api = json_decode($response->getBody()->getContents());

            $commit_message = $repository_api[0]->title;

            $repository->last_commit_at < Carbon::parse($repository_api[0]->committed_date) ? self::sendNotificationToClient($repository, $commit_message) : null;

            $repository->update([
                'last_commit_at' => Carbon::parse($repository_api[0]->created_at),
            ]);
        } catch (Throwable $th) {
            Log::error($th->getMessage() . 'get repository last commit error', ['repository' => $repository]);
        }
    }

    private static function sendNotificationToClient(Repository $repository, $commit_message = null): void
    {
        RepositoryNotifierJob::dispatch($repository, $commit_message);
    }

    private static function downloadRepositoryAvatar(Repository $repository, $repository_api, Git $gitlab): void
    {
        if ($repository_api->user_avatar_url) {
            try {
                $client = new GuzzleClient([
                    'base_uri' => 'https://gitlab.com/api/v4/',
                ]);

                $response = $client->request('GET', 'projects/' . $repository->id . '/avatar', [
                    'headers' => [
                        'Authorization' => 'Bearer ' . $gitlab->api_token,
                    ],
                ]);

                $body = $response->getBody();

                $path = 'avatars/' . $repository->slug . '.png';

                $repository->update([
                    'avatar' => $repository->slug . '.png',
                ]);

                Storage::disk('public')->put($path, $body);
            } catch (Throwable $th) {
                Log::error($th->getMessage() . 'download repository avatar error', ['repository' => $repository]);
            }
        }
    }


    public static function getGroups($gitlab)
    {
        $client = new GuzzleClient([
            'base_uri' => 'https://gitlab.com/api/v4/',
        ]);

        try {
            $response = $client->request('GET', 'groups', [
                'headers' => [
                    'Authorization' => 'Bearer ' . $gitlab->api_token,
                ],
            ]);

            $groups_api = json_decode($response->getBody()->getContents());

            return $groups_api;

        } catch (Throwable $th) {
            Log::error($th->getMessage() . 'get groups error', ['gitlab' => $gitlab]);
        }
    }
}
