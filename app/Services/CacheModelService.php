<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;

class CacheModelService
{
    /*
    |--------------------------------------------------------------------------
    | COUNT MODELS
    |--------------------------------------------------------------------------
    */

    public static function gitCount(): int
    {
        return Cache::remember('gits_count', 60, fn () => DB::table('gits')->count());
    }

    public static function gitGroupCount(): int
    {
        return Cache::remember('git_groups_count', 60, fn () => DB::table('git_groups')->count());
    }

    public static function gitGroupParentCount(): int
    {
        return Cache::remember('git_groups_parent_count', 60, fn () => DB::table('git_groups')
            ->whereNull('parent_id')
            ->count());
    }

    public static function gitGroupChildCount(): int
    {
        return Cache::remember('git_groups_child_count', 60, fn () => DB::table('git_groups')
            ->whereNotNull('parent_id')
            ->count());
    }

    public static function repositoryCount(): int
    {
        return Cache::remember('repositories_count', 60, fn () => DB::table('repositories')->count());
    }

    public static function repositoryDatabasesCount(): int
    {
        return Cache::remember('repositories_databases_count', 60, fn () => DB::table('repositories')
            ->where('type', 'database')
            ->count());
    }

    public static function clientCount(): int
    {
        return Cache::remember('clients_count', 60, fn () => DB::table('clients')->count());
    }

    public static function hostingCount(): int
    {
        return Cache::remember('hostings_count', 60, fn () => DB::table('hostings')->count());
    }

    public static function notificationCount(): int
    {
        return Cache::remember('notifications_count', 60, fn () => DB::table('notifications')
            ->whereNull('read_at')
            ->count());
    }


    /*
    |--------------------------------------------------------------------------
    | REFRESH MODEL COUNTS
    |--------------------------------------------------------------------------
    */
}
