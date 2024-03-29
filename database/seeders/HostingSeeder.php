<?php

namespace Database\Seeders;

use App\Models\Hosting;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class HostingSeeder extends Seeder
{
    public function run(): void
    {
        Hosting::factory(100)->create();
    }
}
