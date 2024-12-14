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
        if ('repository_client' === $request->relationship) {
            $repository->clients()->updateExistingPivot($client, [
                'client_email' => $request->client_email,
            ]);
        }

        if ('client_repository' === $request->relationship) {
            $client->repositories()->updateExistingPivot($repository, [
                'client_email' => $request->client_email,
            ]);
        }

        return back();
    }
}
