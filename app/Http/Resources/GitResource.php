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
                'git_groups' => GitGroupResource::collection($this->whenLoaded('gitGroups')),
                'git_groups_count' => $this->git_groups_count ?? 0,

                'repositories' => RepositoryResource::collection($this->whenLoaded('repositories')),
                'repositories_count' => $this->repositories_count ?? 0,
            ],

        ];
    }
}
