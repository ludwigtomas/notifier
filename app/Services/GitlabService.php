<?php

namespace App\Services;

use Carbon\Carbon;
use App\Models\Repository;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use GuzzleHttp\Client as GuzzleClient;
use Illuminate\Support\Facades\Storage;

class GitLabService
{
    public static function getUserID($gitlab): void
    {
        $client = new GuzzleClient([
            "base_uri" => "https://gitlab.com/api/v4/",
        ]);

        try {
            $response = $client->request('GET', 'users?username=' . $gitlab->username);

            $body = json_decode($response->getBody()->getContents())[0];

            $gitlab->update([
                'user_id' => $body->id,
                'username' => $body->username,
                'avatar_url' => $body->avatar_url,
            ]);

            // call downloadAvatar() method
            self::downloadAvatar($gitlab);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public static function downloadAvatar($gitlab)
    {

        $client = new GuzzleClient([
            "base_uri" => "https://gitlab.com/api/v4/",
        ]);

        try {
            $response = $client->request('GET', $gitlab->avatar_url);

            $body = $response->getBody();

            $path = "avatars/" . $gitlab->username . ".png";
            Storage::deleteDirectory('path');
            Storage::put($path, $body);
        } catch (\Throwable $th) {
            Log::error($th->getMessage() . 'download avatar error', ['gitlab' => $gitlab]);
        }
    }

    public static function getRepositories($gitlab)
    {
        $client = new GuzzleClient([
            "base_uri" => "https://gitlab.com/api/v4/",
        ]);

        try {
            $response = $client->request('GET', 'groups/64297613/projects?order_by=updated_at&sort=desc', [
                'headers' => [
                    'Authorization' => 'Bearer ' . $gitlab->api_token,
                ],
            ]);

            $repositories = json_decode($response->getBody()->getContents());

            foreach ($repositories as $repository_api) {

                $repository = Repository::where('id', $repository_api->id)->first();

                if ($repository) {
                    $repository->update([
                        'name' => $repository_api->name,
                        'slug' => Str::slug($repository_api->name),
                        'repository_url' => $repository_api->web_url,

                        'last_activity_at' => Carbon::parse($repository_api->last_activity_at),
                        'repository_created_at' => Carbon::parse($repository_api->created_at),
                    ]);
                } else {
                    $gitlab->repositories()->create([
                        'id' => $repository_api->id,
                        'name' => $repository_api->name,
                        'slug' => Str::slug($repository_api->name),
                        'repository_url' => $repository_api->web_url,

                        'last_activity_at' => Carbon::parse($repository_api->last_activity_at),
                        'repository_created_at' => Carbon::parse($repository_api->created_at),
                    ]);
                }
            }
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public static function getCommitsCount()
    {
        return 10;
    }
}
