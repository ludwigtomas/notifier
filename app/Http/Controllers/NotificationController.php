<?php

namespace App\Http\Controllers;

use App\Helpers\ActionTypeHelper;
use App\Helpers\ModelHelper;
use App\Http\Resources\NotificationResource;
use App\Models\Notification;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class NotificationController extends Controller
{
    public function index(Request $request): Response
    {
        $requsted_models = [];

        $request->model ? $requsted_models = ModelHelper::modelsPath($request->model) : null;

        $notifications = Notification::query()
            ->when($request->search, function ($query, $search): void {
                $query->whereAny([
                    'type',
                    'notifiable_type',
                    'notifiable_id',
                ], 'like', '%' . $search . '%');
            })
            ->when($requsted_models, function ($query, $requsted_models): void {
                $query->whereIn('notifiable_type', $requsted_models);
            })
            ->when('true' === $request->read_at, function ($query): void {
                $query->whereNotNull('read_at');
            })
            ->when($request->action && 'everything' !== $request->action, function ($query) use ($request): void {
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
