<?php

namespace Database\Seeders;

use App\Enums\RepositorySetting\RepositorySettingKeyEnum;
use App\Enums\RepositorySetting\RepositorySettingValueEnum;
use App\Models\Git;
use App\Models\Repository;
use App\Services\GitlabService;
use Illuminate\Database\Seeder;

class RepositorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $gitlab = Git::whereSlug('gitlab')->first();

        GitlabService::getRepositories($gitlab);

        $repositories = Repository::all();

        dd($repositories);

        // for repository create 3 settings from factory
        // $keys = RepositorySettingKeyEnum::cases();
        // $values = RepositorySettingValueEnum::cases();

        // $repositories->each(function ($repository) use ($keys, $values) {
        //     $repository->settings()->createMany([
        //         [
        //             'key' => $keys[array_rand($keys)],
        //             'value' => $values[array_rand($values)],
        //             'date' => fake()->date(),
        //             'is_active' => fake()->boolean(),
        //         ],
        //         [
        //             'key' => $keys[array_rand($keys)],
        //             'value' => $values[array_rand($values)],
        //             'date' => fake()->date(),
        //             'is_active' => fake()->boolean(),
        //         ],
        //         [
        //             'key' => $keys[array_rand($keys)],
        //             'value' => $values[array_rand($values)],
        //             'date' => fake()->date(),
        //             'is_active' => fake()->boolean(),
        //         ],
        //     ]);
        // });

    }
}
