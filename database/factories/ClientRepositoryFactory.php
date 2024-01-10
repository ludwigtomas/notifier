<?php

namespace Database\Factories;

use App\Models\Client;
use App\Models\Repository;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ClientRepository>
 */
class ClientRepositoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'client_id' => Client::all()->random()->id,
            'repository_id' => Repository::all()->random()->id,
            'client_email' => fake()->email,
        ];
    }
}
