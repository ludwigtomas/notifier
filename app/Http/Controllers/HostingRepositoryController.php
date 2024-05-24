<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\HostingRepository;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\HostingRepository\StoreHostingRepositoryRequest;
use App\Http\Resources\HostingRepositoryResource;

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
