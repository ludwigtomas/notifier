<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Database\Seeders\GitSeeder;
use Illuminate\Database\Seeder;
use Database\Seeders\AdminSeeder;
use Database\Seeders\ClientSeeder;
use Database\Seeders\RepositorySeeder;
use Database\Seeders\ClientRepositorySeeder;
use Database\Seeders\RepositoryDatabaseSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            GitSeeder::class,
            AdminSeeder::class,
            RepositorySeeder::class,
            ClientSeeder::class,
        ]);

        if (app()->isLocal()) {
            $this->call([
                // RepositoryDatabaseSeeder::class,
                ClientRepositorySeeder::class,
            ]);
        }
    }
}
