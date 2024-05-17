<?php

namespace App\Http\Controllers;

use App\Models\Git;
use Inertia\Response;
use Illuminate\Support\Str;
use App\Http\Resources\GitResource;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\Gits\UpdateGitRequest;

class GitController extends Controller
{
    public function index(): Response
    {
        $gits = Git::query()
            ->withCount(['gitGroups', 'repositories'])
            ->get();

        // count all repositories
        $repositories = $gits->reduce(function ($carry, $git) {
            return $carry + $git->repositories->count();
        }, 0);

        // dd($repositories);

        return inertia('Gits/Index', [
            'gits' => GitResource::collection($gits),
            'repositories' => $repositories,
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
        $git->load('gitGroups');

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
