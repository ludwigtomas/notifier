<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function index(): Response
    {
        return inertia('Clients/Index');
    }

    public function store(Request $request): RedirectResponse
    {
        dD($request->all());
    }
}
