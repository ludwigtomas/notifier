<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

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
            // RepositorySeeder::class,
            ClientSeeder::class,
        ]);

        if (app()->isLocal()) {
            $this->call([
                // ClientRepositorySeeder::class,
                // RepositoryDatabaseSeeder::class,
                // HostingSeeder::class,
            ]);
        }
    }
}
