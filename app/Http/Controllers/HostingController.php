<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreHostingRequest;
use App\Http\Requests\UpdateHostingRequest;
use App\Http\Resources\HostingIndexResource;
use App\Http\Resources\HostingResource;
use App\Models\Hosting;
use App\Models\Repository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class HostingController extends Controller
{
    public function index(Request $request): Response
    {
        $hostings = Hosting::query()
            ->when($request->search, function ($query, $search): void {
                $query->where('name', 'like', '%' . $search . '%');
            })
            ->withCount('repositories')
            ->orderBy('id', 'desc')
            ->paginate(20)
            ->withQueryString();

        return inertia('Hostings/Index', [
            'hostings' => HostingIndexResource::collection($hostings),
            'filters' => $request->only('search'),
        ]);
    }

    public function create(): Response
    {
        return inertia('Hostings/Create');
    }

    public function store(StoreHostingRequest $request): RedirectResponse
    {
        $hosting = Hosting::create($request->validated());

        return to_route('hostings.edit', $hosting);
    }

    public function edit(Hosting $hosting): Response
    {
        $hosting->load('repositories', 'worker');

        $repositories = Repository::query()
            ->whereNotIn('repository_id', $hosting->repositories->pluck('repository_id'))
            ->get();

        return inertia('Hostings/Edit', [
            'hosting' => new HostingResource($hosting),
            'repositories' => $repositories,
        ]);
    }

    public function update(UpdateHostingRequest $request, Hosting $hosting): RedirectResponse
    {
        $hosting->update($request->validated());

        return to_route('hostings.edit', $hosting);
    }

    public function destroy(Hosting $hosting): RedirectResponse
    {
        $hosting->delete();

        return to_route('hostings.index');
    }
}
