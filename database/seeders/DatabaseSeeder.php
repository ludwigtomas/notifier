<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\GitSeeder;
use Database\Seeders\AdminSeeder;
use Database\Seeders\ClientSeeder;

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
            ClientRepositorySeeder::class,
        ]);
    }
}
