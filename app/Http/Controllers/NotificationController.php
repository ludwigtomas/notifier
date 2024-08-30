<?php

namespace App\Http\Controllers;

use Inertia\Response;
use App\Helpers\ModelHelper;
use App\Models\Notification;
use Illuminate\Http\Request;
use App\Helpers\ActionTypeHelper;
use Illuminate\Http\RedirectResponse;
use App\Http\Resources\NotificationResource;

class NotificationController extends Controller
{
    public function index(Request $request): Response
    {
        $requsted_models = [];

        $request->model ? $requsted_models = ModelHelper::modelsPath($request->model) : null;

        $notifications = Notification::query()
            ->when($request->search, function ($query, $search) {
                $query->whereAny([
                    'type',
                    'notifiable_type',
                    'notifiable_id',
                ], 'like', '%' . $search . '%');
            })
            ->when($requsted_models, function ($query, $requsted_models) {
                $query->whereIn('notifiable_type', $requsted_models);
            })
            ->when($request->read_at == 'true', function ($query) {
                $query->whereNotNull('read_at');
            })
            ->when($request->action && $request->action != 'everything', function ($query) use ($request) {
                $query->whereJsonContains('data->action', $request->action);
            })
            ->orderBy('created_at', 'desc')
            ->with('notifiable')
            ->paginate(20);

        return inertia('Notifications/Index', [
            'notifications' => NotificationResource::collection($notifications),
            'models' => ModelHelper::getModels(),
            'actions' => ActionTypeHelper::getActions(),
            'filters' => $request->only('search', 'read_at', 'model', 'action'),
        ]);
    }

    public function show(Notification $notification): Response
    {
        $notification->load('notifiable');

        return inertia('Notifications/Show', [
            'notification' => new NotificationResource($notification),
        ]);
    }

    public function markAsRead(Notification $notification): RedirectResponse
    {
        $notification->markAsRead();

        return redirect()->back();
    }

    public function destroy(Notification $notification): RedirectResponse
    {
        $notification->delete();

        return back();
    }
}
