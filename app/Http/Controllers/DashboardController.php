<?php

namespace App\Http\Controllers;

use Inertia\Response;
use App\Models\Client;
use App\Models\GitGroup;
use App\Models\Repository;
use App\Models\RepositoryDatabase;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return inertia('Dashboard/Index');
    }
}
