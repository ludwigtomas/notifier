<?php

namespace App\Models;

use App\Enums\RepositoryFileTypeEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RepositoryFile extends Model
{
    use HasFactory;

    protected $fillable = [
        'repository_id',

        'file_type',
        'name',
        'size',
        'path',
        'created_at',
        'updated_at',
    ];

    public $casts = [
        'file_type' => RepositoryFileTypeEnum::class,
    ];

    
}
