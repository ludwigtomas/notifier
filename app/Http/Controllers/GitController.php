<?php

namespace App\Http\Controllers;

use App\Http\Resources\GitResource;
use App\Models\Git;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class GitController extends Controller
{
    public function index(): Response
    {
        $gits = Git::query()
            ->withCount('repositories')
            ->get();

        return inertia('Gits/Index', [
            'gits' => GitResource::collection($gits),
        ]);
    }

    public function create(): Response
    {
        return inertia('Gits/Create');
    }

    public function show(Git $git): Response
    {
        return inertia('Gits/Show', [
            'git' => $git,
        ]);
    }

    public function edit(Git $git): Response
    {
        return inertia('Gits/Edit', [
            'git' => $git,
        ]);
    }

    public function update(Request $request, Git $git): RedirectResponse
    {
        $request->validate([
            'name' => 'required',
            'url' => 'required',
        ]);

        $git->update($request->all());

        return redirect()->route('dashboard.gits.index');
    }

    public function destroy(Git $git): RedirectResponse
    {
        // $git->delete();

        return to_route('gits.index');
    }
}
