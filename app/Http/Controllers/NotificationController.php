<?php

namespace App\Http\Controllers;

use Inertia\Response;
use App\Helpers\OrderHelper;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use App\Http\Resources\NotificationResource;

class NotificationController extends Controller
{
    public function index(Request $request): Response
    {
        $notifications = Notification::query()
            ->with('notifiable')
            ->when($request->search, function ($query, $search) {
                $query->whereAny([
                    'type',
                    'notifiable_type',
                    'notifiable_id',
                ], 'like', '%' . $search . '%');
            })
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
