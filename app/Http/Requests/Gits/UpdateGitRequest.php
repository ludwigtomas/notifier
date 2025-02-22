<?php

namespace App\Http\Requests\Gits;

use Illuminate\Foundation\Http\FormRequest;

class UpdateGitRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255', 'unique:gits,name,'.$this->git->id],
            'api_token' => ['nullable', 'string', 'max:255'],

            'username' => ['nullable', 'string', 'max:255'],
            'user_id' => ['nullable', 'string', 'max:255'],
            'user_avatar_url' => ['nullable', 'string', 'max:255'],
        ];
    }
}
