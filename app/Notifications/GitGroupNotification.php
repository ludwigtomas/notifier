<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class GitGroupNotification extends Notification
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

        if ('updated' === $this->action) {
            $old_data = $notifiable->getOriginal();
            $new_data = $notifiable->getAttributes();
        }

        if ('deleted' === $this->action || 'forceDeleted' === $this->action) {
            $old_data = $notifiable->getAttributes();
        }

        if ('restored' === $this->action || 'created' === $this->action) {
            $new_data = $notifiable->getAttributes();
        }

        return [
            'action' => $this->action,
            'old_data' => $old_data,
            'new_data' => $new_data,
        ];
    }
}
