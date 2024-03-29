<?php

namespace App\Models;

use App\Models\Project;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Git extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',      //
        'slug',      // automatically generated
        'api_token',

        'username',
        'user_id',   // api
        'avatar_url' // api
    ];

    public function repositories(): HasMany
    {
        return $this->hasMany(Repository::class);
    }
}
