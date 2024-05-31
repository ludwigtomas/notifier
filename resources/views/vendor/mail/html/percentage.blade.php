@props([
    'color' => 'primary',
    'content_color' => 'default',
])

<table class="percentage percentage-{{ $color }}" width="100%" cellpadding="0" cellspacing="0" role="presentation">
<tr>
<td class="percentage-content percentage-content-{{ $color }}">
<table width="100%" cellpadding="0" cellspacing="0" role="presentation">
<tr>
<td class="percentage-text-center percentage-text-center-{{ $color }}">
{{ Illuminate\Mail\Markdown::parse($slot) }}
</td>
</tr>
</table>
</td>
</tr>
</table>
