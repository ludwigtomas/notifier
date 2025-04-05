<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        if (app()->isLocal()) {
            if (User::where('email', 'admin@admin.com')->exists()) {
                return;
            }

            User::create([
                'name' => 'Admin',
                'email' => 'admin@admin.com',
                'email_verified_at' => now(),
                'password' => bcrypt('secret123'),
            ]);
        }

        if (app()->isProduction()) {
            if (User::where('email', 'info@ludwigtomas.cz')->exists()) {
                return;
            }

            User::create([
                'name' => 'Ludwig Tomas',
                'email' => 'info@ludwigtomas.cz',
                'email_verified_at' => now(),
                'password' => '$2y$10$L3BkZ54/462S3LaTIhatauhdKsGBg5/7JivXfMY0mQo5qq94GfBMO',
            ]);
        }
    }
}
