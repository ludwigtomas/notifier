<?php

namespace App\Http\Controllers;

use Inertia\Response;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use App\Http\Resources\NotificationResource;

class NotificationController extends Controller
{
    public function index(): Response
    {
        $notifications = Notification::query()
            ->with('notifiable')
            ->get();

        return inertia('Notifications/Index', [
            'notifications' => NotificationResource::collection($notifications),
        ]);
    }

    public function markAsRead(Notification $notification): RedirectResponse
    {
        $notification->markAsRead();

        return redirect()->back();
    }
}
