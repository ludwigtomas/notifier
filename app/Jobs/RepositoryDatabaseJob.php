<?php

namespace App\Jobs;

use Exception;
use App\Models\Repository;
use Illuminate\Bus\Queueable;
use App\Mail\DatabaseRepositoryMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Contracts\Queue\ShouldBeUnique;

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
            'repository:' . $this->repository->id,
        ];
    }
}
