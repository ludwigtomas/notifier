<?php

namespace App\Http\Controllers;

use Inertia\Response;
use App\Models\Client;
use App\Models\Repository;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use App\Http\Resources\ClientResource;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\RepositoryResource;
use App\Http\Requests\UpdateRepositoryRequest;
use App\Http\Resources\DatabaseBackupResource;

class RepositoryController extends Controller
{
    public function index(Request $request): Response
    {
        $repositories = Repository::query()
            ->with('clients')
            ->withCount('clients', 'database_backups', 'hosting')
            ->when($request->search, function ($query, $search) {
                $query->where('name', 'like', '%' . $search . '%')
                    ->orWhere('slug', 'like', '%' . $search . '%');
            })
            ->orderBy('last_commit_at', 'desc')
            ->paginate(10);

        return inertia('Repositories/Index', [
            'repositories' => RepositoryResource::collection($repositories),
            'filters' => $request->only('search')
        ]);
    }

    public function show(Repository $repository): Response
    {
        $repository->loadCount('clients', 'database_backups');

        $repository->load('vps');

        $clients = $repository->clients()->paginate(20);

        $database_backups = $repository->database_backups()->paginate(20);

        return inertia('Repositories/Show', [
            'repository' => new RepositoryResource($repository),
            'database_backups' =>  DatabaseBackupResource::collection($database_backups),
            'clients' => ClientResource::collection($clients),
        ]);
    }

    public function edit(Repository $repository): Response
    {
        $clients = Client::query()
            ->whereNotIn('id', $repository->clients->pluck('id'))
            ->get();

        return inertia('Repositories/Edit', [
            'repository' => new RepositoryResource($repository->load('clients', 'hosting')),
            'clients' => ClientResource::collection($clients),
        ]);
    }

    public function update(UpdateRepositoryRequest $request, Repository $repository): RedirectResponse
    {
        $repository->update($request->validated());

        return to_route('repositories.edit', $repository->id);
    }

    public function destroy(Repository $repository)
    {
        Storage::deleteDirectory($repository->slug);

        $repository->delete();
    }
}
