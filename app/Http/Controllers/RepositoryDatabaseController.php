<?php

namespace App\Http\Controllers;

use App\Models\Repository;
use Illuminate\Http\Request;

class RepositoryDatabaseController extends Controller
{
    public function store(Request $request, Repository $repository)
    {
        return $repository;
    }
}
