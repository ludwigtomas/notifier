<?php

namespace App\Models;

use App\Models\Hosting;
use App\Models\Repository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Enums\HostingRepository\HostingRepositoryEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class HostingRepository extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'hosting_repository';

    protected $fillable = [
        'hosting_id',
        'repository_id',

        'ip_address',
        'ip_port',
        'login_user',
        'login_password',

        'password_type',
    ];

    protected $casts = [
        'password_type' => HostingRepositoryEnum::class,
    ];


    /*
    |--------------------------------------------------------------------------
    | RELATIONSHIPS
    |--------------------------------------------------------------------------
    */

    public function hosting(): BelongsTo
    {
        return $this->belongsTo(Hosting::class, 'hosting_id', 'id');
    }

    public function repository(): BelongsTo
    {
        return $this->belongsTo(Repository::class, 'repository_id', 'repository_id');
    }

    /*
    |--------------------------------------------------------------------------
    | SCOPE
    |--------------------------------------------------------------------------
    */

    /*
    |--------------------------------------------------------------------------
    | FUNCTIONS
    |--------------------------------------------------------------------------
    */
}
