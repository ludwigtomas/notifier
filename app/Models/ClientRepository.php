<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ClientRepository extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'client_repository';

    protected $fillable = [
        'client_id',
        'repository_id',
        'client_email',

        'is_update_interested',           // automatically - depends on commit to Git
        'is_monthly_overview_interested', // automatically - monthly overview
        'is_database_backup_interested',  // automatically - database backup (daily)
    ];

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

    public function repository(): BelongsTo
    {
        return $this->belongsTo(Repository::class);
    }
}
