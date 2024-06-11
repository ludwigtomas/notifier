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

        if ($request->model) {
            $requsted_models = array_map(function ($model) {
                return 'App\\Models\\' . $model;
            }, $request->model);
        }

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
}
