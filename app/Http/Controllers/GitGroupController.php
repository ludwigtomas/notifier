<?php

namespace App\Http\Controllers;

use App\Models\Git;
use Inertia\Response;
use App\Models\GitGroup;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response as HttpResponse;

class GitGroupController extends Controller
{
    public function index(): Response
    {
        return inertia('GitGroups/Index');
    }

    public function attach(Request $request): RedirectResponse
    {
        $gitlab = Git::whereSlug('gitlab')->first();

        if ($request->type == 'parent') {
            $gitGroup = GitGroup::where('group_id', $request->data['id'])->first();

            if ($gitGroup) {
                return back()->with('error', 'This group is already in the database');
            }

            GitGroup::create([
                'group_id' => $request->data['id'],
                'git_id' => $gitlab->id,
                'name' => $request->data['name'],
                'web_url' => $request->data['web_url'],
                'parent_id' => null,
            ]);
        }

        if ($request->type == 'child') {
            $gitGroup = GitGroup::where('group_id', $request->subgroup['id'])->first();

            if ($gitGroup) {
                return back()->with('error', 'This group is already in the database');
            }

            GitGroup::create([
                'group_id' => $request->subgroup['id'],
                'git_id' => $gitlab->id,
                'name' => $request->subgroup['name'],
                'web_url' => $request->subgroup['web_url'],
                'parent_id' => $request->subgroup['parent_id'],
            ]);
        }

        return to_route('gits.edit', $gitlab);
    }
}
