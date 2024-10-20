<?php

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
        Schema::create('repositories', function (Blueprint $table) {
            $table->unsignedBigInteger('repository_id')
                ->primary();

            $table->foreignId('group_id')
                ->constrained('git_groups', 'group_id')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();

            $table->integer('analytics_property_id')->nullable();

            $table->string('name');
            $table->string('slug')->unique();
            $table->string('avatar')->nullable();
            $table->string('website_url')->nullable();
            $table->string('repository_url')->nullable();
            $table->longText('description')->nullable();

            $table->uuid('database_verification_code')->unique();
            $table->dateTime('last_commit_at')->nullable();
            $table->dateTime('repository_created_at')->nullable();

            $table->softDeletes();

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
