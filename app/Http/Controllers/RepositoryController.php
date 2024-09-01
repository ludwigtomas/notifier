<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Response;
use App\Models\Client;
use App\Models\Hosting;
use App\Models\Repository;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Jobs\RepositoriesJob;
use App\Services\GitlabService;
use App\Jobs\GoogleAnalyticsJob;
use Illuminate\Http\RedirectResponse;
use App\Http\Resources\ClientResource;
use App\Http\Resources\HostingResource;
use App\Http\Resources\RepositoryResource;
use App\Http\Requests\StoreRepositoryRequest;
use App\Http\Requests\UpdateRepositoryRequest;
use App\Http\Resources\DatabaseBackupResource;

class RepositoryController extends Controller
{
    public function index(Request $request): Response
    {
        $repositories = Repository::query()
            ->with('clients', 'hosting_repository')
            ->withCount('clients', 'database_backups')
            ->when($request->search, function ($query, $search) {
                $query->whereAny([
                    'repository_id',
                    'name',
                    'slug',
                ], 'like', '%' . $search . '%');
            })
            ->when($request->trashed == 'true', function ($query, $trashed) {
                $query->withTrashed();
            })
            ->orderBy('last_commit_at', 'desc')
            ->paginate(30);

        return inertia('Repositories/Index', [
            'repositories' => RepositoryResource::collection($repositories),
            'filters' => $request->only('search', 'trashed'),
        ]);
    }

    public function show(Repository $repository): Response
    {
        $repository->loadCount('clients', 'database_backups')
            ->load('hosting', 'hosting_repository', 'notifications');

        $clients = $repository->clients()->paginate(10);

        $database_backups = $repository->database_backups()->paginate(20);

        return inertia('Repositories/Show', [
            'repository' => new RepositoryResource($repository),
            'clients' => ClientResource::collection($clients),
            'database_backups' => DatabaseBackupResource::collection($database_backups),
        ]);
    }

    public function edit(Repository $repository): Response
    {
        $clients = Client::query()
            ->whereNotIn('id', $repository->clients->pluck('id'))
            ->get();

        return inertia('Repositories/Edit', [
            'repository' => new RepositoryResource($repository->load('clients', 'hosting_repository', 'hosting')),
            'hostings' => HostingResource::collection(Hosting::all()),
            'clients' => ClientResource::collection($clients),
        ]);
    }

    public function update(UpdateRepositoryRequest $request, Repository $repository): RedirectResponse
    {
        $repository->update($request->validated());

        return to_route('repositories.edit', $repository);
    }

    public function store(StoreRepositoryRequest $request)
    {
        $repository = GitlabService::getRepository($request->repository_id);

        $group_id = $request->group_id;

        // Check if the repository belongs to the selected group
        if ($group_id !== $repository['namespace']['id']) {
            return back()->with('error', 'Repository does not belong to the selected group');
        }

        Repository::create([
            'group_id' => $repository['namespace']['id'],
            'repository_id' => $repository['id'],
            'name' => $repository['name'],
            'slug' => Str::slug($repository['name']),
            'repository_url' => $repository['web_url'],

            'repository_created_at' => Carbon::parse($repository['created_at']),
        ]);
    }

    public function restore($repository): RedirectResponse
    {
        Repository::query()
            ->withTrashed()
            ->findOrFail($repository)
            ->restore();

        return back();
    }

    public function destroy(Repository $repository): RedirectResponse
    {
        $repository->delete();

        return back();
    }

    public function forceDelete($repository): RedirectResponse
    {
        // TODO: Before deleting database, send them my email in ZIP format
        // TODO: Delete database backups
        // TODO: Delete repository avatar

        Repository::query()
            ->withTrashed()
            ->findOrFail($repository)
            ->forceDelete();

        return back();
    }

    public function lastCommit(Repository $repository): RedirectResponse
    {
        GitlabService::getRepositorylastCommit($repository);

        return to_route('repositories.edit', $repository);
    }

    public function googleAnalytics(Repository $repository)
    {
        GoogleAnalyticsJob::dispatch($repository);
    }

    public function syncWithGit()
    {
        RepositoriesJob::dispatch();
    }
}
