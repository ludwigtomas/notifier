<?php

namespace App\Http\Controllers;

use Inertia\Response;
use App\Models\Client;
use DirectoryIterator;
use App\Models\Hosting;
use App\Models\GitGroup;
use App\Models\Repository;
use App\Models\Notification;
use Illuminate\Http\Request;

use App\Models\ClientRepository;
use App\Models\RepositoryDatabase;
use App\Http\Resources\NotificationResource;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $models = [];

        if ($request->model) {
            $models = array_map(function ($model) {
                return 'App\\Models\\' . $model;
            }, $request->model);
        }

        $notifications = Notification::query()
            ->whereNull('read_at')
            ->when($models, function ($query, $models) {
                $query->whereIn('notifiable_type', $models);
            })
            ->whereJsonContains('data->action', 'updated')
            ->with('notifiable')
            ->latest()
            ->limit(10)
            ->get();


        $path = app_path('Models');

        $models = [];

        foreach (new DirectoryIterator($path) as $file) {

            if ($file->isDot() || $file->isDir()) continue;

            $filename = $file->getFilename();

            $model = pathinfo($filename, PATHINFO_FILENAME);

            $models[] = $model;
        }

        return inertia('Dashboard/Index', [
            'notifications' => NotificationResource::collection($notifications),
            'models' => $models,
            'filters' => $request->only('model')

        ]);
    }
}
