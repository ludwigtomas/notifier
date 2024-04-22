<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Repository;
use App\Models\RepositoryDatabase;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return inertia('Dashboard/Index', [
            'repositories_count' => Repository::count(),
            'databases_count' => RepositoryDatabase::count(),
            'clients_count' => Client::count(),
        ]);
    }
}
