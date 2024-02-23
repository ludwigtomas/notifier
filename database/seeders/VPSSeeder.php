<?php

namespace Database\Seeders;

use App\Models\VPS;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VPSSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        VPS::factory(100)->create();
    }
}
