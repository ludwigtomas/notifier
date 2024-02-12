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
        if (app()->isLocal()) {
            User::create([
                'name' => 'Admin',
                'email' => 'admin@admin.com',
                'email_verified_at' => now(),
                'password' => bcrypt('secret123'),
            ]);
        }

        if (app()->isProduction()) {
            User::create([
                'name' => 'Ludwig Tomas',
                'email' => 'ludwigtom@seznam.cz',
                'email_verified_at' => now(),
                'password' => '$2y$10$L3BkZ54/462S3LaTIhatauhdKsGBg5/7JivXfMY0mQo5qq94GfBMO',
            ]);

            User::create([
                'name' => 'Ludwig Tomas',
                'email' => 'tkasparek01@gmail.com',
                'email_verified_at' => now(),
                'password' => bcrypt('mayhem123321*'),
            ]);
        }
    }
}
