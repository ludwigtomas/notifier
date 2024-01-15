<?php

namespace App\Models;

use App\Models\Repository;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class RepositoryDatabase extends Model
{
    use HasFactory;

    protected $fillable = [
        'repository_id',
        'name',
        'size',
        'path',
        'created_at',
        'updated_at',
    ];

    // protected function path(): Attribute
    // {
    //     return Attribute::make(
    //         get: fn (string $value) => ucfirst($value),
    //         set: fn (string $value) => 'Awd',
    //     );
    // }

    public function repository(): BelongsTo
    {
        return $this->belongsTo(Repository::class);
    }
}
