<?php

namespace App\Jobs;

use App\Mail\DatabaseRepositoryMail;
use App\Models\Repository;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class RepositoryDatabaseJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(
        protected Repository $repository,
        protected string $status,
        protected string $message,
    ) {
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Mail::to('info@ludwigtomas.cz')->send(new DatabaseRepositoryMail(
            $this->repository,
            $this->status,
            $this->message,
        ));
    }

    /**
     * Tags
     */
    public function tags(): array
    {
        return [
            'database',
            'repository:'.$this->repository->id,
        ];
    }
}
