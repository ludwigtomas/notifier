<?php

namespace Database\Seeders;

use App\Models\Hosting;
use Illuminate\Database\Seeder;

class HostingSeeder extends Seeder
{
    public function run(): void
    {
        Hosting::create([
            'name' => 'Bohemia Cloud',
            'hosting_url' => 'https://bohemia-cloud.cz/',
        ]);
    }
}
