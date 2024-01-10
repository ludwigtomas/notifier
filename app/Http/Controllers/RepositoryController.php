<?php

namespace App\Http\Controllers;

use App\Http\Resources\RepositoryResource;
use Inertia\Response;
use App\Models\Repository;
use Illuminate\Http\Request;

class RepositoryController extends Controller
{
    public function index(): Response
    {
        return inertia('Repositories/Index', [
            'repositories' => RepositoryResource::collection(Repository::all()),
        ]);
    }

    public function edit(Repository $repository): Response
    {
        return inertia('Repositories/Edit', [
            'repository' => new RepositoryResource($repository),
        ]);
    }
}
