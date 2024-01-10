<?php

namespace App\Services;

use App\Models\Git;
use GuzzleHttp\Client as GuzzleClient;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class GitLabService
{
    public static function getUserID(): void
    {
        $gitlab = Git::where('slug', 'gitlab')->first();

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
            self::downloadAvatar();
            
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public static function downloadAvatar()
    {
        $gitlab = Git::where('slug', 'gitlab')->first();

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

    public static function getRepositories()
    {
    }

    public static function getCommitsCount()
    {
        return 10;
    }
}
