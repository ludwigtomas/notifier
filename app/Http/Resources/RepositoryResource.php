<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
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
            'name'  => $this->name,
            'slug' => $this->slug,
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


            'relationships' => [
                'git' => new GitResource($this->whenLoaded('git')),

                'clients' => ClientResource::collection($this->whenLoaded('clients')),
                'clients_count' => $this->clients_count ?? 0,

                'database_backups' => RepositoryDatabaseResource::collection($this->whenLoaded('database_backups')),
                'database_backups_count' => $this->database_backups_count ?? 0,
            ],
        ];
    }
}
