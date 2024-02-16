<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateRepositoryRequest;
use App\Http\Resources\ClientResource;
use App\Http\Resources\DatabaseBackupResource;
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
        $repository->loadCount('clients', 'database_backups');

        $database_backups = $repository->database_backups()->paginate(20);


        $clients = $repository->clients()->paginate(20);

        return inertia('Repositories/Show', [
            'repository' => new RepositoryResource($repository),
            'database_backups' =>  DatabaseBackupResource::collection($database_backups),
            'clients' => ClientResource::collection($clients),
        ]);
    }

    public function edit(Repository $repository): Response
    {
        return inertia('Repositories/Edit', [
            'repository' => new RepositoryResource($repository->load('clients')),
        ]);
    }

    public function update(Request $request, Repository $repository): RedirectResponse
    {
        dD($request->website_url);

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
