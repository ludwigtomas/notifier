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
use GuzzleHttp\Exception\ClientException;

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

    public static function downloadAvatar(Git $gitlab): void
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
            Log::error($th->getMessage() . 'download avatar error');
        }
    }

    public static function getRepositories($gitlab): void
    {
        $client = new GuzzleClient([
            'base_uri' => 'https://gitlab.com/api/v4/',
        ]);

        try {
            $response = $client->get('groups/64297613/projects', [
                'headers' => [
                    'Authorization' => 'Bearer ' . $gitlab->api_token,
                ],
                'query' => [
                    'order_by' => 'updated_at',
                    'sort' => 'desc',
                ],
            ]);

            $repositories_api = json_decode($response->getBody()->getContents());

            foreach ($repositories_api as $repository_api) {

                $repository = Repository::updateOrCreate(
                    [
                        'repository_id' => $repository_api->id
                    ],
                    [
                        'name' => $repository_api->name,
                        'slug' => Str::slug($repository_api->name),
                        'repository_url' => $repository_api->web_url,

                        'repository_created_at' => Carbon::parse($repository_api->created_at),
                    ]
                );

                self::getRepositorylastCommit($repository);
                self::getRepositoryAvatar($repository, $repository_api, $gitlab);
            }
        } catch (Throwable $th) {
            Log::error($th->getMessage() . 'get repositories error', ['gitlab' => $gitlab]);
        }
    }

    public static function getRepositorylastCommit(Repository $repository): void
    {
        $client = new GuzzleClient([
            'base_uri' => 'https://gitlab.com/api/v4/',
        ]);

        try {
            $response = $client->get('projects/' . $repository->repository_id . '/repository/commits', [
                'headers' => [
                    'Authorization' => 'Bearer ' . self::getGitlab()->api_token,
                ],
                'query' => [
                    'per_page' => 1,
                    'page' => 1,
                ],
            ]);

            $repository_api = json_decode($response->getBody()->getContents());

            $commit_message = $repository_api[0]->title;

            $repository->last_commit_at < Carbon::parse($repository_api[0]->committed_date) ? self::sendNotificationToClient($repository, $commit_message) : null;

            // TODO: refactor
            $create_date = Carbon::parse($repository_api[0]->created_at);

            $repository->update([
                'last_commit_at' => $create_date,
            ]);
        } catch (Throwable $th) {
            Log::error($th->getMessage() . 'get repository last commit error', ['repository' => $repository]);
        }
    }

    public static function getRepositoriesLastCommit(): void
    {
        $repositories = Repository::all();

        foreach ($repositories as $repository) {
            self::getRepositorylastCommit($repository);
            self::getRepositoryAvatar($repository);
        }
    }

    public static function getRepositoryAvatar(Repository $repository, $repository_api = null, $gitlab = null)
    {
        $client = new GuzzleClient([
            'base_uri' => 'https://gitlab.com/api/v4/',
        ]);

        try {
            $response = $client->get('projects/' . $repository->repository_id . '/avatar', [
                'headers' => [
                    'Authorization' => 'Bearer ' . self::getGitlab()->api_token,
                ],
            ]);

            if ($response->getStatusCode() === 200) {
                $body = $response->getBody();

                $path = 'avatars/' . $repository->slug . '.png';

                Storage::disk('public')->put($path, $body);

                $repository->update([
                    'avatar' => $repository->slug . '.png',
                ]);
            }
        } catch (ClientException $e) {
            // TODO: Handle 404 error
        }
    }

    public static function getGroups()
    {
        $client = new GuzzleClient([
            'base_uri' => 'https://gitlab.com/api/v4/',
        ]);

        try {
            $response = $client->request('GET', 'groups', [
                'headers' => [
                    'Authorization' => 'Bearer ' . self::getGitlab()->api_token,
                ],
            ]);

            $groups_api = json_decode($response->getBody()->getContents(), true);

            $groups = [];

            foreach ($groups_api as $group_api) {
                $group_api['parent_id'] ? null : $groups[] = $group_api;
            }

            return response()->json([
                'success' => true,
                'data' => $groups,
            ], 200);
        } catch (Throwable $th) {
            Log::error($th->getMessage() . 'get groups error');

            return response()->json([
                'success' => false,
                'message' => 'get groups error',
            ], 500);
        }
    }

    public static function getGroupDetail($group_id)
    {
        $client = new GuzzleClient([
            'base_uri' => 'https://gitlab.com/api/v4/',
        ]);

        try {
            $response = $client->request('GET', 'groups/' . $group_id, [
                'headers' => [
                    'Authorization' => 'Bearer ' . self::getGitlab()->api_token,
                ],
            ]);

            $group_api = json_decode($response->getBody()->getContents(), true);

            return response()->json([
                'success' => true,
                'data' => $group_api,
            ], 200);
        } catch (Throwable $th) {
            Log::error($th->getMessage() . 'get group detail error');

            return response()->json([
                'success' => false,
                'message' => 'get group detail error',
            ], 500);
        }
    }

    public static function getRepository($repository_id)
    {
        $client = new GuzzleClient([
            'base_uri' => 'https://gitlab.com/api/v4/',
        ]);

        try {
            $response = $client->request('GET', 'projects/' . $repository_id, [
                'headers' => [
                    'Authorization' => 'Bearer ' . self::getGitlab()->api_token,
                ],
            ]);

            $repository_api = json_decode($response->getBody()->getContents(), true);

            return $repository_api;
        } catch (Throwable $th) {
            Log::error($th->getMessage() . 'get repository error');

            return response()->json([
                'success' => false,
                'message' => 'get repository error',
            ], 500);
        }
    }

    // get subgroups from a group
    public static function getSubGroups($group_id)
    {
        $client = new GuzzleClient([
            'base_uri' => 'https://gitlab.com/api/v4/',
        ]);

        try {
            $response = $client->request('GET', 'groups/' . $group_id . '/subgroups', [
                'headers' => [
                    'Authorization' => 'Bearer ' . self::getGitlab()->api_token,
                ],
            ]);

            $subgroups_api = json_decode($response->getBody()->getContents(), true);

            return response()->json([
                'success' => true,
                'data' => $subgroups_api,
            ], 200);
        } catch (Throwable $th) {
            Log::error($th->getMessage() . 'get subgroups error');

            return response()->json([
                'success' => false,
                'message' => 'get subgroups error',
            ], 500);
        }
    }

    public static function getGroupRepositories($group_id)
    {
        $client = new GuzzleClient([
            'base_uri' => 'https://gitlab.com/api/v4/',
        ]);

        try {
            $response = $client->request('GET', 'groups/' . $group_id . '/projects', [
                'headers' => [
                    'Authorization' => 'Bearer ' . self::getGitlab()->api_token,
                ],
            ]);

            $repositories_api = json_decode($response->getBody()->getContents(), true);

            return response()->json([
                'success' => true,
                'data' => $repositories_api,
            ], 200);
        } catch (Throwable $th) {
            Log::error($th->getMessage() . 'get group repositories error');

            return response()->json([
                'success' => false,
                'message' => 'get group repositories error',
            ], 500);
        }
    }

    private static function getGitlab(): Git
    {
        return Git::whereSlug('gitlab')->first();
    }

    private static function sendNotificationToClient(Repository $repository, $commit_message = null): void
    {
        RepositoryNotifierJob::dispatch($repository, $commit_message);
    }
}
