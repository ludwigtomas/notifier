<?php

namespace App\Http\Controllers;

use Inertia\Response;
use App\Models\Repository;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\RepositoryResource;

class RepositoryController extends Controller
{
    public function index(): Response
    {
        $repositories = Repository::query()
            ->with('clients')
            ->withCount('clients', 'database_backups')
            ->orderBy('last_commit_at', 'desc')
            ->get();

        return inertia('Repositories/Index', [
            'repositories' => RepositoryResource::collection($repositories),
        ]);
    }

    public function show(Repository $repository): Response
    {
        $repository->load('clients', 'database_backups')
            ->loadCount('clients');

        return inertia('Repositories/Show', [
            'repository' => new RepositoryResource($repository),
        ]);
    }

    public function edit(Repository $repository): Response
    {
        return inertia('Repositories/Edit', [
            'repository' => new RepositoryResource($repository),
        ]);
    }

    public function destroy(Repository $repository): RedirectResponse
    {
        Storage::deleteDirectory($repository->slug);

        $repository->delete();

        return back();
    }
}
