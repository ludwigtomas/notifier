<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class CacheModelService
{
    /*
    |--------------------------------------------------------------------------
    | COUNT MODELS
    |--------------------------------------------------------------------------
    */

    public static function gitCount(): int
    {
        return Cache::flexible('gits_count', [60, 120], fn () => DB::table('gits')->count());
    }

    public static function gitGroupCount(): int
    {
        return Cache::flexible('git_groups_count', [60, 120], fn () => DB::table('git_groups')->count());
    }

    public static function gitGroupParentCount(): int
    {
        return Cache::flexible('git_groups_parent_count', [60, 120], fn () => DB::table('git_groups')
            ->whereNull('parent_id')
            ->count());
    }

    public static function gitGroupChildCount(): int
    {
        return Cache::flexible('git_groups_child_count', [60, 120], fn () => DB::table('git_groups')
            ->whereNotNull('parent_id')
            ->count());
    }

    public static function repositoryCount(): int
    {
        return Cache::flexible('repositories_count', [60, 120], fn () => DB::table('repositories')->count());
    }

    public static function clientCount(): int
    {
        return Cache::flexible('clients_count', [60, 120], fn () => DB::table('clients')->count());
    }

    public static function workerCount(): int
    {
        return Cache::flexible('workers_count', [60, 120], fn () => DB::table('workers')->count());
    }

    public static function hostingCount(): int
    {
        return Cache::flexible('hostings_count', [60, 120], fn () => DB::table('hostings')->count());
    }

    public static function newNotificationCount(): int
    {
        return Cache::flexible('new_notifications_count', [60, 120], fn () => DB::table('notifications')
            ->whereNull('read_at')
            ->whereJsonContains('data', ['action' => 'created'])
            ->count());
    }

    public static function notificationCount(): int
    {
        return Cache::flexible('notifications_count', [60, 120], fn () => DB::table('notifications')
            ->count());
    }
}
