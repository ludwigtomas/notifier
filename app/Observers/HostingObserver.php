<?php

namespace App\Observers;

use App\Models\Hosting;
use App\Notifications\RepositoryNotification;
use Illuminate\Support\Facades\Cache;

class HostingObserver
{
    public function created(Hosting $hosting): void
    {
        Cache::forget('hostings_count');
    }

    public function updated(Hosting $hosting): void
    {
        $hosting->notify(new RepositoryNotification('updated'));
        Cache::forget('hostings_count');
    }

    public function deleted(Hosting $hosting): void
    {
        Cache::forget('hostings_count');
    }

    public function restored(Hosting $hosting): void {}

    public function forceDeleted(Hosting $hosting): void
    {
        Cache::forget('hostings_count');
    }
}
