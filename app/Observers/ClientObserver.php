<?php

namespace App\Observers;

use App\Models\Client;
use Illuminate\Support\Facades\Cache;

class ClientObserver
{
    /**
     * Handle the Client "created" event.
     */
    public function created(Client $client): void
    {
        Cache::forget('clients_count');
    }

    /**
     * Handle the Client "updated" event.
     */
    public function updated(Client $client): void
    {
        //
    }

    /**
     * Handle the Client "deleted" event.
     */
    public function deleted(Client $client): void
    {
        Cache::forget('clients_count');
    }

    /**
     * Handle the Client "restored" event.
     */
    public function restored(Client $client): void
    {
        Cache::forget('clients_count');
    }

    /**
     * Handle the Client "force deleted" event.
     */
    public function forceDeleted(Client $client): void
    {
        Cache::forget('clients_count');
    }
}
