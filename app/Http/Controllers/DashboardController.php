<?php

namespace App\Http\Controllers;

use App\Http\Resources\NotificationResource;
use Inertia\Response;
use App\Models\Client;
use App\Models\GitGroup;
use App\Models\Notification;
use App\Models\Repository;
use App\Models\RepositoryDatabase;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $notifications = Notification::query()
            ->orderBy('created_at', 'desc')
            ->whereNull('read_at')
            ->with('notifiable')
            ->limit(10)
            ->get();

        return inertia('Dashboard/Index', [
            'notifications' => NotificationResource::collection($notifications),
        ]);
    }
}
