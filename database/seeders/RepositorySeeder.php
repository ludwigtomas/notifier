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

        $values = RepositorySettingValueEnum::cases();

        $repositories->each(function ($repository) use ($values): void {
            $repository->repositorySettings()->createMany([
                [
                    'key' => RepositorySettingKeyEnum::BACKUP_DATABASE,
                    'value' => $values[array_rand($values)],
                    'is_active' => fake()->boolean(),
                    'last_attempt_at' => fake()->dateTime(),
                    'attempts' => fake()->numberBetween(0, 10),
                    'was_successful' => fake()->boolean(),
                ],
                [
                    'key' => RepositorySettingKeyEnum::BACKUP_STORAGE,
                    'value' => $values[array_rand($values)],
                    'is_active' => fake()->boolean(),
                    'last_attempt_at' => fake()->dateTime(),
                    'attempts' => fake()->numberBetween(0, 10),
                    'was_successful' => fake()->boolean(),
                ],
            ]);
        });

    }
}
