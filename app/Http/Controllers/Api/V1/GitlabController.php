<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Git;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\GitlabService;

class GitlabController extends Controller
{
    public function groups()
    {
        $gitlab = Git::whereSlug('gitlab')->first();

        $groups = GitlabService::getGroups($gitlab);

        return response()->json([
            'data' => $groups,
        ]);
    }
}
