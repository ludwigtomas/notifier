<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RepositorySettingShowResource extends JsonResource
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
            'key' => $this->key,
            'value' => $this->value,
            'is_active' => $this->is_active ? true : false,
            'last_attempt_at' => Carbon::parse($this->last_attempt_at)->format('Y-m-d H:i:s'),
            'was_successful' => $this->was_successful,
            'attempts' => $this->attempts,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
