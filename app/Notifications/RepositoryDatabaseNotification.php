<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

class RepositoryDatabaseNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public string $action,
    ) {}

    public function via(): array
    {
        return ['database'];
    }

    public function toDatabase(object $notifiable): array
    {
        $old_data = null;
        $new_data = null;

        if ($this->action === 'updated') {
            $old_data = $notifiable->getOriginal();
            $new_data = $notifiable->getAttributes();
        }

        if ($this->action === 'deleted' || $this->action === 'forceDeleted') {
            $old_data = $notifiable->getAttributes();
        }

        if ($this->action === 'restored' || $this->action === 'created') {
            $new_data = $notifiable->getAttributes();
        }

        return [
            'action' => $this->action,
            'old_data' => $old_data,
            'new_data' => $new_data,
        ];
    }
}
