<?php

use App\Models\Client;
use App\Models\Repository;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('client_repository', function (Blueprint $table): void {
            $table->id();
            $table->foreignIdFor(Client::class)
                ->constrained()
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->foreignIdFor(Repository::class, 'repository_id')
                ->constrained('repositories', 'repository_id')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->string('client_email_secondary')->nullable();
            $table->string('client_email_tertiary')->nullable();

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
