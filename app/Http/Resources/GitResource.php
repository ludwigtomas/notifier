<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GitResource extends JsonResource
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
            'slug' => $this->slug,
            'api_token' => $this->api_token,

            'username' => $this->username,
            'user_id' => $this->user_id,
            'user_avatar_url' => $this->user_avatar_url,

            'relationships' => [
                'git_groups_parent' => GitGroupResource::collection($this->whenLoaded('gitGroupsParent')),
                'git_groups_parent_count' => $this->git_groups_parent_count ?? 0,

                'git_groups_children' => GitGroupResource::collection($this->whenLoaded('gitGroupsChildren')),
                'git_groups_children_count' => $this->git_groups_children_count ?? 0,

                'repositories' => RepositoryResource::collection($this->whenLoaded('repositories')),
                'repositories_count' => $this->repositories_count ?? 0,
            ],

        ];
    }
}
