<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreClientRequest extends FormRequest
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
            'name'           => ['required', 'string', 'max:255'],
            'email'          => ['required', 'email', 'max:255', 'unique:clients,email'],
            'phone'          => ['nullable', 'string', 'max:255'],
            'ico'            => ['nullable', 'integer', 'unique:clients,ico'],
            'repositories'   => ['nullable', 'array'],
            'repositories.*' => ['integer', 'exists:repositories,id'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required'          => 'Zadajte název',
            'email.required'         => 'Zadajte email',
            'phone.required'         => 'Zadajte telefonní číslo',

            'repositories.required'  => 'Vyberte aspoň jeden repozitář',
            'repositories.array'     => 'Vyberte aspoň jeden repozitář',
            'repositories.*.integer' => 'Vyberte aspoň jeden repozitář',
            'repositories.*.exists'  => 'Vyberte aspoň jeden repozitář',
        ];
    }
}
