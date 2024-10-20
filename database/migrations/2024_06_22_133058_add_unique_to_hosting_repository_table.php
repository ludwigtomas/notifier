<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('hosting_repository', function (Blueprint $table): void {
            $table->unique(['hosting_id', 'repository_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('hosting_repository', function (Blueprint $table): void {
            $table->dropUnique(['hosting_id', 'repository_id']);
        });
    }
};
