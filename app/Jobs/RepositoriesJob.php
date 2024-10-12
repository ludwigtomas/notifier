<?php

namespace App\Jobs;

use App\Services\GitlabService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class RepositoriesJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct()
    {
    }

    public function handle(): void
    {
        GitlabService::getRepositoriesLastCommit();
    }

    public function tags(): array
    {
        return [
            'repositories',
        ];
    }
}
