<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

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

    public function markAsRead()
    {
        $this->read_at = now();
        $this->save();
    }

    /*
    |--------------------------------------------------------------------------
    | SCOPE
    |--------------------------------------------------------------------------
    */
}
