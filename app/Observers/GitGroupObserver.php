<?php

namespace App\Observers;

use App\Models\GitGroup;
use App\Notifications\GitGroupNotification;
use Illuminate\Support\Facades\Cache;

class GitGroupObserver
{
    public function created(GitGroup $git_group): void
    {
        Cache::forget('git_groups_count');

        $git_group->notify(new GitGroupNotification('created'));
    }

    public function updated(GitGroup $gitGroup): void
    {
        Cache::forget('git_groups_count');

        $gitGroup->notify(new GitGroupNotification('updated'));
    }

    public function deleted(GitGroup $gitGroup): void
    {
        Cache::forget('git_groups_count');
    }

    public function restored(GitGroup $gitGroup): void
    {
        Cache::forget('git_groups_count');
    }

    public function forceDeleted(GitGroup $gitGroup): void
    {
        Cache::forget('git_groups_count');
    }
}
