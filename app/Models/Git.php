<?php

namespace App\Models;

use App\Models\GitGroup;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Git extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'api_token',

        'username',
        'user_id',
        'user_avatar_url',
    ];


    /*
    |--------------------------------------------------------------------------
    | RELATIONSHIPS
    |--------------------------------------------------------------------------
    */

    public function gitGroups(): HasMany
    {
        return $this->hasMany(GitGroup::class, 'git_id', 'id');
    }

    public function repositories(): HasManyThrough
    {
        return $this->hasManyThrough(Repository::class, GitGroup::class, 'git_id', 'group_id', 'id', 'group_id');
    }
}
