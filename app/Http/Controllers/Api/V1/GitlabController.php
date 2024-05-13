<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Git;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\GitlabService;
use Illuminate\Http\JsonResponse;

class GitlabController extends Controller
{
    public function groups(): JsonResponse
    {
        return GitlabService::getGroups();
    }

    public function subgroups($group): JsonResponse
    {
        return GitlabService::getSubgroups($group);
    }

    public function groupDetail($group_id): JsonResponse
    {
        return GitlabService::getGroupDetail($group_id);
    }
}
