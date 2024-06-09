<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreHostingRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
            // 'repository_id' => ['required', 'exists:repositories,repository_id'],
            // 'hosting' => ['nullable', 'string', 'max:255'],
            // 'ip_address' => ['nullable', 'string', 'max:255'],
            // 'ip_port' => ['nullable', 'string', 'max:255'],
            // 'login_user' => ['nullable', 'string', 'max:255'],
            // 'login_password' => ['nullable', 'string', 'max:255'],
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
            'name.required' => 'The name field is required.',
            'name.string' => 'The name field must be a string.',
            'name.max' => 'The name field must not exceed 255 characters.',
            // 'repository_id.required' => 'The repository_id field is required.',
            // 'repository_id.exists' => 'The selected repository_id is invalid.',
            // 'hosting.string' => 'The hosting field must be a string.',
            // 'hosting.max' => 'The hosting field must not exceed 255 characters.',
            // 'ip_address.string' => 'The ip_address field must be a string.',
            // 'ip_address.max' => 'The ip_address field must not exceed 255 characters.',
            // 'ip_port.string' => 'The ip_port field must be a string.',
            // 'ip_port.max' => 'The ip_port field must not exceed 255 characters.',
            // 'login_user.string' => 'The login_user field must be a string.',
            // 'login_user.max' => 'The login_user field must not exceed 255 characters.',
            // 'login_password.string' => 'The login_password field must be a string.',
            // 'login_password.max' => 'The login_password field must not exceed 255 characters.',
        ];
    }
}
