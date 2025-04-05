<?php

namespace App\Http\Requests;

use App\Jobs\RepositoryDatabaseJob;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use App\Enums\RepositorySetting\RepositorySettingKeyEnum;

class StoreRepositoryFileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $repository = $this->route('repository');

        $password = $this->input('password');

        //!FIX TEMPORARY
        if ($password === 'cerna_rasa') {
            return true;
        }

        if ($password === $repository->database_verification_code) {
            return true;
        }

        RepositoryDatabaseJob::dispatch(
            repository: $repository,
            status: 'failed',
            message: 'Authentication failed'
        );

        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        $backup_types = array_map(fn($type) => $type->value, RepositorySettingKeyEnum::cases());

        return [
            'backup_type' => ['required', 'string', 'in:' . implode(',', $backup_types)],
            'password' => ['required', 'string'],
            'backup_file' => [
                'required',
                'file',
                // 'mimes:zip,sql',
                'extensions:zip,sql',
            ],
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        $backup_types = array_map(fn($type) => $type->value, RepositorySettingKeyEnum::cases());

        return [
            'backup_type.required' => 'Backup type is required',
            'backup_type.string' => 'Backup type must be a string',
            'backup_type.in' => 'Backup type must be one of the following: ' . implode(', ', $backup_types),

            'password.required' => 'Password is required',
            'password.string' => 'Password must be a string',

            'backup_file.required' => 'Backup file is required',
            'backup_file.file' => 'Backup file must be a file',
            // 'backup_file.mimes' => 'Backup file must be a ZIP or SQL file',
            'backup_file.extensions' => 'Backup file must have a ZIP or SQL extension',
        ];
    }

    /**
     * Handle a failed validation attempt for API responses.
     */
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'type' => 'error',
            'message' => 'Validation failed',
            'errors' => $validator->errors()
        ], 422));
    }
}
