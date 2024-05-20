<?php

namespace App\Http\Controllers;

use App\Models\Git;
use App\Models\Hosting;
use App\Models\Repository;
use Spatie\Analytics\Period;
use App\Services\GitlabService;
use Spatie\Analytics\Facades\Analytics;

class TestController extends Controller
{
    public function index()
    {
        $vps = Hosting::first();

        return inertia('SSHClient', [
            'host' => $vps->ip_address,
            'port' => $vps->ip_port,
            'username' => $vps->login_user,
            'password' => $vps->login_password,
        ]);
    }
}



        // $gitlab = Git::whereSlug('gitlab')->first();

        // GitlabService::getRepositories($gitlab);

        // dd(Repository::withTrashed()->get());

        // dd(Period::days(30));

        // $analyticsData = Analytics::fetchTotalVisitorsAndPageViews(Period::days(30));

        // return $analyticsData;
