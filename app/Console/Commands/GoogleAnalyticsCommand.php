<?php

namespace App\Console\Commands;

use App\Services\GoogleAnalyticsService;
use Illuminate\Console\Command;

class GoogleAnalyticsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'google:analytics';

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
        GoogleAnalyticsService::googleAnalyticsForRepositories();
    }
}
