<?php

namespace App\Observers;

use App\Models\Worker;
use Opcodes\LogViewer\Facades\Cache;

class WorkerObserver
{
    public function created(Worker $worker): void
    {
        Cache::forget('workers_count');
    }

    public function updated(Worker $worker): void {}

    public function deleted(Worker $worker): void
    {
        Cache::forget('workers_count');
    }

    public function restored(Worker $worker): void {}

    public function forceDeleted(Worker $worker): void
    {
        Cache::forget('workers_count');
    }
}
