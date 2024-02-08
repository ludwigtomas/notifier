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
            'id' => ['required', 'integer', 'unique:repositories,id,' . $this->id],

            'name' => ['required', 'string', 'max:255', 'unique:repositories,name,' . $this->id],
            'website_url' => ['nullable', 'url'],
            'repository_url' => ['nullable', 'url'],
            'description' => ['nullable', 'string'],

            'database_verification_code' => ['required', 'string'],
            'last_commit_at' => ['nullable', 'date'],
            'repository_created_at' => ['nullable', 'date'],
        ];
    }
}
