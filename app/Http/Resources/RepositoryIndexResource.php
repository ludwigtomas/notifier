<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RepositoryIndexResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'repository_id' => $this->repository_id,
            'analytics_property_id' => $this->analytics_property_id ?? null,

            'name' => $this->name,
            'avatar' => $this->avatar,
            'website_url' => $this->website_url,
            'repository_url' => $this->repository_url,

            'last_commit_at_human' => $this->last_commit_at ? Carbon::parse($this->last_commit_at)->diffForHumans() : null,
            'deleted_at' => $this->deleted_at,

            'relationships' => [
                'clients' => ClientResource::collection($this->whenLoaded('clients')),
                'clients_count' => $this->clients_count ?? 0,

                'database_backups_count' => $this->database_backups_count ?? 0,

                'hosting_repository' => $this->whenLoaded('hostingRepository'),
            ],
        ];
    }
}
