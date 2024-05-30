<?php

namespace App\Http\Controllers;

use App\Models\Git;
use App\Models\Hosting;
use App\Models\HostingRepository;
use App\Models\Repository;
use Spatie\Analytics\Period;
use App\Services\GitlabService;
use Spatie\Analytics\Facades\Analytics;

class TestController extends Controller
{
    public function index(Repository $repository)
    {
        GitlabService::getRepositoryAvatar($repository);
    }
}



        // $gitlab = Git::whereSlug('gitlab')->first();

        // GitlabService::getRepositories($gitlab);

        // dd(Repository::withTrashed()->get());

        // dd(Period::days(30));

        // $analyticsData = Analytics::fetchTotalVisitorsAndPageViews(Period::days(30));

        // return $analyticsData;
