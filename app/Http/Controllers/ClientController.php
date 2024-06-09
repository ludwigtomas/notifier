<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use App\Http\Resources\ClientResource;
use App\Http\Resources\RepositoryResource;
use App\Models\Client;
use App\Models\Repository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class ClientController extends Controller
{
    public function index(Request $request): Response
    {
        $clients = Client::query()
            ->when($request->search, function ($query, $search) {
                $query->whereAny([
                    'name',
                    'email',
                    'phone',
                ], 'like', '%' . $search . '%');
            })
            ->with('repositories')
            ->orderBy('name')
            ->paginate(10);

        return inertia('Clients/Index', [
            'clients' => ClientResource::collection($clients),
            'filters' => $request->only('search'),
        ]);
    }

    public function show(Client $client): Response
    {
        $client->load('repositories');

        return inertia('Clients/Show', [
            'client' => new ClientResource($client),
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

        $repositories = Repository::query()
            ->whereNotIn('repository_id', $client->repositories->pluck('repository_id'))
            ->get();

        return inertia('Clients/Edit', [
            'client' => new ClientResource($client),
            'repositories' => RepositoryResource::collection($repositories),
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
