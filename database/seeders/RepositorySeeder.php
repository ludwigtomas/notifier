<?php

namespace Database\Seeders;

use Carbon\Carbon;
use App\Models\Git;
use App\Models\Repository;
use Illuminate\Support\Str;
use App\Services\GitLabService;
use Illuminate\Database\Seeder;
use GuzzleHttp\Client as GuzzleClient;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RepositorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $gitlab = Git::whereSlug('gitlab')->first();

        $client = new GuzzleClient([
            "base_uri" => "https://gitlab.com/api/v4/",
        ]);

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
        // GitLabService::getRepositories($gitlab);
    }
}
