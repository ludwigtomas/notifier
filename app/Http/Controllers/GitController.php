<?php

namespace App\Http\Controllers;

use App\Models\Git;
use Inertia\Response;
use App\Models\Repository;
use Illuminate\Support\Str;
use App\Http\Resources\GitResource;
use Illuminate\Http\RedirectResponse;
use App\Http\Resources\RepositoryResource;
use App\Http\Requests\Gits\UpdateGitRequest;
use App\Services\GitlabService;

class GitController extends Controller
{
    public function index(): Response
    {
        $gits = Git::query()
            ->withCount(['gitGroupsParent', 'repositories'])
            ->get();

        return inertia('Gits/Index', [
            'gits' => GitResource::collection($gits),
        ]);
    }

    public function edit(Git $git): Response
    {
        $git->load('gitGroupsParent', 'gitGroupsChildren', 'repositories');

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
        // $git->delete();

        return to_route('gits.index');
    }

    public function sync(Git $git): void
    {
        GitlabService::updateUser($git);
    }
}
