<?php

namespace App\Console\Commands;

use App\Services\GitlabService;
use Illuminate\Console\Command;

class GitlabCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'gitlab:repositories-sync';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sync repositories from Gitlab';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        GitlabService::syncRepositoriesWithGitlab();
    }
}
