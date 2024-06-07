<?php

namespace App\Http\Middleware;

use App\Models\Git;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
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
                'gits' => 0,
                'git_groups' => $this->getGitGroups(),
                'repositories' => $this->getRepositories(),
                'clients' => $this->getClients(),
                'hosting' => $this->getHosting(),

                'notifications' => $this->getNotifications(),
            ]
        ];
    }

    private function getGits(): int
    {
        return Cache::remember('gits_count', 60, function () {
            return DB::table('gits')->count();
        });
    }

    private function getGitGroups(): int
    {
        return Cache::remember('git_groups_count', 60, function () {
            return DB::table('git_groups')->count();
        });
    }

    private function getRepositories(): int
    {
        return Cache::remember('repositories_count', 60, function () {
            return DB::table('repositories')->count();
        });
    }

    private function getClients(): int
    {
        return Cache::remember('clients_count', 60, function () {
            return DB::table('clients')->count();
        });
    }

    private function getHosting(): int
    {
        return Cache::remember('hosting_count', 60, function () {
            return DB::table('hostings')->count();
        });
    }

    private function getNotifications(): int
    {
        return Cache::remember('notifications_count', 60, function () {
            return DB::table('notifications')->count();
        });
    }
}
