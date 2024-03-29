<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ClientRepository;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ClientRepositorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ClientRepository::factory(10)->create();
    }
}
