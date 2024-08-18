<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NotificationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'type' => $this->type,
            'type_formatted' => explode('App\\Notifications\\', $this->type)[1],
            'data' => $this->data,
            'read_at' => $this->read_at,
            'notifiable_id' => $this->notifiable_id,
            'notifiable_type' => $this->notifiable_type,
            'notifiable_type_formatted' => explode('App\\Models\\', $this->notifiable_type)[1],

            'created_at' => $this->created_at,
            'created_at_formatted' => $this->created_at->format('H:i:s d.m.Y'),
            'created_at_human' => $this->created_at->diffForHumans(),

            'updated_at' => $this->updated_at,
            'updated_at_formatted' => $this->updated_at->format('H:i:s d.m.Y'),
            'updated_at_human' => $this->updated_at->diffForHumans(),

            'relationships' => [
                'notifiable' => $this->whenLoaded('notifiable'),
            ],
        ];
    }
}
