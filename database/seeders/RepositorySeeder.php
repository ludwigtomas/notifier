<?php

namespace Database\Seeders;

use App\Models\Git;
use App\Services\GitLabService;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RepositorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $gitlab = Git::whereSlug('gitlab')->first();

        GitLabService::getRepositories($gitlab);
    }
}
