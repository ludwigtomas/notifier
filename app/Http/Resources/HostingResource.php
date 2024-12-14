<?php

namespace App\Http\Resources;

use App\Models\Hosting;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Hosting
 */
class HostingResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'hosting_url' => $this->hosting_url,

            'relationships' => [
                'repositories' => RepositoryResource::collection($this->whenLoaded('repositories')),
                'repositories_count' => $this->repositories_count ?? 0,

                // 'hosting_repositories' => RepositoryResource::collection($this->whenLoaded('hosting_repositories')),
                'hosting_repositories' => $this->whenLoaded('hosting_repositories'),
                'hosting_repositories_count' => $this->hosting_repositories_count ?? 0,
            ],
        ];
    }
}
