<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateClientRepositoryRequest;
use App\Models\Client;
use App\Models\Repository;
use Illuminate\Http\Request;
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

    public function update(Client $client, Repository $repository, Request $request): RedirectResponse
    {
        $repository->clients()->updateExistingPivot($client, [
            'client_email' => $request->client_email,
        ]);

        return back();
    }
}
