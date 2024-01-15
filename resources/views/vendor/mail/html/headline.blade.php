@props([
    'color' => 'primary',
    'align' => 'center',
])
<table class="headline" align="{{ $align }}" width="100%" cellpadding="0" cellspacing="0" role="presentation">
<tr>
<td align="{{ $align }}">
<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
<tr>
<td align="{{ $align }}">
<table border="0" cellpadding="0" cellspacing="0" role="presentation">
<tr>
<td>
<h1 class="button button-{{ $color }}">{{ $slot }}</h1>
</td>
</tr>
</table>
</td>
</tr>
</table>
</td>
</tr>
</table>
