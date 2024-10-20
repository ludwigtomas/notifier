<?php

namespace App\Models;

use App\Enums\RepositorySetting\RepositorySettingKeyEnum;
use App\Enums\RepositorySetting\RepositorySettingValueEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RepositorySetting extends Model
{
    use HasFactory;

    public $casts = [
        'key' => RepositorySettingKeyEnum::class,
        'value' => RepositorySettingValueEnum::class,
        'is_active' => 'boolean',
        'last_attempt_at' => 'datetime',
        'attempts' => 'integer',
        'is_successful' => 'boolean',
    ];

    protected $fillable = [
        'repository_id',
        'key',
        'value',
        'is_active',
        'last_attempt_at',
        'attempts',
        'is_successful',
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
