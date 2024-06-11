<?php

namespace App\Http\Controllers;

use App\Http\Requests\Gits\UpdateGitRequest;
use App\Http\Resources\GitResource;
use App\Http\Resources\RepositoryResource;
use App\Models\Git;
use App\Models\Repository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use Inertia\Response;

class GitController extends Controller
{
    public function index(): Response
    {
        $gits = Git::query()
            ->withCount(['gitGroups', 'repositories'])
            ->get();

        return inertia('Gits/Index', [
            'gits' => GitResource::collection($gits),
            'repositories' => RepositoryResource::collection(Repository::all()),
        ]);
    }

    public function create(): Response
    {
        return inertia('Gits/Create');
    }

    public function show(Git $git): Response
    {
        return inertia('Gits/Show', [
            'git' => new GitResource($git),
        ]);
    }

    public function edit(Git $git): Response
    {
        $git->load('gitGroups', 'repositories');

        return inertia('Gits/Edit', [
            'git' => new GitResource($git),
        ]);
    }

    public function update(UpdateGitRequest $request, Git $git): RedirectResponse
    {
        $git->update([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'api_token' => $request->api_token,
            'username' => $request->username,
            'user_id' => $request->user_id,
            'user_avatar_url' => $request->user_avatar_url,
        ]);

        return to_route('gits.edit', $git);
    }

    public function destroy(Git $git): RedirectResponse
    {
        $git->delete();

        return to_route('gits.index');
    }
}
