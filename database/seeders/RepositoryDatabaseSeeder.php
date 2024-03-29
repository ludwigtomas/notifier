<?php

namespace Database\Seeders;

use App\Models\RepositoryDatabase;
use Illuminate\Database\Seeder;

class RepositoryDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        RepositoryDatabase::factory(500)->create();
    }
}
