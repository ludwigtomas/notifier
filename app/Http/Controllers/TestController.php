<?php

namespace App\Http\Controllers;

use App\Models\Repository;
use Spatie\Analytics\Facades\Analytics;
use Spatie\Analytics\Period;

class TestController extends Controller
{
    public function index()
    {
        dd(Repository::withTrashed()->get());

        dd(Period::days(30));

        $analyticsData = Analytics::fetchTotalVisitorsAndPageViews(Period::days(30));

        return $analyticsData;
    }
}
