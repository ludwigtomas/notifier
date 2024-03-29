<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Resources\GitResource;
use App\Http\Resources\ClientResource;
use App\Http\Resources\HostingResource;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\RepositoryDatabaseResource;

class RepositoryResource extends JsonResource
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
            'analytics_property_id' => $this->analytics_property_id,

            'name'  => $this->name,
            'slug' => $this->slug,
            'website_url' => $this->website_url,
            'repository_url' => $this->repository_url,
            'description' => $this->description,

            'database_verification_code' => $this->database_verification_code,
            'last_commit_at' => $this->last_commit_at,
            'last_commit_at_human' => Carbon::parse($this->last_commit_at)->diffForHumans(),
            'repository_created_at' => $this->repository_created_at,
            'repository_created_at_human' => Carbon::parse($this->repository_created_at)->diffForHumans(),

            'created_at' => $this->created_at,
            'created_at_human' => Carbon::parse($this->created_at)->diffForHumans(),

            'updated_at' => $this->updated_at,
            'updated_at_human' => Carbon::parse($this->updated_at)->diffForHumans(),

            'deleted_at' => $this->deleted_at,
            'deleted_at_human' => $this->deleted_at ? Carbon::parse($this->deleted_at)->diffForHumans() : null,

            'client_email' => $this->pivot->client_email ?? null,

            'relationships' => [
                'git' => new GitResource($this->whenLoaded('git')),

                'clients' => ClientResource::collection($this->whenLoaded('clients')),
                'clients_count' => $this->clients_count ?? 0,

                'database_backups' => RepositoryDatabaseResource::collection($this->whenLoaded('database_backups')),
                'database_backups_count' => $this->database_backups_count ?? 0,

                'hosting' => new HostingResource($this->whenLoaded('hosting')),
                'hosting_count' => $this->hosting_count ?? 0,
            ],
        ];
    }
}
