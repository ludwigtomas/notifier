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
    use Dispatchable;
    use InteractsWithQueue;
    use Queueable;
    use SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(
        protected Repository $repository,
        protected string $commit_message,
    ) {}

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $clients = $this->repository->clients;

        foreach ($clients as $client) {

            $client_email = $client->pivot->client_email ?? $client->email;

            Mail::to('ludwig@devuni.cz')->send(new RepositoryNotifierMail(
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
            'mrdka',
            'repository:' . $this->repository->repository_id,
        ];
    }
}
