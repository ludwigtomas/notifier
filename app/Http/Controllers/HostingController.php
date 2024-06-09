<?php

namespace App\Http\Controllers;

use Inertia\Response;
use App\Models\Hosting;
use App\Models\Repository;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use App\Http\Resources\HostingResource;
use App\Http\Requests\StoreHostingRequest;
use App\Http\Requests\UpdateHostingRequest;

class HostingController extends Controller
{
    public function index(Request $request): Response
    {
        $hostings = Hosting::query()
            ->when($request->search, function ($query, $search) {
                $query->where('name', 'like', '%' . $search . '%');
            })
            ->withCount('repositories')
            ->get();

        return inertia('Hostings/Index', [
            'hostings' => HostingResource::collection($hostings),
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
        $repositories = Repository::all();

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
