<?php

use App\Models\Client;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('client_repository', function (Blueprint $table) {
            $table->foreignIdFor(Client::class)
                ->constrained()
                ->cascadeOnDelete()
                ->cascadeOnUpdate();

            $table->foreignId('repository_id')
                ->constrained('repositories', 'repository_id')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();

            $table->string('client_email')->nullable();

            $table->primary(['client_id', 'repository_id']);
            $table->unique(['client_id', 'repository_id']);

            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('client_repository');
    }
};
