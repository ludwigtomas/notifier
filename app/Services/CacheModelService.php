<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;

class CacheModelService
{
    public static function GitCount(): int
    {
        return Cache::remember('gits_count', 60, function () {
            return DB::table('gits')->count();
        });
    }

    public static function GitGroupCount(): int
    {
        return Cache::remember('git_groups_count', 60, function () {
            return DB::table('git_groups')->count();
        });
    }
}
