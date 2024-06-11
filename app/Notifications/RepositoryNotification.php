<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class RepositoryNotification extends Notification
{
    use Queueable;

    public function __construct(
        public string $action,
    ) {
    }

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toDatabase(object $notifiable): array
    {
        return [
            'action' => $this->action,
            'model' => $notifiable,
        ];
    }
}
