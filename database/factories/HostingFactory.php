<?php

namespace Database\Factories;

use App\Models\Hosting;
use App\Models\Repository;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Hosting>
 */
class HostingFactory extends Factory
{
    protected $model = Hosting::class;

    public function definition(): array
    {
        return [
            'repository_id' => Repository::all()->random()->id,
            'name' => fake()->name,
            'hosting' => fake()->word,
            'ip_address' => fake()->ipv4,
            'ip_port' => fake()->numberBetween(1, 65535),
            'login_user' => fake()->userName,
            'login_password' => fake()->password,
        ];
    }
}
