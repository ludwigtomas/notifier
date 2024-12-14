<?php

use App\Enums\RepositoryFile\RepositoryFileTypeEnum;
use App\Models\Repository;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('repository_files', function (Blueprint $table): void {
            $table->id();

            $table->foreignIdFor(Repository::class, 'repository_id')
                ->constrained('repositories', 'repository_id')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->string('file_type')->default(RepositoryFileTypeEnum::DATABASE_BACKUP);
            $table->string('name');
            $table->integer('size');
            $table->string('path');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('repository_files');
    }
};
