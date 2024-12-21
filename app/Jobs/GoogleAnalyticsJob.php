<?php

namespace App\Jobs;

use App\Models\Repository;
use App\Services\GoogleAnalyticsService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class GoogleAnalyticsJob implements ShouldQueue
{
    use Dispatchable;
    use InteractsWithQueue;
    use Queueable;
    use SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(
        protected Repository $repository,
    ) {}

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        GoogleAnalyticsService::googleAnalyticsForRepository($this->repository);
    }

    /**
     * Tags
     */
    public function tags(): array
    {
        return [
            'google_analytics',
            'repository:' . $this->repository->repository_id,
        ];
    }
}
