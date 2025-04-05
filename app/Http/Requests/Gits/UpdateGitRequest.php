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
            'name.unique' => 'The name field must be unique.',

            'api_token.string' => 'The api token field must be a string.',
            'api_token.max' => 'The api token field must not exceed 255 characters.',

            'username.string' => 'The username field must be a string.',
            'username.max' => 'The username field must not exceed 255 characters.',

            'user_id.string' => 'The user id field must be a string.',
            'user_id.max' => 'The user id field must not exceed 255 characters.',

            'user_avatar_url.string' => 'The user avatar url field must be a string.',
            'user_avatar_url.max' => 'The user avatar url field must not exceed 255 characters.',
        ];
    }
}
