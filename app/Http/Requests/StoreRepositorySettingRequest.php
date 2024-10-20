<?php

namespace App\Http\Requests;

use App\Enums\RepositorySetting\RepositorySettingKeyEnum;
use App\Enums\RepositorySetting\RepositorySettingValueEnum;
use Illuminate\Foundation\Http\FormRequest;

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
        $keys = RepositorySettingKeyEnum::cases();
        $values = RepositorySettingValueEnum::cases();

        $keys = array_map(fn($key) => $key->value, $keys);
        $values = array_map(fn($value) => $value->value, $values);

        return [
            'key' => ['required', 'string', 'in:' . implode(',', $keys)],
            'value' => ['required', 'string', 'in:' . implode(',', $values)],
            'is_active' => ['required', 'boolean'],
        ];
    }
}
