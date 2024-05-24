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
    public function index(HostingRepository $hosting_repository)
    {
        return inertia('HostingRepository/VpsConnect', [
            'host' => $hosting_repository->ip_address,
            'port' => $hosting_repository->ip_port,
            'username' => $hosting_repository->login_user,
            'password' => $hosting_repository->login_password,
        ]);
    }
}



        // $gitlab = Git::whereSlug('gitlab')->first();

        // GitlabService::getRepositories($gitlab);

        // dd(Repository::withTrashed()->get());

        // dd(Period::days(30));

        // $analyticsData = Analytics::fetchTotalVisitorsAndPageViews(Period::days(30));

        // return $analyticsData;
