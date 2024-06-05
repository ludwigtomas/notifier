<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class RepositoryDatabase extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'repository_id',
        'name',
        'size',
        'path',
        'created_at',
        'updated_at',
    ];

    /*
    |--------------------------------------------------------------------------
    | RELATIONSHIPS
    |--------------------------------------------------------------------------
    */
    
    public function repository(): BelongsTo
    {
        return $this->belongsTo(Repository::class);
    }
}
