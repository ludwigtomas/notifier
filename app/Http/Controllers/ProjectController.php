<?php

namespace App\Http\Controllers;

use Inertia\Response;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index(): Response
    {
        return inertia('Projects/Index');
    }
}
