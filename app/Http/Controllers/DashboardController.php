<?php

namespace App\Http\Controllers;

use App\Helpers\ModelHelper;
use App\Http\Resources\NotificationResource;
use App\Models\Notification;
use Illuminate\Http\Request;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $requsted_models = [];

        if ($request->model) {
            $requsted_models = array_map(function ($model) {
                return 'App\\Models\\'.$model;
            }, $request->model);
        }

        $notifications = Notification::query()
            ->whereNull('read_at')
            ->when($requsted_models, function ($query, $requsted_models) {
                $query->whereIn('notifiable_type', $requsted_models);
            })
            ->whereJsonContains('data->action', 'created')
            ->with('notifiable')
            ->latest()
            ->limit(10)
            ->get();

        // dd($notifications[0]['notifiable']->getTableName());

        return inertia('Dashboard/Index', [
            'notifications' => NotificationResource::collection($notifications),
            'models' => ModelHelper::getModels(),
            'filters' => $request->only('model'),
            'environment' => app()->environment(),
        ]);
    }
}
