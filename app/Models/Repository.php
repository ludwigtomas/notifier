<?php

namespace App\Models;

use App\Models\Notification;
use App\Observers\RepositoryObserver;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;

#[ObservedBy(RepositoryObserver::class)]
class Repository extends Model
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $table = 'repositories';

    protected $primaryKey = 'repository_id';

    protected $fillable = [
        'repository_id',               // automatically - repositories_id api

        'group_id',                    // automatically - relationship
        'analytics_property_id',       //! manually added

        'name',                        // automatically - api
        'slug',                        // automatically - generated
        'avatar',                      // automatically - api
        'website_url',                 //! manually added
        'repository_url',              // automatically - api
        'description',                 //! manually added

        'database_verification_code',  // automatically - Observer
        'last_commit_at',              // automatically - api
        'repository_created_at',       // automatically - api

        'updated_at',                  // automatically - api
        'created_at',                  // automatically - api

        'subscription_to',             //! manually added
    ];

    /*
    |--------------------------------------------------------------------------
    | RELATIONSHIPS
    |--------------------------------------------------------------------------
    */

    public function git_group(): BelongsTo
    {
        return $this->belongsTo(GitGroup::class, 'group_id', 'group_id');
    }

    public function clients(): BelongsToMany
    {
        return $this->belongsToMany(Client::class, 'client_repository', 'repository_id', 'client_id')
            ->withPivot('client_email');
    }

    public function database_backups(): HasMany
    {
        return $this->hasMany(RepositoryDatabase::class, 'repository_id', 'repository_id')
            ->orderBy('created_at', 'desc');
    }

    public function hosting_repository(): HasOne
    {
        return $this->hasOne(HostingRepository::class, 'repository_id', 'repository_id');
    }

    public function hosting(): HasOneThrough
    {
        return $this->hasOneThrough(
            Hosting::class,
            HostingRepository::class,
            'repository_id',
            'id',
            'repository_id',
            'hosting_id'
        );
    }

    public function notifications(): MorphMany
    {
        return $this->morphMany(Notification::class, 'notifiable')
            ->orderBy('created_at', 'desc');;
    }

    /*
    |--------------------------------------------------------------------------
    | FUNCTIONS
    |--------------------------------------------------------------------------
    */
}
