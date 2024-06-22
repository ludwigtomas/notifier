<?php

use App\Models\Hosting;
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
        Schema::create('hosting_repository', function (Blueprint $table) {
            $table->id();

            $table->foreignIdFor(Hosting::class)
                ->constrained()
                ->cascadeOnDelete()
                ->cascadeOnUpdate();

            $table->unsignedBigInteger('repository_id')
                ->constrained('repositories', 'repository_id')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();

            $table->string('ip_address')->nullable();
            $table->integer('ip_port')->nullable();
            $table->string('login_user')->nullable();
            $table->string('login_password')->nullable();
            $table->integer('password_type')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hosting_repository');
    }
};
