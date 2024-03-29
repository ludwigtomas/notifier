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
        Client::create([
            'name' => 'Tomáš Ludwig',
            'email' => 'info@ludwigtomas.cz',
            'phone' => '+420 730 681 670',
        ]);

        Client::create([
            'name' => 'Jiří Ludwig',
            'email' => 'drevoludwig@gmail.com',
            'phone' => '+420 777 092 381',
        ]);

        Client::create([
            'name' => 'Tomáš Huťa',
            'email' => 'info@ucetnivbezpeci.cz',
            'phone' => '+420 775 968 138',
        ]);

        Client::create([
            'name' => 'Miroslav Kočí',
            'phone' => '+420 775 968 901',
        ]);

        Client::create([
            'name' => 'Jan Brauner',
            'email' => 'zdravifitlift@gmail.com',
            'phone' => '+420 733 225 933',
        ]);

        Client::create([
            'name' => 'Jan Brauner',
            'email' => 'brauner.stavebni@seznam.cz',
            'phone' => '+420 732 876 148',
        ]);

        Client::create([
            'name' => 'RahomaDigital',
            'email' => 'info@rahomadigital.cz',
            'phone' => '+420 607 247 034',
        ]);

        Client::create([
            'name' => 'Mayhem',
            'email' => 'tkasparek01@gmail.com',
            'phone' => '+420 607 247 034',
        ]);
    }
}
