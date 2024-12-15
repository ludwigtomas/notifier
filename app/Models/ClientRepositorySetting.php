<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ClientRepositorySetting extends Model
{
    protected $table = 'client_repository_setting';

    protected $fillable = [
        'client_repository_id',
        'repository_setting_id',
        'value',
    ];

    /*
    |--------------------------------------------------------------------------
    | RELATIONSHIPS
    |--------------------------------------------------------------------------
    */

    public function clientRepository(): BelongsTo
    {
        return $this->belongsTo(ClientRepository::class);
    }

    public function repositorySetting(): BelongsTo
    {
        return $this->belongsTo(RepositorySetting::class);
    }
}
