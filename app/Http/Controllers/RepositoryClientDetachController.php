<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Repository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class RepositoryClientDetachController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Repository $repository, Client $client): RedirectResponse
    {
        $repository->clients()->detach($client);

        return back();
    }
}
