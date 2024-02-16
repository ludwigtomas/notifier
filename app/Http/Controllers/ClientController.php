<?php

namespace App\Http\Controllers;

use Inertia\Response;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use App\Http\Resources\ClientResource;
use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use App\Http\Resources\RepositoryResource;
use App\Models\Repository;

class ClientController extends Controller
{
    public function index(): Response
    {
        $clients = Client::query()
        ->with('repositories')
        ->withCount('repositories')
        ->orderBy('name')
        ->get();

        return inertia('Clients/Index', [
            'clients' => ClientResource::collection($clients),
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
        $client->load('repositories');

        return inertia('Clients/Edit', [
            'client' => new ClientResource($client),
            'repositories' => RepositoryResource::collection(Repository::all()),
        ]);
    }

    public function update(UpdateClientRequest $request, Client $client): RedirectResponse
    {
        $client->update([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'ico' => $request->ico,
        ]);

        $client->repositories()->sync($request->repositories);

        return to_route('clients.edit', $client->id);
    }

    public function destroy(Client $client): RedirectResponse
    {
        $client->delete();

        return to_route('clients.index');
    }
}
