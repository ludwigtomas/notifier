<?php

namespace App\Observers;

use App\Models\Hosting;
use App\Notifications\RepositoryNotification;
use Illuminate\Support\Facades\Cache;

class HostingObserver
{
    /**
     * Handle the Hosting "created" event.
     */
    public function created(Hosting $hosting): void
    {
        Cache::forget('hostings_count');

        Cache::forget('notifications_count');
    }

    /**
     * Handle the Hosting "updated" event.
     */
    public function updated(Hosting $hosting): void
    {
        $hosting->notify(new RepositoryNotification('updated'));

        Cache::forget('notifications_count');
    }

    /**
     * Handle the Hosting "deleted" event.
     */
    public function deleted(Hosting $hosting): void
    {
        Cache::forget('hostings_count');
    }

    /**
     * Handle the Hosting "restored" event.
     */
    public function restored(Hosting $hosting): void {}

    /**
     * Handle the Hosting "force deleted" event.
     */
    public function forceDeleted(Hosting $hosting): void
    {
        Cache::forget('hostings_count');
    }
}
