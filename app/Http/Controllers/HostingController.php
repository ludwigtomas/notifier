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
        $repositories = Repository::query()
            ->whereDoesntHave('hosting')
            ->get();

        return inertia('Hostings/Index', [
            'hostings' => HostingResource::collection(Hosting::all()),
            'filters' => $request->only('search')
        ]);
    }

    public function store(StoreHostingRequest $request): RedirectResponse
    {
        Hosting::create($request->validated());

        return back();
    }

    public function update(Hosting $hosting, UpdateHostingRequest $request): RedirectResponse
    {
        $hosting->update($request->validated());

        return back();
    }

    public function destroy(Hosting $hosting): RedirectResponse
    {
        $hosting->delete();

        return back();
    }
}
