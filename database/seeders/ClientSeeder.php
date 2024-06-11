<?php

namespace Database\Seeders;

use App\Models\Client;
use Illuminate\Database\Seeder;

class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Client::insert([
            [
                'name' => 'Tomáš Ludwig',
                'email' => 'info@ludwigtomas.cz',
                'phone' => '+420 730 681 670',
                'created_at' => now(),
                'updated_at' => now(),
            ], [
                'name' => 'Tomáš Ludwig',
                'email' => 'info@ludwigtomas.cz',
                'phone' => '+420 730 681 670',
                'created_at' => now(),
                'updated_at' => now(),
            ], [
                'name' => 'Jiří Ludwig',
                'email' => 'drevoludwig@gmail.com',
                'phone' => '+420 777 092 381',
                'created_at' => now(),
                'updated_at' => now(),
            ], [
                'name' => 'Tomáš Huťa',
                'email' => 'info@ucetnivbezpeci.cz',
                'phone' => '+420 775 968 138',
                'created_at' => now(),
                'updated_at' => now(),
            ], [
                'name' => 'Miroslav Kočí',
                'email' => 'w',
                'phone' => '+420 775 968 901',
                'created_at' => now(),
                'updated_at' => now(),
            ], [
                'name' => 'Jan Brauner',
                'email' => 'zdravifitlift@gmail.com',
                'phone' => '+420 733 225 933',
                'created_at' => now(),
                'updated_at' => now(),
            ], [
                'name' => 'Jan Brauner',
                'email' => 'brauner.stavebni@seznam.cz',
                'phone' => '+420 732 876 148',
                'created_at' => now(),
                'updated_at' => now(),
            ], [
                'name' => 'RahomaDigital',
                'email' => 'info@rahomadigital.cz',
                'phone' => '+420 607 247 034',
                'created_at' => now(),
                'updated_at' => now(),
            ], [
                'name' => 'Mayhem',
                'email' => 'tkasparek01@gmail.com',
                'phone' => '+420 607 247 034',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
