<?php

namespace App\Observers;

use App\Models\Notification;
use Illuminate\Support\Facades\Cache;

class NotificationObserver
{
    public function created(Notification $notification): void
    {
        Cache::forget('notifications_count');
    }

    public function updated(Notification $notification): void
    {
        Cache::forget('notifications_count');
    }

    public function deleted(Notification $notification): void
    {
        Cache::forget('notifications_count');
    }

    public function restored(Notification $notification): void {}

    public function forceDeleted(Notification $notification): void {}
}
