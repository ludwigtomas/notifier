<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Enums\RepositorySetting\RepositorySettingKeyEnum;
use App\Enums\RepositorySetting\RepositorySettingValueEnum;

class RepositorySetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'repository_id',
        'key',
        'value',
        'date',
        'is_active',
    ];

    public $casts = [
        'key' => RepositorySettingKeyEnum::class,
        'value' => RepositorySettingValueEnum::class,
        'is_active' => 'boolean',
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
