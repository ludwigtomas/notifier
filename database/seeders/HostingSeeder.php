<?php

namespace Database\Seeders;

use App\Models\Hosting;
use Illuminate\Database\Seeder;

class HostingSeeder extends Seeder
{
    public function run(): void
    {
        Hosting::factory(100)->create();
    }
}
