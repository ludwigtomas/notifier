<?php

namespace Database\Factories;

use App\Models\Client;
use App\Models\ClientRepository;
use App\Models\Repository;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ClientRepository>
 */
class ClientRepositoryFactory extends Factory
{
    protected $model = ClientRepository::class;

    public function definition(): array
    {
        do {
            $client_id = Client::all()->random()->id;
            $repository_id = Repository::all()->random()->repository_id;
        } while (ClientRepository::where('client_id', $client_id)->where('repository_id', $repository_id)->exists());

        return [
            'client_id' => $client_id,
            'repository_id' => $repository_id,
        ];
    }
}
