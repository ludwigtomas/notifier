<?php

namespace App\Models;

use App\Models\Git;
use App\Models\Client;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Repository extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';

    protected $fillable = [
        'id',                     // api
        'git_id',                 // relationship

        'name',                   // api
        'slug',                   // automatically generated
        'website_url',            // manually added
        'repository_url',         // api
        'description',            // manually added

        'last_activity_at',       // api
        'repository_created_at',  // api

        'updated_at',             // api
        'created_at',             // api
    ];

    public function git(): BelongsTo
    {
        return $this->belongsTo(Git::class);
    }

    public function clients(): BelongsToMany
    {
        return $this->belongsToMany(Client::class);
    }
}
