<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

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

    public function repositories()
    {
        return $this->hasMany(Repository::class, 'hosting_id');
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
}
