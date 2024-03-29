<x-mail::message>

<x-mail::headline>
{{ $repository->name }}
</x-mail::headline>

<x-mail::panel color="blue">
Na Vaší webové stránce byla provedena aktualizace.
</x-mail::panel>

<p>
Dobrý den, {{ $client->name }}!
</p>

<br>

<p>
Rád bych Vás informoval, že Vaše stránka byla aktualizována.
</p>

<br>

<p>
Pokud máte nějaké otázky nebo potřebujete další informace, neváhejte mě kontaktovat.
</p>

<x-mail::panel color="green">
Kontaktní informace:<br>
<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z' /%3E%3C/svg%3E" alt="Email Ikonka" style="vertical-align: middle; width: 1.5rem; height: 1.5rem; margin-right: 0.5rem;"> info@ludwigtomas.cz<br>
<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3' /%3E%3C/svg%3E" alt="Telefon Ikonka" style="vertical-align: middle; width: 1.5rem; height: 1.5rem; margin-right: 0.5rem;"> +420 730 681 670<br>
<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244' /%3E%3C/svg%3E" alt="Ikonka" style="vertical-align: middle; width: 1.5rem; height: 1.5rem; margin-right: 0.5rem;"> www.ludwigtomas.cz
</x-mail::panel>

<p>
Chcete-li zrušit zasílání novinek, kontaktujte mě pomocí emailu.
</p>


<br>

<p>
Děkuji za Vaši důvěru a přeji hezký zbytek dne.
</p>

<br>
<br>

<p>
S pozdravem,<br>
Tomáš Ludwig.
</p>

</x-mail::message>
