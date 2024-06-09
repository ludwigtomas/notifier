<?php

namespace App\Observers;

use App\Models\GitGroup;
use Illuminate\Support\Facades\Cache;

class GitGroupObserver
{
    /**
     * Handle the GitGroup "created" event.
     */
    public function created(GitGroup $gitGroup): void
    {
        Cache::forget('git_groups_count');
    }

    /**
     * Handle the GitGroup "updated" event.
     */
    public function updated(GitGroup $gitGroup): void
    {
        //
    }

    /**
     * Handle the GitGroup "deleted" event.
     */
    public function deleted(GitGroup $gitGroup): void
    {
        //
    }

    /**
     * Handle the GitGroup "restored" event.
     */
    public function restored(GitGroup $gitGroup): void
    {
        //
    }

    /**
     * Handle the GitGroup "force deleted" event.
     */
    public function forceDeleted(GitGroup $gitGroup): void
    {
        //
    }
}
