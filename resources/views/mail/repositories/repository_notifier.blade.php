<x-mail::message>

<x-mail::headline>
{{ $repository->name }}
</x-mail::headline>

<x-mail::panel color="blue">
Na Vaší webové stránce byla provedena aktualizace.
</x-mail::panel>


Přejí krásný zbytek dne,<br>
{{ config('app.name') }}
</x-mail::message>
