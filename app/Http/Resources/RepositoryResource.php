<?php

namespace App\Http\Resources;

use App\Models\Repository;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Repository
 */
class RepositoryResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'repository_id' => $this->repository_id,
            'analytics_property_id' => $this->analytics_property_id ?? null,

            'name' => $this->name,
            'slug' => $this->slug,
            'avatar' => $this->avatar,
            'website_url' => $this->website_url,
            'repository_url' => $this->repository_url,
            'description' => $this->description,

            'database_verification_code' => $this->database_verification_code,

            'last_commit_at' => Carbon::parse($this->last_commit_at)->format('Y-m-d H:i:s'),
            'last_commit_at_human' => $this->last_commit_at ? Carbon::parse($this->last_commit_at)->diffForHumans() : null,

            'repository_created_at' => $this->repository_created_at,
            'repository_created_at_human' => Carbon::parse($this->repository_created_at)->diffForHumans(),

            'created_at' => $this->created_at,
            'created_at_human' => Carbon::parse($this->created_at)->diffForHumans(),

            'updated_at' => $this->updated_at,
            'updated_at_human' => Carbon::parse($this->updated_at)->diffForHumans(),

            'deleted_at' => $this->deleted_at,
            'deleted_at_human' => $this->deleted_at ? Carbon::parse($this->deleted_at)->diffForHumans() : null,

            'client_email_secondary' => $this->pivot->client_email_secondary ?? null,

            'relationships' => [
                'clients_count' => $this->clients_count ?? 0,
                'repository_settings_count' => $this->repository_settings_count ?? 0,
                'repository_database_backups_count' => $this->repository_database_backups_count ?? 0,
                'repository_storage_backups_count' => $this->repository_storage_backups_count ?? 0,
                'notifications_count' => $this->notifications_count ?? 0,

                'git' => new GitResource($this->whenLoaded('git')),
                'clients' => ClientResource::collection($this->whenLoaded('clients')),
                'hosting' => new HostingResource($this->whenLoaded('hosting')),
                'hosting_repository' => $this->whenLoaded('hostingRepository'),
                'notifications' => NotificationIndexResource::collection($this->whenLoaded('notifications')),
                'repository_settings' => RepositorySettingIndexResource::collection($this->whenLoaded('repositorySettings')),
            ],
        ];
    }
}
