<?php

use App\Models\Client;
use App\Models\Git;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('repositories', function (Blueprint $table) {
            $table->unsignedBigInteger('id')
                ->primary()
                ->unique();

            $table->foreignIdFor(Client::class)
                ->nullable()
                ->cascadeOnDelete();


            // $table->foreignId('client_id')
            //     ->nullable()
            //     ->constrained('clients')
            //     ->cascadeOnDelete();

            $table->foreignIdFor(Git::class)
                ->constrained()
                ->cascadeOnDelete();

            $table->string('name');
            $table->string('slug')->unique();
            $table->string('repository_url');
            $table->longText('description')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('repositories');
    }
};
