<?php

namespace App\Observers;

use App\Models\Repository;
use App\Notifications\RepositoryNotification;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class RepositoryObserver
{
    public function __construct()
    {
        Cache::forget('notifications_count');
    }

    public function creating(Repository $repository): void
    {
        $repository->database_verification_code = Str::uuid();
    }

    public function created(Repository $repository): void
    {
        Cache::forget('repositories_count');

        $repository->notify(new RepositoryNotification('created'));
    }

    /**
     * Handle the Repository "updated" event.
     */
    public function updated(Repository $repository): void
    {
        $repository->notify(new RepositoryNotification('updated'));
    }

    /**
     * Handle the Repository "deleted" event.
     */
    public function deleted(Repository $repository): void
    {
        $repository->notify(new RepositoryNotification('deleted'));
    }

    /**
     * Handle the Repository "restored" event.
     */
    public function restored(Repository $repository): void
    {
        $repository->notify(new RepositoryNotification('restored'));
    }

    /**
     * Handle the Repository "force deleted" event.
     */
    public function forceDeleted(Repository $repository): void
    {
        $repository->notify(new RepositoryNotification('forceDeleted'));
    }
}
