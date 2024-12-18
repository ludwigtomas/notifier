<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreWorkerRequest;
use App\Http\Requests\UpdateWorkerRequest;
use App\Http\Resources\HostingResource;
use App\Http\Resources\WorkerResource;
use App\Models\Hosting;
use App\Models\Worker;
use App\Services\WorkerService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class WorkerController extends Controller
{
    public function index(Request $request): Response
    {
        $workers = Worker::query()
            ->when($request->search, function ($query, $search): void {
                $query->where('name', 'like', '%' . $search . '%');
            })
            ->get();

        return inertia('Workers/Index', [
            'workers' => WorkerResource::collection($workers),
            'filters' => $request->only('search'),
        ]);
    }

    public function create(): Response
    {
        return inertia('Workers/Create', [
            'hostings' => HostingResource::collection(Hosting::all()),
        ]);
    }

    public function store(StoreWorkerRequest $request): RedirectResponse
    {
        $worker = Worker::create($request->validated());

        return to_route('workers.edit', $worker);
    }

    public function edit(Worker $worker): Response
    {
        return inertia('Workers/Edit', [
            'worker' => new WorkerResource($worker),
            'hostings' => HostingResource::collection(Hosting::all()),
        ]);
    }

    public function update(UpdateWorkerRequest $request, Worker $worker): RedirectResponse
    {
        $worker->update($request->validated());

        return to_route('workers.edit', $worker);
    }

    public function destroy(Worker $worker): RedirectResponse
    {
        $worker->delete();

        return to_route('workers.index');
    }

    public function ping(Request $request, Worker $worker)
    {
        $result = [
            'success' => (new WorkerService($worker))->ping(),
        ];

        return response()->json($result);

    }

    public function command(Request $request, Worker $worker)
    {
        $request->validate([
            'command' => 'required|string',
            'arguments' => 'array',
        ]);

        $result = [
            'success' => (new WorkerService($worker))->command($request->command, $request->arguments),
        ];

        return response()->json($result);
    }

    public function status(Request $request, Worker $worker)
    {
        $result = [
            'status' => (new WorkerService($worker))->status(),
        ];

        return response()->json($result);
    }

    public function containers(Request $request, Worker $worker)
    {
        $result = [
            'containers' => (new WorkerService($worker))->containers(),
        ];

        return response()->json($result);
    }
}
