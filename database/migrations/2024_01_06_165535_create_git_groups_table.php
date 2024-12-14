<?php

use App\Models\Git;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('git_groups', function (Blueprint $table): void {
            $table->unsignedBigInteger('group_id')
                ->unique()
                ->primary();

            $table->foreignIdFor(Git::class)
                ->constrained()
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->string('name')->nullable();
            $table->string('web_url')->nullable();

            $table->unsignedBigInteger('parent_id')
                ->nullable();

            $table->foreign('parent_id')
                ->references('group_id')
                ->on('git_groups')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('git_groups');
    }
};
