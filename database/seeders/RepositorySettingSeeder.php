<?php

namespace Database\Seeders;

use App\Models\RepositorySetting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RepositorySettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        RepositorySetting::factory(10)->create();
    }
}
