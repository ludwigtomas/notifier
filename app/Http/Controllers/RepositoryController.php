<?php

namespace App\Http\Controllers;

use Inertia\Response;
use App\Models\Repository;
use Illuminate\Http\Request;

class RepositoryController extends Controller
{
    public function index(): Response
    {
        return inertia('Repositories/Index', [
            'repositories' => Repository::all(),
        ]);
    }
}
