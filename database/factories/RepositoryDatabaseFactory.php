<?php

namespace Database\Factories;

use App\Models\Repository;
use App\Models\RepositoryDatabase;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RepositoryDatabase>
 */
class RepositoryDatabaseFactory extends Factory
{
    protected $model = RepositoryDatabase::class;

    public function definition(): array
    {
        return [
            'repository_id' => Repository::all()->random()->id,
            'name' => fake()->name(),
            'size' => fake()->numberBetween(1, 100000),
            'path' => fake()->name(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
