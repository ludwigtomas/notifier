<?php

namespace Database\Seeders;

use App\Models\Hosting;
use Illuminate\Database\Seeder;

class HostingSeeder extends Seeder
{
    public function run(): void
    {
        $hostings = [
            [
                'name' => 'Bohemia Cloud',
                'hosting_url' => 'https://bohemia-cloud.cz/',
            ],
            [
                'name' => 'Hukot',
                'hosting_url' => 'https://www.hukot.net/cs/',
            ],
            [
                'name' => 'Vercel',
                'hosting_url' => 'https://vercel.com/',
            ],
        ];

        Hosting::insert($hostings);
    }
}
