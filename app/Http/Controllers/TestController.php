<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Analytics\Period;
use Spatie\Analytics\Facades\Analytics;

class TestController extends Controller
{
    public function index()
    {
        dd(Period::days(30));

        $analyticsData = Analytics::fetchTotalVisitorsAndPageViews(Period::days(30));

        return $analyticsData;
    }
}
