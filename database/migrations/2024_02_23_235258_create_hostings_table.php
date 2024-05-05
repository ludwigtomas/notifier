<?php

use App\Models\Repository;
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
        Schema::create('hostings', function (Blueprint $table) {
            $table->id();

            $table->foreignIdFor('repository_id')
                ->constrained('repositories', 'repository_id')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();

            $table->string('name')->nullable();
            $table->string('hosting')->nullable();
            $table->string('ip_address')->nullable();
            $table->string('ip_port')->nullable();
            $table->string('login_user')->nullable();
            $table->string('login_password')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hostings');
    }
};
