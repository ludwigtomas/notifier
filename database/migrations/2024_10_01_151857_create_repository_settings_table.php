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
        Schema::create('repository_settings', function (Blueprint $table): void {
            $table->id();

            $table->foreignIdFor(Repository::class, 'repository_id')
                ->constrained('repositories', 'repository_id')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->string('key');
            $table->string('value');
            $table->boolean('is_active')->default(true);
            $table->timestamp('last_attempt_at')->nullable();
            $table->integer('attempts')->default(0);
            $table->boolean('was_successful')->default(false);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('repository_settings');
    }
};
