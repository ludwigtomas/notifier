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
        return inertia('Dashboard/Index', [
            'git_groups_parent_count' => GitGroup::whereNull('parent_id')->count(),
            'git_groups_childrens_count' => GitGroup::whereNotNull('parent_id')->count(),
            'repositories_count' => Repository::count(),
            'databases_count' => RepositoryDatabase::count(),
            'clients_count' => Client::count(),
        ]);
    }
}
