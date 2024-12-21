<x-mail::message>

<x-mail::percentage>
{{ $repository->name }}

proběhla <b>aktualizace</b>
</x-mail::percentage>

<x-mail::paragraph>
Dobrý den, {{ $client->name }} !
</x-mail::paragraph>

<x-mail::paragraph>
Rád bych Vás informoval, že na Vaší stránce <b>{{ $repository->name }}</b> byla provedena aktualizace.
</x-mail::paragraph>

<x-mail::panel color="green" content_color="green">
{{ $commit_message ? $commit_message : 'Proběhla aktualizace' }}.
</x-mail::panel>

<x-mail::paragraph>
Pokud máte nějaké otázky nebo potřebujete konkrétnější informace, neváhejte mě kontaktovat.
</x-mail::paragraph>

<x-mail::paragraph>
Kontaktní informace:
</x-mail::paragraph>

<x-mail::percentage color="grey">
<a href='mailto:info@ludwigtomas.cz'>info@ludwigtomas.cz</a>
<br>
<a href='tel:+420730681670'>+420 730 681 670</a>
<br>
<a href='https://www.ludwigtomas.cz'>www.ludwigtomas.cz</a>
</x-mail::percentage>

<x-mail::paragraph>
Děkuji za Vaší důvěru a přeji hezký zbytek dne.
</x-mail::paragraph>

<br>

<x-mail::paragraph>
S pozdravem,<br>
Tomáš Ludwig.
</x-mail::paragraph>

</x-mail::message>
