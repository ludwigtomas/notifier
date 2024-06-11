<?php

namespace App\Http\Controllers;

use App\Http\Resources\NotificationResource;
use App\Models\Notification;
use DirectoryIterator;
use Illuminate\Http\Request;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $models = [];

        if ($request->model) {
            $models = array_map(function ($model) {
                return 'App\\Models\\'.$model;
            }, $request->model);
        }

        $notifications = Notification::query()
            ->whereNull('read_at')
            ->when($models, function ($query, $models) {
                $query->whereIn('notifiable_type', $models);
            })
            ->whereNull('read_at')
            ->whereJsonContains('data->action', 'created')
            ->with('notifiable')
            ->latest()
            ->limit(10)
            ->get();

        $path = app_path('Models');

        $models = [];

        foreach (new DirectoryIterator($path) as $file) {

            if ($file->isDot() || $file->isDir()) {
                continue;
            }

            $filename = $file->getFilename();

            $model = pathinfo($filename, PATHINFO_FILENAME);

            $models[] = $model;
        }

        return inertia('Dashboard/Index', [
            'notifications' => NotificationResource::collection($notifications),
            'models' => $models,
            'filters' => $request->only('model'),

        ]);
    }
}
