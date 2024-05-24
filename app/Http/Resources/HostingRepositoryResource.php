<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\HostingResource;
use App\Http\Resources\RepositoryResource;
use Illuminate\Http\Resources\Json\JsonResource;

class HostingRepositoryResource extends JsonResource
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

            'ip_address' => $this->ip_address,
            'ip_port' => $this->ip_port,
            'login_user' => $this->login_user,
            'login_password' => $this->login_password,

            'relationships' => [
                'repository' => new RepositoryResource($this->whenLoaded('repository')),
                'hosting' => new HostingResource($this->whenLoaded('hosting')),
            ],

        ];
    }
}
