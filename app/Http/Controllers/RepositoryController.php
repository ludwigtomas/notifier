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
use App\Services\GitlabService;

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
            ->when($request->trashed === 'true', function ($query, $trashed) {
                $query->withTrashed();
            })
            ->orderBy('last_commit_at', 'desc')
            ->paginate(10);

        return inertia('Repositories/Index', [
            'repositories' => RepositoryResource::collection($repositories),
            'filters' => $request->only('search', 'trashed')
        ]);
    }

    public function show(Repository $repository): Response
    {
        $repository->loadCount('clients', 'database_backups');
        $repository->load('hosting');

        $clients = $repository->clients()->paginate(10);

        $database_backups = $repository->database_backups()->paginate(20);

        return inertia('Repositories/Show', [
            'repository' => new RepositoryResource($repository),
            'clients' => ClientResource::collection($clients),
            'database_backups' =>  DatabaseBackupResource::collection($database_backups),
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

    public function destroy(Repository $repository): RedirectResponse
    {
        Storage::deleteDirectory($repository->slug);

        $repository->delete();

        return to_route('repositories.index');
    }

    public function lastCommit(Repository $repository): RedirectResponse
    {
        GitlabService::getRepositorylastCommit($repository);

        return to_route('repositories.edit', $repository->id);
    }

    public function googleAnalytics(Repository $repository): RedirectResponse
    {
        dd($repository);
    }
}
