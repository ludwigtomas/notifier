<?php

namespace App\Models;

use App\Observers\HostingObserver;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

#[ObservedBy(HostingObserver::class)]
class Hosting extends Model
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'id',
        'name',
        'hosting_url',
    ];

    /*
    |--------------------------------------------------------------------------
    | RELATIONSHIPS
    |--------------------------------------------------------------------------
    */
    // pivot table
    // public function hosting_repositories(): HasMany
    // {
    //     return $this->hasMany(HostingRepository::class);
    // }

    // // through pivot table
    // // public function repositories(): HasManyThrough
    // // {
    // //     return $this->hasManyThrough(
    // //         Repository::class,
    // //         HostingRepository::class,
    // //         'hosting_id',
    // //         'repository_id',
    // //         'id',
    // //         'repository_id'
    // //     );
    // // }

    public function repositories(): BelongsToMany
    {
        return $this->belongsToMany(
            Repository::class,
            'hosting_repository',
            'hosting_id',
            'repository_id'
        )->withPivot('ip_address', 'ip_port', 'login_user', 'login_password', 'password_type');
    }

    /*
    |--------------------------------------------------------------------------
    | FUNCTIONS
    |--------------------------------------------------------------------------
    */

    public static function countDB(): int
    {
        return Cache::remember('hostings_count', 60, function () {
            return DB::table('hostings')->count();
        });
    }

    /*
    |--------------------------------------------------------------------------
    | SCOPE
    |--------------------------------------------------------------------------
    */
}
