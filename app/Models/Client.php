<?php

namespace App\Models;

use App\Observers\ClientObserver;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

#[ObservedBy(ClientObserver::class)]
class Client extends Model
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'ico',
    ];

    /*
    |--------------------------------------------------------------------------
    | RELATIONSHIPS
    |--------------------------------------------------------------------------
    */

    public function repositories(): BelongsToMany
    {
        return $this->belongsToMany(
            Repository::class,
            'client_repository',
            'client_id',
            'repository_id'
        )->withPivot('client_email');
    }
}
