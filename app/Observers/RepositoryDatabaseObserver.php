<?php

namespace App\Observers;

use App\Models\RepositoryDatabase;
use App\Notifications\RepositoryDatabaseNotification;

class RepositoryDatabaseObserver
{
    /**
     * Handle the RepositoryDatabase "created" event.
     */
    public function created(RepositoryDatabase $repository_database): void
    {
        $repository_database->notify(new RepositoryDatabaseNotification('created'));
    }

    /**
     * Handle the RepositoryDatabase "updated" event.
     */
    public function updated(RepositoryDatabase $repository_database): void
    {
        $repository_database->notify(new RepositoryDatabaseNotification('updated'));
    }

    /**
     * Handle the RepositoryDatabase "deleted" event.
     */
    public function deleted(RepositoryDatabase $repository_database): void
    {
        $repository_database->notify(new RepositoryDatabaseNotification('deleted'));
    }

    /**
     * Handle the RepositoryDatabase "restored" event.
     */
    public function restored(RepositoryDatabase $repository_database): void
    {
        //
    }

    /**
     * Handle the RepositoryDatabase "force deleted" event.
     */
    public function forceDeleted(RepositoryDatabase $repository_database): void
    {
        //
    }
}
