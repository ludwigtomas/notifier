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
use Illuminate\Support\Facades\Log;
use Illuminate\Http\RedirectResponse;
use App\Http\Resources\ClientResource;
use App\Http\Resources\HostingResource;
use Illuminate\Support\Facades\Storage;
use App\Services\GoogleAnalyticsService;
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
                    'name',
                    'slug'
                ], 'like', '%' . $search . '%');
            })
            ->when($request->trashed === "true", function ($query, $trashed) {
                $query->withTrashed();
            })
            ->orderBy('last_commit_at', 'desc')
            ->paginate(10);

        return inertia('Repositories/Index', [
            'repositories' => RepositoryResource::collection($repositories),
            'filters' => $request->only('search', 'trashed'),
        ]);
    }

    public function show(Repository $repository): Response
    {
        $repository->loadCount('clients', 'database_backups');
        $repository->load('hosting', 'hosting_repository');

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

    public function destroy($repository, Request $request): RedirectResponse
    {
        $repository = Repository::withTrashed()->findOrFail($repository);

        if ($repository->trashed()) {
            Storage::deleteDirectory($repository->slug);
            $repository->forceDelete();
        } else {
            $repository->delete();
        }

        return back();
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
