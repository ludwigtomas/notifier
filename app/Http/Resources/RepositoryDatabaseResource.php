<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\RepositoryResource;
use Illuminate\Http\Resources\Json\JsonResource;

class RepositoryDatabaseResource extends JsonResource
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
            'name' => $this->name,
            'size' => $this->size,
            'path' => $this->path,

            'created_at' => $this->created_at,
            'created_at_human' => $this->created_at->diffForHumans(),

            'updated_at' => $this->updated_at,
            'updated_at_human' => $this->updated_at->diffForHumans(),

            'relationships' => [
                'repository' => new RepositoryResource($this->whenLoaded('repository')),
            ],

        ];
    }
}
