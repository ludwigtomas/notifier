<?php

namespace App\Http\Controllers;

use App\Models\Git;
use App\Models\GitGroup;
use Inertia\Response;
use Illuminate\Http\Request;

class GitGroupController extends Controller
{
    public function index(): Response
    {
        return inertia('GitGroups/Index');
    }

    public function attach(Request $request)
    {
        $gitlab = Git::whereSlug('gitlab')->first();

        GitGroup::create([
            'group_id' => $request->data['id'],

            'git_id' => $gitlab->id,
            'name' => $request->data['name'],
            'web_url' => $request->data['web_url'],
            'parent_id' => $request->data['parent_id'] ?? null,
        ]);
    }
}
