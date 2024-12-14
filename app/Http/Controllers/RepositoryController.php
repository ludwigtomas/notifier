<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRepositoryRequest;
use App\Http\Requests\UpdateRepositoryRequest;
use App\Http\Resources\ClientResource;
use App\Http\Resources\HostingResource;
use App\Http\Resources\RepositoryIndexResource;
use App\Http\Resources\RepositoryResource;
use App\Jobs\GoogleAnalyticsJob;
use App\Jobs\RepositoriesJob;
use App\Models\Client;
use App\Models\Hosting;
use App\Models\Repository;
use App\Services\GitlabService;
use App\Services\WorkerService;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Inertia\Response;

class RepositoryController extends Controller
{
    public function index(Request $request): Response
    {
        $repositories = Cache::remember('repositories', 60, function () use ($request) {
            return Repository::query()
                ->with(['hostingRepository', 'hosting', 'hosting.worker'])
                ->withCount('clients', 'repositorySettings', 'databaseBackups')
                ->search($request->search)
                ->trashed($request->trashed)
                ->orderBy('last_commit_at', 'desc')
                ->paginate(20)
                ->withQueryString();
        });

        return inertia('Repositories/Index', [
            'repositories' => RepositoryIndexResource::collection($repositories),
            'filters' => $request->only('search', 'trashed'),
        ]);
    }

    public function show(Repository $repository): Response
    {
        $repository->loadCount('clients', 'repositoryDatabaseBackups', 'repositoryStorageBackups')
            ->load('hosting', 'hostingRepository', 'notifications', 'repositorySettings');

        $clients = $repository->clients()->paginate(10);

        $repository_storages = $repository
            ->repositoryFilesFor(RepositoryFileTypeEnum::STORAGE_BACKUP)
            ->paginate(20);

        $repository_databases = $repository
            ->repositoryFilesFor(RepositoryFileTypeEnum::DATABASE_BACKUP)
            ->paginate(20);

        return inertia('Repositories/Show', [
            'repository' => new RepositoryResource($repository),
            'clients' => ClientResource::collection($clients),
            'repository_storages' => RepositoryFileResource::collection($repository_storages),
            'repository_databases' => RepositoryFileResource::collection($repository_databases),
        ]);
    }

    public function edit(Repository $repository): Response
    {
        $clients = Client::query()
            ->whereNotIn('id', $repository->clients->pluck('id'))
            ->get();

        $repository->load(
            'clients',
            'hostingRepository',
            'hosting',
            'repositorySettings',
        );

        return inertia('Repositories/Edit', [
            'repository' => new RepositoryResource($repository),
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
        // TODO: Before deleting database, send them to my email in ZIP format
        // TODO: Purge storage "slug" folder

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

    public function googleAnalytics(Repository $repository): void
    {
        GoogleAnalyticsJob::dispatch($repository);
    }

    public function syncWithGit(): void
    {
        RepositoriesJob::dispatch();
    }

    public function deploy(Repository $repository)
    {
        if ( ! $repository->hosting?->worker) {
            return response()->json(['error' => 'No worker assigned to this repository'], 400);
        }
        $service = new WorkerService($repository->hosting->worker);
        $result = $service->deployRepository($repository);

        if ($result) {
            return response()->json(['message' => 'Repository deployed successfully'], 200);
        }

        return response()->json(['error' => 'Failed to deploy repository'], 400);
    }
}
