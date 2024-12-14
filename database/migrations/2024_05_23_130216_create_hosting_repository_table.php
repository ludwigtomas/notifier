<?php

use App\Enums\HostingRepository\HostingRepositoryPasswordTypeEnum;
use App\Models\Hosting;
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
        Schema::create('hosting_repository', function (Blueprint $table): void {
            $table->id();

            $table->foreignIdFor(Hosting::class)
                ->constrained()
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->foreignIdFor(Repository::class, 'repository_id')
                ->constrained('repositories', 'repository_id')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->string('ip_address')->nullable();
            $table->integer('ip_port')->nullable();
            $table->string('login_user')->nullable();
            $table->string('login_password')->nullable();
            $table->string('password_type')->default(HostingRepositoryPasswordTypeEnum::PASSWORD_TEXT);

            $table->unique(['hosting_id', 'repository_id']);
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
