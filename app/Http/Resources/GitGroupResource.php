<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GitGroupResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'group_id' => $this->group_id,
            'git_id' => $this->git_id,

            'name' => $this->name,
            'web_url' => $this->web_url,
            'parent_id' => $this->parent_id,

            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,

            'relationships' => [
                'git' => $this->whenLoaded('git'),

                'repositories' => $this->whenLoaded('repositories'),

                'parent' => $this->whenLoaded('parent'),
                
                'childrens' => $this->whenLoaded('childrens'),
            ],
        ];
    }
}
