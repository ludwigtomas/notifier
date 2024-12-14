<?php

namespace App\Http\Controllers;

use App\Http\Requests\HostingRepository\StoreHostingRepositoryRequest;
use App\Http\Requests\HostingRepository\UpdateHostingRepositoryRequest;
use App\Http\Resources\HostingRepositoryResource;
use App\Models\Hosting;
use App\Models\HostingRepository;
use App\Models\Repository;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class HostingRepositoryController extends Controller
{
    public function update(HostingRepository $hosting_repository, UpdateHostingRepositoryRequest $request)
    {
        $hosting_repository->update($request->validated());

        return back();
    }

    public function attach(Hosting $hosting, Repository $repository)
    {
        $hosting->repositories()->attach($repository);

        return back();
    }

    public function detach(Hosting $hosting, Repository $repository)
    {
        $hosting->repositories()->detach($repository);

        return back();
    }

    public function store(StoreHostingRepositoryRequest $request): RedirectResponse
    {
        HostingRepository::create($request->validated());

        return back();
    }

    public function destroy(HostingRepository $hosting_repository): RedirectResponse
    {
        $hosting_repository->delete();

        return back();
    }

    public function vpsConnect(HostingRepository $hosting_repository): Response
    {
        $hosting_repository->load('repository');

        return inertia('HostingRepository/VpsConnect', [
            'hosting_repository' => new HostingRepositoryResource($hosting_repository),
        ]);
    }
}
