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

            'auth.user' => fn () => $request->user()
                ? $request->user()
                : null,

            'global' => [
                'gits_count' => fn () => CacheModelService::gitCount(),
                'git_groups_count' => fn () => CacheModelService::gitGroupCount(),
                'git_group_parent_count' => fn () => CacheModelService::gitGroupParentCount(),
                'git_group_child_count' => fn () => CacheModelService::gitGroupChildCount(),
                'repositories_count' => fn () => CacheModelService::repositoryCount(),
                'clients_count' => fn () => CacheModelService::clientCount(),
                'hostings_count' => fn () => CacheModelService::hostingCount(),
                'workers_count' => fn () => CacheModelService::workerCount(),
                'new_notifications_count' => fn () => CacheModelService::newNotificationCount(),
                'notifications_count' => fn () => CacheModelService::notificationCount(),
            ],

            'environment' => app()->environment(),
        ];
    }
}
