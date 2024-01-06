<?php

namespace App\Http\Controllers;

use Inertia\Response;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function index(): Response
    {
        return inertia('Clients/Index');
    }
}
