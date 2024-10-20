<?php

namespace App\Http\Controllers;

use App\Models\Git;
use App\Models\Repository;
use App\Services\GitlabService;
use Spatie\Analytics\Facades\Analytics;
use Spatie\Analytics\Period;

class TestController extends Controller
{
    public function index(Repository $repository): void
    {
        $test_1 = 'a';
        $test_2 = 'b';

        if (isset($test_1, $test_2)) {
            $test_3 = 'c';
        }

        GitlabService::getRepositoryAvatar($repository);
    }
}

// $gitlab = Git::whereSlug('gitlab')->first();

// GitlabService::getRepositories($gitlab);

// dd(Repository::withTrashed()->get());

// dd(Period::days(30));

// $analyticsData = Analytics::fetchTotalVisitorsAndPageViews(Period::days(30));

// return $analyticsData;
