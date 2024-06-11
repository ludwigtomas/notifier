<x-mail::message>

<x-mail::percentage>
{{ $repository->name }}

za měsíc <b>{{ $data['current_month']['month'] }}</b>
</x-mail::percentage>

<x-mail::paragraph>
Dobrý den,
</x-mail::paragraph>

<x-mail::paragraph>
za měsíc <b>{{ $data['current_month']['month'] }}</b> bylo na webu {{ $repository->name }} zaznamenáno <b>{{ $data['current_month']['visitors'] }}</b> návštěv.  Oproti předchozímu měsíci <b>{{ $data['previous_month']['month'] }}</b> to představuje <b>{{ $data['visit_percentage'] }}%</b> {{ $data['visit_percentage_color'] == 'green' ? 'nárůst' : 'pokles' }}.
</x-mail::paragraph>

<x-mail::paragraph>
Nejvíce návštěvníků přišlo z těchto měst:
</x-mail::paragraph>

<x-mail::table>
| {{ $data['previous_month']['month'] }} | {{ $data['current_month']['month'] }} |
| :------------------------------------: | :------------------------------------: |
@foreach($data['previous_month']['most_visited_cities'] as $key => $city)
| {{ $city }} | {{ $data['current_month']['most_visited_cities'][$key] }} |
@endforeach
</x-mail::table>

<table class="subcopy" width="100%" cellpadding="0" cellspacing="0" role="presentation">
<tr>
<td align="center" style="color: black">
{{ $data['previous_month']['visitors'] }}
</td>
<td align="center" style="color: black">
{{ $data['current_month']['visitors'] }}
</td>
</tr>
</table>

<br>
<br>

<x-mail::percentage color="{{ $data['visit_percentage_color'] }}">
@if ($data['visit_percentage'] >= 0)
<span style="padding-right: 10px">&#128200;</span> <b>{{ $data['visit_percentage'] }}%</b>
@else
<span style="padding-right: 10px">&#128201;</span> <b>{{ $data['visit_percentage'] }}%</b>
@endif

(celkem {{ $data['visit_difference'] }} návštěv)
</x-mail::percentage>

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

</x-mail::message>
