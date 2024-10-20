<?php

namespace App\Observers;

use App\Models\GitGroup;
use App\Notifications\GitGroupNotification;
use Illuminate\Support\Facades\Cache;

class GitGroupObserver
{
    /**
     * Handle the GitGroup "created" event.
     */
    public function created(GitGroup $git_group): void
    {
        Cache::forget('git_groups_count');

        $git_group->notify(new GitGroupNotification('created'));
    }

    /**
     * Handle the GitGroup "updated" event.
     */
    public function updated(GitGroup $gitGroup): void
    {
        $gitGroup->notify(new GitGroupNotification('updated'));
    }

    /**
     * Handle the GitGroup "deleted" event.
     */
    public function deleted(GitGroup $gitGroup): void
    {
        Cache::forget('git_groups_count');
    }

    /**
     * Handle the GitGroup "restored" event.
     */
    public function restored(GitGroup $gitGroup): void
    {
        Cache::forget('git_groups_count');
    }

    /**
     * Handle the GitGroup "force deleted" event.
     */
    public function forceDeleted(GitGroup $gitGroup): void
    {
        Cache::forget('git_groups_count');
    }
}
