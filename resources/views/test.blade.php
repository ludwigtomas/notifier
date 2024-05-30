<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <head>
        <link rel="stylesheet" href="/resources/css/app.css">
    </head>
<body>

</body>
</html>


<ul>
    @foreach ($response as $item)
        <li class="w-40 border border-black">
            {{ $item->getDimensionValues()[0]->getValue() }}
            {{ $item->getMetricValues()[0]->getValue() }}
        </li>
    @endforeach


