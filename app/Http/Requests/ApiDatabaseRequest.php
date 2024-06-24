<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ApiDatabaseRequest extends FormRequest
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
            'password' => ['required', 'string'],
            'backup_file' => ['required', 'file'],
        ];
    }

    public function messages(): array
    {
        return [
            'password.required' => 'Password is required',
            'password.string' => 'Password must be a string',
            'backup_file.required' => 'Backup file is required',
            'backup_file.file' => 'Backup file must be a file',
        ];
    }
}
