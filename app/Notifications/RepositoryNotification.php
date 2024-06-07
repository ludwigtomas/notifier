<?php

namespace App\Notifications;

use App\Models\Repository;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class RepositoryNotification extends Notification
{
    use Queueable;

    public function __construct(
        public Repository $repository,
        public string $action,
    ) {
    }

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toDatabase(object $notifiable): array
    {
        return [
            'repository' => [$this->repository],
            'action' => $this->action,
            'message' => 'Repository has been updated.',
        ];
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
