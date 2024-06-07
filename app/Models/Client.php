<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Client extends Model
{
    use HasFactory;

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
