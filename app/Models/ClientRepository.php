<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ClientRepository extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'client_repository';

    protected $fillable = [
        'client_id',
        'repository_id',
        'client_email_secondary',
        'client_email_tertiary',

        // 'is_repository_update_interested',
        // 'is_storage_backup_interested',
        // 'is_database_backup_interested',
        // 'is_analytics_interested'
    ];

    /*
    |--------------------------------------------------------------------------
    | RELATIONSHIPS
    |--------------------------------------------------------------------------
    */

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

    public function repository(): BelongsTo
    {
        return $this->belongsTo(Repository::class);
    }

    /*
    |--------------------------------------------------------------------------
    | FUNCTIONS
    |--------------------------------------------------------------------------
    */

    /*
    |--------------------------------------------------------------------------
    | SCOPE
    |--------------------------------------------------------------------------
    */
}
