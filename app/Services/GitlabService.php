<?php

namespace App\Services;

use App\Models\Git;
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
                    'Authorization' => 'Bearer '. $gitlab->api_token,
                ],
            ]);

            $body = json_decode($response->getBody()->getContents());

            foreach ($body as $repository) {
                $gitlab->repositories()->create([
                    'id' => $repository->id,
                    'name' => $repository->name,
                    'slug' => Str::slug($repository->name),
                    'repository_url' => $repository->web_url,

                    'updated_at' => $repository->last_activity_at,
                    'created_at' => $repository->created_at,
                ]);
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
