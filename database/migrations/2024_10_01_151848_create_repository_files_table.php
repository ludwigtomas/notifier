<?php

use App\Enums\RepositoryFileTypeEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('repository_files', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('repository_id')
                ->constrained('repositories', 'repository_id')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();

            $table->string('file_type')->default(RepositoryFileTypeEnum::DATABASE);
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
