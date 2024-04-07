<?php

namespace App\Jobs;

use App\Mail\RepositoryNotifierMail;
use App\Models\Repository;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class RepositoryNotifierJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(
        protected Repository $repository,
        protected $commit_message,
    ) {
    }

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
}
