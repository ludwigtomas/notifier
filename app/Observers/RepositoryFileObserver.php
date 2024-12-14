<?php

namespace App\Observers;

use App\Models\RepositoryFile;
use App\Notifications\RepositoryFileNotification;

class RepositoryFileObserver
{
    public function created(RepositoryFile $repository_file): void
    {
        $repository_file->notify(new RepositoryFileNotification('created'));
    }

    public function updated(RepositoryFile $repository_file): void
    {
        $repository_file->notify(new RepositoryFileNotification('updated'));
    }

    public function deleted(RepositoryFile $repository_file): void
    {
        $repository_file->notify(new RepositoryFileNotification('deleted'));
    }

    public function restored(RepositoryFile $repository_file): void
    {
        $repository_file->notify(new RepositoryFileNotification('restored'));
    }

    public function forceDeleted(RepositoryFile $repository_file): void
    {
        $repository_file->notify(new RepositoryFileNotification('forceDeleted'));
    }
}
