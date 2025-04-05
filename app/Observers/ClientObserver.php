<?php

namespace App\Observers;

use App\Models\Client;
use Illuminate\Support\Facades\Cache;

class ClientObserver
{
    public function created(Client $client): void
    {
        Cache::forget('clients_count');
    }

    public function updated(Client $client): void
    {
        Cache::forget('clients_count');
    }

    public function deleted(Client $client): void
    {
        Cache::forget('clients_count');
    }

    public function restored(Client $client): void
    {
        Cache::forget('clients_count');
    }

    public function forceDeleted(Client $client): void
    {
        Cache::forget('clients_count');
    }
}
