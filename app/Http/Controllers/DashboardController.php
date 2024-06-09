<?php

namespace App\Http\Controllers;

use Inertia\Response;
use App\Models\Client;
use DirectoryIterator;
use App\Models\GitGroup;
use App\Models\Repository;
use App\Models\Notification;
use App\Models\RepositoryDatabase;
use App\Models\ClientRepository;

use App\Http\Resources\NotificationResource;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $notifications = Notification::query()
            ->orderBy('created_at', 'desc')
            ->whereNull('read_at')
            ->with('notifiable')
            ->limit(10)
            ->get();

        dd($notifications);

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
