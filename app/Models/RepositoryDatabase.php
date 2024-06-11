<?php

namespace App\Models;

use App\Observers\RepositoryDatabaseObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

#[ObservedBy(RepositoryDatabaseObserver::class)]
class RepositoryDatabase extends Model
{
    use HasFactory, Notifiable, SoftDeletes;

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

    // notifications
    public function notifications(): MorphMany
    {
        return $this->morphMany(Notification::class, 'notifiable');
    }
}
