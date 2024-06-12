<?php

namespace App\Http\Controllers;

use Inertia\Response;
use App\Helpers\ModelHelper;
use App\Models\Notification;
use Illuminate\Http\Request;
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
            ->when($request->action, function ($query, $action) {
                $query->whereJsonContains('data->action', $action);
            })
            ->orderBy('created_at', 'desc')
            ->with('notifiable')
            ->get();

        $actions = [
            'created',
            'updated',
            'deleted',
            'restored',
            'forceDeleted',
        ];

        return inertia('Notifications/Index', [
            'notifications' => NotificationResource::collection($notifications),
            'models' => ModelHelper::getModels(),
            'actions' => $actions,
            'filters' => $request->only('search', 'read_at', 'model', 'action'),
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

        return redirect()->back();
    }
}
