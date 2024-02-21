<?php

namespace App\Models;

use App\Models\Git;
use App\Models\Client;
use App\Models\RepositoryDatabase;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Repository extends Model
{
    use HasFactory, SoftDeletes;

    protected $primaryKey = 'id';

    protected $fillable = [
        'id',                          // repositories_id api
        'git_id',                      // relationship
        'analytics_property_id',       //! manually added

        'name',                        // api
        'slug',                        // automatically generated
        'website_url',                 //! manually added
        'repository_url',              // api
        'description',                 //! manually added

        'database_verification_code',  // Observer
        'last_commit_at',              // api
        'repository_created_at',       // api

        'updated_at',                  // api
        'created_at',                  // api
    ];

    public function git(): BelongsTo
    {
        return $this->belongsTo(Git::class);
    }

    public function clients(): BelongsToMany
    {
        return $this->belongsToMany(Client::class);
    }

    public function database_backups(): HasMany
    {
        return $this->hasMany(RepositoryDatabase::class)->orderBy('created_at', 'desc');
    }
}
