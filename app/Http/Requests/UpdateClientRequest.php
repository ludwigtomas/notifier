<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;


class UpdateClientRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255', 'unique:clients,name,' . $this->client->id],
            'email' => ['required', 'email', 'max:255', 'unique:clients,email,' . $this->client->id],
            'phone' => ['nullable', 'string', 'max:255'],
            'ico' => ['nullable', 'string', 'max:10', 'unique:clients,ico,' . $this->client->id],
        ];
    }

    /**
     * Get the validation messages that apply to the request.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Jméno je povinný údaj.',
            'name.string' => 'Jméno musí být text.',
            'name.max' => 'Jméno může mít maximálně 255 znaků.',
            'name.unique' => 'Jméno již existuje.',

            'email.required' => 'Email je povinný údaj.',
            'email.email' => 'Email musí být platný email.',
            'email.max' => 'Email může mít maximálně 255 znaků.',
            'email.unique' => 'Email již existuje.',

            'phone.string' => 'Telefonní číslo musí být text.',
            'phone.max' => 'Telefonní číslo může mít maximálně 255 znaků.',

            'ico.string' => 'IČO musí být text.',
            'ico.max' => 'IČO může mít maximálně 10 znaků.',
            'ico.unique' => 'IČO již existuje.',
        ];
    }
}
