<?php

namespace App\Http\Resources;

use App\Models\HostingRepository;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin HostingRepository
 */
class HostingRepositoryResource extends JsonResource
{
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
