<?php

use App\Models\ClientRepository;
use App\Models\RepositorySetting;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('client_repository_setting', function (Blueprint $table): void {
            $table->id();

            $table->foreignIdFor(ClientRepository::class)
                ->constrained()
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->foreignIdFor(RepositorySetting::class)
                ->constrained()
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
        Schema::dropIfExists('client_repository_setting');
    }
};
