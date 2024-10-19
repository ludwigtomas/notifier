<?php

namespace Database\Factories;

use App\Models\Repository;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Enums\RepositorySetting\RepositorySettingKeyEnum;
use App\Enums\RepositorySetting\RepositorySettingValueEnum;

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
            'date' => fake()->date(),
            'is_active' => fake()->boolean(),
        ];
    }
}
