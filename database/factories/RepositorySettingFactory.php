<?php

namespace Database\Factories;

use App\Enums\RepositorySetting\RepositorySettingKeyEnum;
use App\Enums\RepositorySetting\RepositorySettingValueEnum;
use App\Models\Repository;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RepositorySetting>
 */
class RepositorySettingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $keys = RepositorySettingKeyEnum::cases();
        $values = RepositorySettingValueEnum::cases();

        return [
            'repository_id' => Repository::all()->random()->id,
            'key' => $keys[array_rand($keys)],
            'value' => $values[array_rand($values)],
            'is_active' => fake()->boolean,
            'last_attempt_at' => fake()->dateTime,
            'attempts' => fake()->numberBetween(0, 10),
            'was_successful' => fake()->boolean,
        ];
    }
}
