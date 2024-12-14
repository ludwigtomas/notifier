<?php

namespace App\Http\Resources;

use App\Models\RepositoryFile;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin RepositoryFile
 */
class RepositoryFileResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'repository_id' => $this->repository_id,

            'file_type' => $this->file_type,
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
