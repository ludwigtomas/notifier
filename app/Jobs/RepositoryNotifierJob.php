<?php

namespace App\Jobs;

use App\Models\Repository;
use Illuminate\Bus\Queueable;
use App\Mail\RepositoryNotifierMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class RepositoryNotifierJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(
        protected Repository $repository,
        protected $commit_message,
    ) {}

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $clients = $this->repository->clients;

        foreach ($clients as $client) {
            Mail::to($client->pivot->client_email ?? $client->email)->send(new RepositoryNotifierMail(
                $this->repository,
                $this->commit_message,
                $client,
            ));
        }
    }

    /**
     * Tags
     */
    public function tags(): array
    {
        return [
            'notifier',
            'repository:' . $this->repository->repository_id,
        ];
    }
}
