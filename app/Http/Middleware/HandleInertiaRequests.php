<?php

namespace App\Http\Middleware;

use App\Services\CacheModelService;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],

            'global' => [
                'gits_count' => CacheModelService::gitCount(),
                'git_groups_count' => CacheModelService::gitGroupCount(),
                'git_group_parent_count' => CacheModelService::gitGroupParentCount(),
                'git_group_child_count' => CacheModelService::gitGroupChildCount(),
                'repositories_count' => CacheModelService::repositoryCount(),
                'clients_count' => CacheModelService::clientCount(),
                'hostings_count' => CacheModelService::hostingCount(),
                'workers_count' => CacheModelService::workerCount(),
                'new_notifications_count' => CacheModelService::newNotificationCount(),
                'notifications_count' => CacheModelService::notificationCount(),
            ],
        ];
    }
}
