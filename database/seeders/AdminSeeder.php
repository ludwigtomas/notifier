<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'password' => bcrypt('secret123'),
        ]);
        
        // if (env('APP_ENV') === 'local') {
        //     User::create([
        //         'name' => 'Admin',
        //         'email' => 'admin@admin.com',
        //         'password' => bcrypt('secret123'),
        //     ]);
        // }

        // if (env('APP_ENV') === 'production') {
        //     User::create([
        //         'name' => 'Admin',
        //         'email' => 'admin@admin.com',
        //         'password' => bcrypt('secret123'),
        //     ]);

        //     User::create([
        //         'name' => 'Ludwig Tomas',
        //         'is_admin' => 1,
        //         'email' => 'ludwigtom@seznam.cz',
        //         'email_verified_at' => now(),
        //         'password' => '$2y$10$L3BkZ54/462S3LaTIhatauhdKsGBg5/7JivXfMY0mQo5qq94GfBMO',
        //     ]);
        // }
    }
}
