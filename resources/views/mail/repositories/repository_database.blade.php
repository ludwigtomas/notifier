<x-mail::message>

<x-mail::headline>
{{ $repository->name }}
</x-mail::headline>

# Stav databáze: {{ $status }}

<x-mail::panel color="{{ $status }}">
{{ $message }}
</x-mail::panel>

{{ config('app.name') }}
</x-mail::message>
