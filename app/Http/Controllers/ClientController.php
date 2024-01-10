<?php

namespace App\Http\Controllers;

use Inertia\Response;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use App\Http\Resources\ClientResource;
use App\Http\Requests\StoreClientRequest;
use App\Http\Resources\RepositoryResource;
use App\Models\Repository;

class ClientController extends Controller
{
    public function index(): Response
    {
        return inertia('Clients/Index', [
            'clients' => ClientResource::collection(Client::all()),
        ]);
    }

    public function create(): Response
    {
        return inertia('Clients/Create', [
            'repositories' => RepositoryResource::collection(Repository::all()),
        ]);
    }

    public function store(StoreClientRequest $request): RedirectResponse
    {
        $client = Client::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'ico' => $request->ico,
        ]);

        $client->repositories()->sync($request->repositories);

        return to_route('clients.edit', $client->id);
    }

    public function edit(Client $client): Response
    {
        return inertia('Clients/Edit', [
            'client' => new ClientResource($client),
            'repositories' => RepositoryResource::collection(Repository::all()),
        ]);
    }
}
