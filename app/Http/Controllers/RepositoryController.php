<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateRepositoryRequest;
use Inertia\Response;
use App\Models\Repository;
use Illuminate\Support\Str;
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
            ->paginate(10);

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

    public function update(UpdateRepositoryRequest $request, Repository $repository): RedirectResponse
    {
        $repository->update([
            'id' => $request->id,

            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'website_url' => $request->website_url,
            'repository_url' => $request->repository_url,
            'description' => $request->description,

            'database_verification_code' => $request->database_verification_code,
            'last_commit_at' => $request->last_commit_at,
            'repository_created_at' => $request->repository_created_at,
        ]);

        return to_route('repositories.edit', $repository->id);
    }

    public function destroy(Repository $repository): RedirectResponse
    {
        Storage::deleteDirectory($repository->slug);

        $repository->delete();

        return back();
    }
}
