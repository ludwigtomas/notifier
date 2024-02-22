<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Repository;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

class ClientRepositoryController extends Controller
{
    public function detach(Repository $repository, Client $client): RedirectResponse
    {
        $repository->clients()->detach($client);

        return back();
    }

    public function attach(Repository $repository, Client $client): RedirectResponse
    {
        $repository->clients()->attach($client);

        return back();
    }

    public function update(Request $request, Repository $repository, Client $client): RedirectResponse
    {
        $repository->clients()->updateExistingPivot($client, [
            'client_email' => $request->client_email,
        ]);

        return back();
    }
}
