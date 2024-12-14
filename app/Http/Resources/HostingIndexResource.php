<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HostingIndexResource extends JsonResource
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
            'hosting_url' => $this->hosting_url,

            'relationships' => [
                'repositories_count' => $this->repositories_count ?? 0,
                'hosting_repositories_count' => $this->hosting_repositories_count ?? 0,
            ],
        ];
    }
}
