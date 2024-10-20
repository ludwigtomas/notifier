<?php

namespace App\Helpers;

class NotificationHelper extends Helper
{
    public static function getNotifications()
    {
        $notifications = [];
        $path = app_path('Notifications');
        $files = scandir($path);
        foreach ($files as $file) {
            if (is_file($path . '/' . $file)) {
                $notifications[] = str_replace('.php', '', $file);
            }
        }

        return $notifications;
    }

    public static function notificationsPath(array $notifications)
    {
        return array_map(fn($notification) => 'App\\Notifications\\' . $notification, $notifications);
    }
}
