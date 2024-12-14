<?php

namespace Database\Seeders;

use App\Models\Git;
use App\Models\GitGroup;
use GuzzleHttp\Client as GuzzleClient;
use Illuminate\Database\Seeder;

class GitGroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $gitlab = Git::whereSlug('gitlab')->first();

        $groups = self::getGroups();

        foreach ($groups as $group) {

            GitGroup::create([
                'group_id' => $group['id'],
                'git_id' => $gitlab->id,
                'name' => $group['name'],
                'web_url' => $group['web_url'],
                'parent_id' => null,
            ]);

            $groupe = GitGroup::find($group['id']);

            $subgroups = self::getSubGroups($group['id']);
            foreach ($subgroups as $subgroup) {
                GitGroup::create([
                    'git_id' => $gitlab->id,
                    'group_id' => $subgroup['id'],
                    'name' => $subgroup['name'],
                    'web_url' => $subgroup['web_url'],
                    'parent_id' => $groupe->group_id,
                ]);
            }
        }

    }

    private static function getGroups($create = false)
    {
        $client = new GuzzleClient([
            'base_uri' => 'https://gitlab.com/api/v4/',
        ]);

        $response = $client->get('groups', [
            'headers' => [
                'Authorization' => 'Bearer '.self::getGitlab()->api_token,
            ],
        ]);

        $groups_api = json_decode($response->getBody()->getContents(), true);

        $groups = [];

        foreach ($groups_api as $group_api) {
            $group_api['parent_id'] ? null : $groups[] = $group_api;
        }

        return $groups;
    }

    private static function getSubGroups($group_id)
    {
        $client = new GuzzleClient([
            'base_uri' => 'https://gitlab.com/api/v4/',
        ]);

        $response = $client->request('GET', 'groups/'.$group_id.'/subgroups', [
            'headers' => [
                'Authorization' => 'Bearer '.self::getGitlab()->api_token,
            ],
        ]);

        $subgroups_api = json_decode($response->getBody()->getContents(), true);

        return $subgroups_api;
    }

    private static function getGitlab(): Git
    {
        return Git::whereSlug('gitlab')->first();
    }
}
