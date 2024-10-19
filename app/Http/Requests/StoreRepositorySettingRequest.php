<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Enums\RepositorySetting\RepositorySettingKeyEnum;
use App\Enums\RepositorySetting\RepositorySettingValueEnum;

class StoreRepositorySettingRequest extends FormRequest
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
        $keys = implode(',', array_keys(RepositorySettingKeyEnum::cases()));
        $values = implode(',', array_keys(RepositorySettingValueEnum::cases()));

        return [
            'repository_id' => ['required', 'exists:repositories,id'],
            'key' => ['required', 'string', 'in:' . $keys],
            'value' => ['required', 'string', 'in:' . $values],
            'is_active' => ['required', 'boolean'],
        ];
    }
}
