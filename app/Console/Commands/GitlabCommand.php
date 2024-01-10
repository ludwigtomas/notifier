<?php

namespace App\Console\Commands;

use App\Services\GitLabService;
use Illuminate\Console\Command;

class GitlabCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'work-gitlab';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $gitlab = GitLabService::getUserID();

        $this->info($gitlab);
    }
}
