<?php

namespace App\Models;

use App\Enums\HostingRepository\HostingRepositoryPasswordTypeEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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
        'password_type' => HostingRepositoryPasswordTypeEnum::class,
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
