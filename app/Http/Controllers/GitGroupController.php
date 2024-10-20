<?php

namespace App\Http\Controllers;

use App\Http\Resources\GitGroupResource;
use App\Models\Git;
use App\Models\GitGroup;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class GitGroupController extends Controller
{
    public function index(Request $request)
    {
        $git_groups = GitGroup::query()
            ->parentGroups($request->search)
            ->withCount(['childrens', 'allRepositories'])
            ->get();

        if ($request->has('group_id')) {
            $group_details = GitGroup::findOrFail($request->group_id);

            $relationship = $request->relationship;

            if ('childrens' === $relationship) {
                $group_details = $group_details->childrens()->get();
            }

            if ('repositories' === $relationship) {
                $group_details = $group_details->repositories->merge($group_details->allRepositories);
            }
        }

        return inertia('GitGroups/Index', [
            'git_groups' => $git_groups,
            'group_details' => $group_details ?? null,
            'filters' => $request->only('search', 'group_id', 'relationship'),
        ]);
    }

    public function attach(Request $request): RedirectResponse
    {
        $gitlab = Git::query()
            ->whereSlug('gitlab')
            ->first();

        if ('parent' === $request->type) {
            $git_group = GitGroup::query()
                ->where('group_id', $request->data['id'])
                ->first();

            if ($git_group) {
                return back()->with('error', 'This group is already in the database');
            }

            GitGroup::create([
                'git_id' => $gitlab->id,
                'group_id' => $request->data['id'],
                'name' => $request->data['name'],
                'web_url' => $request->data['web_url'],
                'parent_id' => null,
            ]);
        }

        if ('child' === $request->type) {
            $git_group = GitGroup::query()
                ->where('group_id', $request->subgroup['id'])
                ->first();

            if ($git_group) {
                return back()->with('error', 'This group is already in the database');
            }

            GitGroup::create([
                'git_id' => $gitlab->id,
                'group_id' => $request->subgroup['id'],
                'name' => $request->subgroup['name'],
                'web_url' => $request->subgroup['web_url'],
                'parent_id' => $request->subgroup['parent_id'],
            ]);
        }

        return to_route('gits.edit', $gitlab);
    }

    public function edit(GitGroup $git_group): Response
    {
        $git_group->load('git', 'repositories', 'parent', 'childrens');

        return inertia('GitGroups/Edit', [
            'git_group' => new GitGroupResource($git_group),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        GitGroup::create([
            'group_id' => $request->group['id'],
            'git_id' => Git::whereSlug('gitlab')->first()->id,
            'name' => $request->group['name'],
            'web_url' => $request->group['web_url'],
            'parent_id' => $request->group['parent_id'] ?? null,
        ]);

        return back();
    }
}
