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
            'analytics_property_id' => ['nullable', 'max:9', 'unique:repositories,analytics_property_id,' . $this->repository->repository_id . ',repository_id'],
            'website_url' => ['nullable', 'url'],
            'repository_url' => ['nullable', 'url'],
            'last_commit_at' => ['nullable', 'date'],
            'description' => ['nullable', 'string'],
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'analytics_property_id.max' => 'The Google Analytics Property ID must not be greater than 9 characters.',
            'analytics_property_id.unique' => 'The Google Analytics Property ID has already been taken.',

            'website_url.url' => 'The Website URL must be a valid URL.',
            'repository_url.url' => 'The Repository URL must be a valid URL.',

            'last_commit_at.date' => 'The Last Commit At must be a valid date.',

            'description.string' => 'The Description must be a string.',
        ];
    }
}
