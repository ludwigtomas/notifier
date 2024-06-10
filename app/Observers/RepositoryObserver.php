<?php

namespace App\Observers;

use App\Models\Repository;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;
use App\Notifications\RepositoryNotification;
use App\Notifications\RepositoryDatabaseNotification;


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
