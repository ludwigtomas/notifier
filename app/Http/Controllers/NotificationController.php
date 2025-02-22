<?php

namespace App\Http\Controllers;

use App\Helpers\ActionTypeHelper;
use App\Helpers\ModelHelper;
use App\Http\Resources\NotificationIndexResource;
use App\Http\Resources\NotificationShowResource;
use App\Models\Notification;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class NotificationController extends Controller
{
    public function index(Request $request): Response
    {
        $request->model
            ? $requsted_models = ModelHelper::modelsPath($request->model)
            : $requsted_models = [];

        $notifications = Notification::query()
            ->when($request->search, function ($query, $search): void {
                $query->whereAny([
                    'type',
                    'notifiable_type',
                    'notifiable_id',
                ], 'like', '%'.$search.'%');
            })
            ->when($requsted_models, function ($query, $requsted_models): void {
                $query->whereIn('notifiable_type', $requsted_models);
            })
            ->when($request->read_at === 'true', function ($query): void {
                $query->whereNotNull('read_at');
            })
            ->when($request->action && $request->action !== 'everything', function ($query) use ($request): void {
                $query->whereJsonContains('data->action', $request->action);
            })
            ->orderBy('created_at', 'desc')
            ->with('notifiable')
            ->paginate(20)
            ->withQueryString();

        return inertia('Notifications/Index', [
            'notifications' => NotificationIndexResource::collection($notifications),
            'models' => ModelHelper::getModels(),
            'actions' => ActionTypeHelper::getActions(),
            'filters' => $request->only('search', 'read_at', 'model', 'action'),
        ]);
    }

    public function show(Notification $notification): Response
    {
        return inertia('Notifications/Show', [
            'notification' => new NotificationShowResource($notification->load('notifiable')),
        ]);
    }

    public function markAsRead(Notification $notification): void
    {
        $notification->toggleReadAt();
    }

    public function destroy(Notification $notification): RedirectResponse
    {
        $notification->delete();

        return back();
    }
}
