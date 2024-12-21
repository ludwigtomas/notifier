<?php

namespace App\Http\Controllers;

use App\Helpers\ModelHelper;
use App\Http\Resources\NotificationIndexResource;
use App\Models\Notification;
use Illuminate\Http\Request;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $request->model
            ? $requsted_models = array_map(fn($model) => 'App\\Models\\' . $model, $request->model)
            : $requsted_models = [];

        $notifications = Notification::query()
            ->whereNull('read_at')
            ->when($requsted_models, function ($query, $requsted_models): void {
                $query->whereIn('notifiable_type', $requsted_models);
            })
            ->whereJsonContains('data->action', 'created')
            ->latest()
            ->limit(10)
            ->get();

        return inertia('Dashboard/Index', [
            'notifications' => NotificationIndexResource::collection($notifications),
            'models' => ModelHelper::getModels(),
            'filters' => $request->only('model'),
            'environment' => app()->environment(),
        ]);
    }
}
