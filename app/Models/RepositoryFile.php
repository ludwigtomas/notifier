<?php

namespace App\Models;

use App\Enums\RepositoryFile\RepositoryFileTypeEnum;
use App\Observers\RepositoryFileObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Notifications\Notifiable;

#[ObservedBy(RepositoryFileObserver::class)]
class RepositoryFile extends Model
{
    use HasFactory;
    use Notifiable;

    public $casts = [
        'file_type' => RepositoryFileTypeEnum::class,
    ];

    protected $fillable = [
        'repository_id',

        'file_type',
        'name',
        'size',
        'path',
    ];

    public function repository(): BelongsTo
    {
        return $this->belongsTo(Repository::class, 'repository_id', 'repository_id');
    }
}
