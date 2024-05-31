<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRepositoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            // 'analytics_property_id' => ['nullable', 'integer', 'unique:repositories,analytics_property_id,'.$this->repository->repository_id],
            'website_url' => ['nullable', 'url'],
            'repository_url' => ['nullable', 'url'],
            'last_commit_at' => ['nullable', 'date'],
            'description' => ['nullable', 'string'],
        ];
    }
}
