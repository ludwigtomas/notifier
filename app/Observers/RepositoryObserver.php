<?php

namespace App\Observers;

use App\Models\Repository;
use App\Notifications\RepositoryNotification;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class RepositoryObserver
{
    public function creating(Repository $repository): void
    {
        $repository->database_verification_code = Str::uuid();
        $repository->slug = Str::slug(str_replace('.', '-', $repository->name));
    }

    public function created(Repository $repository): void
    {
        Cache::forget('repositories_count');

        $repository->notify(new RepositoryNotification('created'));
    }

    public function updating(Repository $repository): void
    {
        $repository->slug = Str::slug(str_replace('.', '-', $repository->name));
    }

    public function updated(Repository $repository): void
    {
        Cache::forget('repositories_count');

        $repository->notify(new RepositoryNotification('updated'));
    }

    public function deleted(Repository $repository): void
    {
        Cache::forget('repositories_count');

        $repository->notify(new RepositoryNotification('deleted'));
    }

    public function restored(Repository $repository): void
    {
        Cache::forget('repositories_count');

        $repository->notify(new RepositoryNotification('restored'));
    }

    public function forceDeleted(Repository $repository): void
    {
        Cache::forget('repositories_count');

        $repository->notify(new RepositoryNotification('forceDeleted'));
    }
}
