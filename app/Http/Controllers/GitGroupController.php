<?php

namespace App\Http\Controllers;

use Inertia\Response;
use Illuminate\Http\Request;

class GitGroupController extends Controller
{
    public function index(): Response
    {
        return inertia('GitGroups/Index');
    }
}
