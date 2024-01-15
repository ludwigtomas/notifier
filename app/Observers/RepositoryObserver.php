<?php

namespace App\Observers;

use App\Models\Repository;
use Illuminate\Support\Str;

class RepositoryObserver
{
    public function creating(Repository $repository): void
    {
        $repository->database_verification_code = Str::uuid();
    }

    /**
     * Handle the Repository "created" event.
     */
    public function created(Repository $repository): void
    {
        //
    }

    /**
     * Handle the Repository "updated" event.
     */
    public function updated(Repository $repository): void
    {
        //
    }

    /**
     * Handle the Repository "deleted" event.
     */
    public function deleted(Repository $repository): void
    {
        //
    }

    /**
     * Handle the Repository "restored" event.
     */
    public function restored(Repository $repository): void
    {
        //
    }

    /**
     * Handle the Repository "force deleted" event.
     */
    public function forceDeleted(Repository $repository): void
    {
        //
    }
}
