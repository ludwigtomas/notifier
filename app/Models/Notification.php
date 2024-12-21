<?php

namespace App\Models;

use App\Observers\NotificationObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

#[ObservedBy(NotificationObserver::class)]
class Notification extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'type',
        'data',
        'read_at',
        'notifiable_id',
        'notifiable_type',
    ];

    protected $casts = [
        'id' => 'string',
        'data' => 'json',
        'read_at' => 'datetime',
    ];

    /*
    |--------------------------------------------------------------------------
    | RELATIONSHIPS
    |--------------------------------------------------------------------------
    */

    public function notifiable(): MorphTo
    {
        return $this->morphTo();
    }

    /*
    |--------------------------------------------------------------------------
    | FUNCTIONS
    |--------------------------------------------------------------------------
    */

    public function toggleReadAt(): void
    {
        $this->read_at = $this->read_at ? null : now();
        $this->save();
    }

    /*
    |--------------------------------------------------------------------------
    | SCOPE
    |--------------------------------------------------------------------------
    */
}
