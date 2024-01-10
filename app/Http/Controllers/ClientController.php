<?php

namespace App\Http\Controllers;

use Inertia\Response;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use App\Http\Resources\ClientResource;
use App\Http\Requests\StoreClientRequest;

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
        return inertia('Clients/Create');
    }

    public function store(StoreClientRequest $request): RedirectResponse
    {
        $client = Client::create($request->validated());

        return to_route('clients.edit', $client->id);
    }

    public function edit(Client $client): Response
    {
        return inertia('Clients/Edit', [
            'client' => $client
        ]);
    }
}
