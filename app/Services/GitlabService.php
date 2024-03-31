<?php

namespace App\Services;

use App\Jobs\RepositoryNotifierJob;
use App\Models\Git;
use App\Models\Repository;
use Carbon\Carbon;
use GuzzleHttp\Client as GuzzleClient;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Throwable;

class GitlabService
{
    public static function getUserID(Git $gitlab): void
    {
        $client = new GuzzleClient([
            'base_uri' => 'https://gitlab.com/api/v4/',
        ]);

        try {
            $response = $client->request('GET', 'users?username=' . $gitlab->username);

            $body = json_decode($response->getBody()->getContents())[0];

            $gitlab->update([
                'user_id' => $body->id,
                'username' => $body->username,
                'avatar_url' => $body->avatar_url,
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
            $response = $client->request('GET', $gitlab->avatar_url);

            $body = $response->getBody();

            $path = 'avatars/' . $gitlab->username . '.png';

            Storage::put($path, $body);

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
            $response = $client->request('GET', 'groups/64297613/projects?order_by=updated_at&sort=desc', [
                'headers' => [
                    'Authorization' => 'Bearer ' . $gitlab->api_token,
                ],
            ]);

            $repositories_api = json_decode($response->getBody()->getContents());

            foreach ($repositories_api as $repository_api) {

                $repository = Repository::query()
                    ->withTrashed()
                    ->find($repository_api->id);


                if ($repository) {
                    $repository->last_commit_at < Carbon::parse($repository_api->last_activity_at) ? self::sendNotificationToClient($repository) : null;

                    $repository->update([
                        'name' => $repository_api->name,
                        'slug' => Str::slug($repository_api->name),
                        'repository_url' => $repository_api->web_url,

                        'last_commit_at' => Carbon::parse($repository_api->last_activity_at),
                        'repository_created_at' => Carbon::parse($repository_api->created_at),
                    ]);
                } else {
                    $repository = $gitlab->repositories()->create([
                        'id' => $repository_api->id,
                        'name' => $repository_api->name,
                        'slug' => Str::slug($repository_api->name),
                        'repository_url' => $repository_api->web_url,

                        'last_commit_at' => Carbon::parse($repository_api->last_activity_at),
                        'repository_created_at' => Carbon::parse($repository_api->created_at),
                    ]);
                }

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
            $response = $client->request('GET', 'projects/' . $repository->id . '/repository/commits?per_page=1&page=1', [
                'headers' => [
                    'Authorization' => 'Bearer ' . $gitlab->api_token,
                ],
            ]);

            $repository_api = json_decode($response->getBody()->getContents());

            $repository->last_commit_at < Carbon::parse($repository_api[0]->committed_date) ? self::sendNotificationToClient($repository) : null;

            // $repository->update([
            //     'last_commit_at' => Carbon::parse($repository_api[0]->created_at),
            // ]);
        } catch (Throwable $th) {
            Log::error($th->getMessage() . 'get repository last commit error', ['repository' => $repository]);
        }
    }

    private static function sendNotificationToClient(Repository $repository)
    {
        RepositoryNotifierJob::dispatch($repository);
    }

    private static function downloadRepositoryAvatar(Repository $repository, $repository_api, Git $gitlab): void
    {
        if ($repository_api->avatar_url) {
            try {
                $client = new GuzzleClient([
                    'base_uri' => 'https://gitlab.com/api/v4/',
                ]);

                $response = $client->request('GET', 'https://gitlab.com/api/v4/projects/' . $repository->id . '/avatar', [
                    'headers' => [
                        'Authorization' => 'Bearer ' . $gitlab->api_token,
                    ],
                ]);

                $body = $response->getBody();

                $path = 'avatars/' . $repository->slug . '.png';

                $repository->update([
                    'avatar' => $repository->slug . '.png',
                ]);

                Storage::put($path, $body);
            } catch (Throwable $th) {
                Log::error($th->getMessage() . 'download repository avatar error', ['repository' => $repository]);
            }
        }
    }
}
