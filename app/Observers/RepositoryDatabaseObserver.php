<?php

namespace App\Observers;

use App\Models\RepositoryDatabase;
use App\Notifications\RepositoryDatabaseNotification;

class RepositoryDatabaseObserver
{
    public function created(RepositoryDatabase $repository_database): void
    {
        $repository_database->notify(new RepositoryDatabaseNotification('created'));
    }

    public function updated(RepositoryDatabase $repository_database): void
    {
        $repository_database->notify(new RepositoryDatabaseNotification('updated'));
    }

    public function deleted(RepositoryDatabase $repository_database): void
    {
        $repository_database->notify(new RepositoryDatabaseNotification('deleted'));
    }

    public function restored(RepositoryDatabase $repository_database): void {}

    public function forceDeleted(RepositoryDatabase $repository_database): void {}
}
