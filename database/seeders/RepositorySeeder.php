<?php

namespace Database\Seeders;

use App\Models\Git;
use App\Services\GitlabService;
use Illuminate\Database\Seeder;

class RepositorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $gitlab = Git::whereSlug('gitlab')->first();

        GitlabService::getRepositories($gitlab);
    }
}
