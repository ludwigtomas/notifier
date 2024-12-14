<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\ClientRepository;
use App\Models\Repository;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ClientRepositorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::transaction(function (): void {
            for ($i = 0; $i < 100; $i++) { // Adjust the number of records as needed
                $this->createUniqueClientRepository();
            }
        });
    }

    private function createUniqueClientRepository(): void
    {
        do {
            $client_id = Client::all()->random()->id;
            $repository_id = Repository::all()->random()->repository_id;
        } while (ClientRepository::where('client_id', $client_id)->where('repository_id', $repository_id)->exists());

        ClientRepository::create([
            'client_id' => $client_id,
            'repository_id' => $repository_id,
        ]);
    }
}
