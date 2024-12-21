<?php

namespace App\Http\Resources;

use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Client
 */
class ClientResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'ico' => $this->ico,

            'created_at' => $this->created_at,
            'created_at_human' => $this->created_at->diffForHumans(),

            'updated_at' => $this->updated_at,
            'updated_at_human' => $this->updated_at->diffForHumans(),

            'client_email_secondary' => $this->pivot->client_email_secondary ?? null,

            'relationships' => [
                'repositories' => RepositoryResource::collection($this->whenLoaded('repositories')),
                'repositories_count' => $this->repositories_count ?? 0,
            ],
        ];
    }
}
