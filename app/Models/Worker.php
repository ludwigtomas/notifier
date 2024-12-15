<?php

namespace App\Models;

use App\Observers\WorkerObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

#[ObservedBy(WorkerObserver::class)]
class Worker extends Model
{
    use HasFactory;
    use Notifiable;

    protected $fillable = [
        'id',
        'name',
        'url',
        'token',
        'hosting_id',
    ];

    /*
    |--------------------------------------------------------------------------
    | FUNCTIONS
    |--------------------------------------------------------------------------
    */
    public static function countDB(): int
    {
        return Cache::remember('workers_count', 60, fn() => DB::table('workers')->count());
    }

    public function setTokenAttribute($value): void
    {
        $this->attributes['token'] = encrypt($value);
    }

    public function getTokenAttribute($value): string
    {
        return decrypt($value);
    }

    /*
    |--------------------------------------------------------------------------
    | RELATIONSHIPS
    |--------------------------------------------------------------------------
    */

    public function hosting(): BelongsTo
    {
        return $this->belongsTo(Hosting::class);
    }
}
