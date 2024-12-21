<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateClientRepositoryRequest;
use App\Models\Client;
use App\Models\Repository;
use Illuminate\Http\RedirectResponse;

class ClientRepositoryController extends Controller
{
    public function detach(Client $client, Repository $repository): RedirectResponse
    {
        $repository->clients()->detach($client);

        return back();
    }

    public function attach(Client $client, Repository $repository): RedirectResponse
    {
        $repository->clients()->attach($client);

        return back();
    }

    public function update(Client $client, Repository $repository, UpdateClientRepositoryRequest $request): RedirectResponse
    {
        $data = ['client_email_secondary' => $request->client_email];
    
        match ($request->relationship) {
            'repository_client' => $repository->clients()->updateExistingPivot($client, $data),
            'client_repository' => $client->repositories()->updateExistingPivot($repository, $data),
            default => null,
        };

        return back();
    }
}
