<?php

namespace App\Models;

use App\Observers\HostingObserver;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

#[ObservedBy(HostingObserver::class)]
class Hosting extends Model
{
    use HasFactory;

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
    
    public function hosting_repositories(): HasMany
    {
        return $this->hasMany(HostingRepository::class);
    }

    public function repositories(): HasManyThrough
    {
        return $this->hasManyThrough(
            Repository::class,
            HostingRepository::class,
            'hosting_id',
            'repository_id',
            'id',
            'repository_id'
        );
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
