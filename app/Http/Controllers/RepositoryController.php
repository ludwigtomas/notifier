<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Client;
use App\Models\Hosting;
use App\Models\Repository;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Jobs\RepositoriesJob;
use App\Services\GitlabService;
use App\Services\WorkerService;
use App\Jobs\GoogleAnalyticsJob;
use Illuminate\Http\RedirectResponse;
use App\Http\Resources\ClientResource;
use App\Http\Resources\HostingResource;
use App\Http\Resources\RepositoryResource;
use App\Http\Requests\StoreRepositoryRequest;
use App\Http\Requests\UpdateRepositoryRequest;
use App\Http\Resources\RepositoryFileResource;
use App\Http\Resources\RepositoryIndexResource;
use App\Enums\RepositoryFile\RepositoryFileTypeEnum;

class RepositoryController extends Controller
{
    public function index(Request $request): Response
    {
        $repositories = Repository::query()
            ->with(['hostingRepository', 'hosting', 'hosting.worker'])
            ->withCount('clients', 'repositorySettings', 'repositoryDatabaseBackups', 'repositoryStorageBackups')
            ->search($request->search)
            ->trashed($request->trashed)
            ->orderBy('last_commit_at', 'desc')
            ->paginate(20)
            ->withQueryString();

        return inertia('Repositories/Index', [
            'repositories' => RepositoryIndexResource::collection($repositories),
            'filters' => $request->only('search', 'trashed'),
        ]);
    }

    public function show(Request $request, Repository $repository): Response
    {
        $repository->loadCount('clients', 'notifications', 'repositoryDatabaseBackups', 'repositoryStorageBackups', 'repositorySettings');

        $relation = match ($request->get('relation')) {
            'databases' => $repository->repositoryFilesFor(RepositoryFileTypeEnum::DATABASE_BACKUP),
            'storages' => $repository->repositoryFilesFor(RepositoryFileTypeEnum::STORAGE_BACKUP),
            'clients' => $repository->clients(),
            'settings' => $repository->repositorySettings(),
            'notifications' => $repository->notifications(),
            'hosting' => $repository->hostingRepository,
            default => null,
        };

        if ($relation) {
            $relation = $relation->paginate(20);
        }

        return inertia('Repositories/Show', [
            'repository' => fn() => new RepositoryResource($repository),
            'relation' =>fn () => $relation,
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
        $repository->update([
            'analytics_property_id' => $request->analytics_property_id,
            'website_url' => $request->website_url,
            'repository_url' => $request->repository_url,
            'last_commit_at' => $request->last_commit_at,

            'name' => $request->name,
            'description' => $request->description,
        ]);

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
        GitlabService::getRepositoryLastCommit($repository);

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
        if (! $repository->hosting?->worker) {
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
