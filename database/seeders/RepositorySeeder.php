<?php

namespace Database\Seeders;

use Carbon\Carbon;
use App\Models\Git;
use App\Models\Repository;
use Illuminate\Support\Str;
use App\Services\GitlabService;
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

        GitlabService::getUserID($gitlab);
        GitlabService::downloadAvatar($gitlab);
        GitlabService::getRepositories($gitlab);
    }
}
