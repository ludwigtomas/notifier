<?php

namespace App\Http\Controllers;

use App\Models\Git;
use App\Models\Repository;
use App\Services\GitlabService;
use Spatie\Analytics\Facades\Analytics;
use Spatie\Analytics\Period;

class TestController extends Controller
{
    public function index()
    {
        $gitlab = Git::whereSlug('gitlab')->first();

        GitlabService::getRepositories($gitlab);

        // dd(Repository::withTrashed()->get());

        // dd(Period::days(30));

        // $analyticsData = Analytics::fetchTotalVisitorsAndPageViews(Period::days(30));

        // return $analyticsData;
    }
}
