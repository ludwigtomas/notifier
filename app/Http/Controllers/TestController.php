<?php

namespace App\Http\Controllers;

use App\Models\Repository;
use App\Models\RepositorySetting;
use App\Services\GitlabService;

class TestController extends Controller
{
    public function index(Repository $repository): void
    {
        // $test_1 = 'a';
        // $test_2 = 'b';

        // if (isset($test_1, $test_2)) {
        //     $test_3 = 'c';
        // }

        GitlabService::getRepositoryAvatar($repository);
    }

    public function test(): void
    {
        $repositories = Repository::query()
            ->with('repositorySettings')
            ->get();

        foreach ($repositories as $repository) {
            foreach ($repository->repositorySettings as $setting) {
                match ($setting->value->value) {
                    'daily' => self::daily($repository, $setting),
                    'weekly' => self::weekly($repository, $setting),
                    'monthly' => self::monthly($repository, $setting),
                };
            }
        }
    }

    private static function daily(Repository $repository, RepositorySetting $setting): void
    {
        if ( ! $setting->is_active) {
            return;
        }

        if ( ! $setting->was_successful) {
            return;
        }

        if (now()->diffInHours($setting->last_attempt_at) < 24) {
            return;
        }

        self::sendApiRequest($repository, $setting);
    }

    private static function weekly(Repository $repository, RepositorySetting $setting): void
    {
        if ( ! $setting->is_active) {
            return;
        }

        if ( ! $setting->was_successful) {
            return;
        }

        if (now()->diffInDays($setting->last_attempt_at) < 7) {
            return;
        }

        self::sendApiRequest($repository, $setting);
    }

    private static function monthly(Repository $repository, RepositorySetting $setting): void
    {
        if ( ! $setting->is_active) {
            return;
        }

        if ( ! $setting->was_successful) {
            return;
        }

        if (now()->diffInDays($setting->last_attempt_at) < 30) {
            return;
        }

        self::sendApiRequest($repository, $setting);
    }

    private static function sendApiRequest(Repository $repository, RepositorySetting $setting): void {}
}

// $gitlab = Git::whereSlug('gitlab')->first();

// GitlabService::getRepositories($gitlab);

// dd(Repository::withTrashed()->get());

// dd(Period::days(30));

// $analyticsData = Analytics::fetchTotalVisitorsAndPageViews(Period::days(30));

// return $analyticsData;
