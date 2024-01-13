<?php

namespace App\Models;

use App\Models\Repository;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class RepositoryDatabase extends Model
{
    use HasFactory;

    protected $fillable = [
        'repository_id',
        'name',
        'size',
        'created_at',
        'updated_at',
    ];

    public function repository(): BelongsTo
    {
        return $this->belongsTo(Repository::class);
    }

}
