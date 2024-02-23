<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Response;

class VPSController extends Controller
{
    public function index(): Response
    {
        return inertia('VPS/Index');
    }
}
