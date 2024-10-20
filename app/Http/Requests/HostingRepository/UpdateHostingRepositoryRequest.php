<?php

namespace App\Http\Requests\HostingRepository;

use Illuminate\Foundation\Http\FormRequest;

class UpdateHostingRepositoryRequest extends FormRequest
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
            'hosting_id' => ['required', 'exists:hostings,id'],

            'ip_address' => ['nullable', 'max:255'],
            'ip_port' => ['nullable', 'max:255'],
            'login_user' => ['nullable', 'max:255'],
            'login_password' => ['nullable', 'max:255'],
            'password_type' => ['nullable'],
        ];
    }

    /**
     * Get the validation messages that apply to the request.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'hosting_id.required' => 'The hosting field is required.',
            'hosting_id.exists' => 'The selected hosting is invalid.',

            'repository_id.required' => 'The repository field is required.',
            'repository_id.exists' => 'The selected repository is invalid.',

            'ip_address.string' => 'The ip address must be a string.',
            'ip_address.max' => 'The ip address may not be greater than 255 characters.',

            'ip_port.string' => 'The ip port must be a string.',
            'ip_port.max' => 'The ip port may not be greater than 255 characters.',

            'login_user.string' => 'The login user must be a string.',
            'login_user.max' => 'The login user may not be greater than 255 characters.',

            'login_password.string' => 'The login password must be a string.',
            'login_password.max' => 'The login password may not be greater than 255 characters.',
        ];
    }
}
