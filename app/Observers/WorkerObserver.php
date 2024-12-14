<?php

namespace App\Observers;

use App\Models\Worker;
use Opcodes\LogViewer\Facades\Cache;

class WorkerObserver
{
     /**
     * Handle the Worker "created" event.
     */
    public function created(Worker $worker): void
    {
        Cache::forget('workers_count');
    }

    /**
     * Handle the Worker "updated" event.
     */
    public function updated(Worker $worker): void
    {
        //
    }

    /**
     * Handle the Worker "deleted" event.
     */
    public function deleted(Worker $worker): void
    {
        Cache::forget('workers_count');
    }

    /**
     * Handle the Worker "restored" event.
     */
    public function restored(Worker $worker): void {}

    /**
     * Handle the Worker "force deleted" event.
     */
    public function forceDeleted(Worker $worker): void
    {
        Cache::forget('workers_count');
    }
}
