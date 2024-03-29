<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateClientRepositoryRequest extends FormRequest
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
            'relationship' => ['required', 'string', 'in:repository_client,client_repository'],
            'client_email' => ['nullable', 'email'],
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
            'relationship.required' => 'The relationship field is required.',
            'relationship.string' => 'The relationship field must be a string.',
            'relationship.in' => 'The selected relationship is invalid.',
            
            'client_email.email' => 'The client email must be a valid email address.',
        ];
    }
}
