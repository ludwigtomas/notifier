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
        'is_active',
        'last_attempt_at',
        'is_successful',
    ];

    public $casts = [
        'key' => RepositorySettingKeyEnum::class,
        'value' => RepositorySettingValueEnum::class,
        'is_active' => 'boolean',
        'last_attempt_at' => 'datetime',
        'is_successful' => 'boolean',
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
