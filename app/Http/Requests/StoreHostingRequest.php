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
            'repository_id' => ['required', 'exists:repositories,id'],
            'name' => ['nullable', 'string', 'max:255'],
            'hosting' => ['nullable', 'string', 'max:255'],
            'ip_address' => ['nullable', 'string', 'max:255'],
            'ip_port' => ['nullable', 'string', 'max:255'],
            'login_user' => ['nullable', 'string', 'max:255'],
            'login_password' => ['nullable', 'string', 'max:255'],

        ];
    }
}
