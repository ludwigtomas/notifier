<?php

namespace App\Models;

use App\Models\Git;
use App\Models\Client;
use App\Models\RepositoryDatabase;
use App\Observers\RepositoryObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

#[ObservedBy(RepositoryObserver::class)]
class Repository extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'id',                          // automatically - repositories_id api
        'git_id',                      // automatically - relationship
        'analytics_property_id',       //! manually added

        'name',                        // automatically - api
        'slug',                        // automatically - generated
        'website_url',                 //! manually added
        'repository_url',              // automatically - api
        'description',                 //! manually added

        'database_verification_code',  // automatically - Observer
        'last_commit_at',              // automatically - api
        'repository_created_at',       // automatically - api

        'updated_at',                  // automatically - api
        'created_at',                  // automatically - api

        'subscription_to',

    ];

    public function hosting(): HasOne
    {
        return $this->hasOne(Hosting::class);
    }

    public function git(): BelongsTo
    {
        return $this->belongsTo(Git::class);
    }

    public function clients(): BelongsToMany
    {
        return $this->belongsToMany(Client::class)->withPivot('client_email');
    }

    public function database_backups(): HasMany
    {
        return $this->hasMany(RepositoryDatabase::class)->orderBy('created_at', 'desc');
    }
}
