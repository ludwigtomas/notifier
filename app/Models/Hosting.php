<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Hosting extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'repository_id',

        'name',
        'hosting',
        'ip_address',
        'ip_port',
        'login_user',
        'login_password',
    ];

    public function repository(): BelongsTo
    {
        return $this->belongsTo(Repository::class);
    }
}
