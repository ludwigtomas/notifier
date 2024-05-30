<x-mail::message>
<x-mail::headline>
Google Analytics - report
</x-mail::headline>

@component('mail::table')
| {{ $data['current_month']['month'] }} | {{ $data['previous_month']['month'] }} |
| :------------------------------------: | :------------------------------------: |
@foreach($data['current_month']['most_visited_cities'] as $key => $city)
| {{ $city }} | {{ $data['previous_month']['most_visited_cities'][$key] }} |
@endforeach
@endcomponent

<x-mail::percentage color="{{ $data['visit_percentage_color'] }}">
{{ $data['visit_percentage'] }}% ( celkem {{ $data['visit_difference'] }} návštěv )
</x-mail::percentage>


</x-mail::message>
