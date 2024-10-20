<?php

use App\Enums\HostingRepository\HostingRepositoryPasswordTypeEnum;
use App\Models\Hosting;
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
            $table->string('password_type')->default(HostingRepositoryPasswordTypeEnum::PASSWORD_TEXT);
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
