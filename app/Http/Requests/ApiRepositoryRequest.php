<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ApiRepositoryRequest extends FormRequest
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
            'password' => ['required', 'max:255'],
            'backup_file' => ['required', 'file', 'mimes:sql,zip', 'max:40960'],
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
            'password.required' => 'The password field is required.',
            'password.string' => 'The password field must be a string.',
            'password.min' => 'The password field must be at least 8 characters.',
            'password.max' => 'The password field must not be greater than 255 characters.',

            'backup_file.required' => 'The backup file field is required.',
            'backup_file.file' => 'The backup file field must be a file.',
            'backup_file.mimes' => 'The backup file field must be a file of type: sql, zip.',
            'backup_file.max' => 'The backup file field must not be greater than 40960 kilobytes.',
        ];
    }
}
