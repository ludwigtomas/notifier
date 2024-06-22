<?php

namespace App\Http\Controllers;

use App\Http\Requests\HostingRepository\StoreHostingRepositoryRequest;
use App\Http\Resources\HostingRepositoryResource;
use App\Models\Hosting;
use App\Models\HostingRepository;
use App\Models\Repository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class HostingRepositoryController extends Controller
{
    public function update(HostingRepository $hosting_repository, Request $request)
    {
        $hosting_repository->update([
            'hosting_id' => $request->hosting_id,

            'ip_address' => $request->ip_address,
            'ip_port' => $request->ip_port,
            'login_user' => $request->login_user,
            'login_password' => $request->login_password,
        ]);

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
        HostingRepository::create([
            'hosting_id' => $request->hosting_id,
            'repository_id' => $request->repository_id,
            'ip_address' => $request->ip_address,
            'ip_port' => $request->ip_port,
            'login_user' => $request->login_user,
            'login_password' => $request->login_password,
        ]);

        return back();
    }

    public function destroy(HostingRepository $hosting_repository): RedirectResponse
    {
        $hosting_repository->delete();

        return back();
    }

    public function vpsConnect(HostingRepository $hosting_repository)
    {
        $hosting_repository->load('repository');

        return inertia('HostingRepository/VpsConnect', [
            'hosting_repository' => new HostingRepositoryResource($hosting_repository),
        ]);
    }
}
