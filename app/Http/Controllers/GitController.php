<?php

namespace App\Http\Controllers;

use Inertia\Response;
use Illuminate\Http\Request;

class GitController extends Controller
{
    public function index(): Response
    {
        return inertia('Gits/Index');
    }
}
