<?php

namespace App\Http\Requests;

use App\Enums\RepositorySetting\RepositorySettingKeyEnum;
use App\Enums\RepositorySetting\RepositorySettingValueEnum;
use Illuminate\Foundation\Http\FormRequest;

class UpdateRepositorySettingRequest extends FormRequest
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
        $keys = RepositorySettingKeyEnum::cases();
        $values = RepositorySettingValueEnum::cases();

        return [
            'key' => ['required', 'string'],
            'value' => ['required', 'string'],
            'is_active' => ['required', 'boolean'],
            'last_attempt_at' => ['required', 'date'],
            'attempts' => ['required', 'integer'],
            'was_successful' => ['required', 'boolean'],
        ];
    }
}
