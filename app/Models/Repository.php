<?php

namespace App\Models;

use App\Models\Git;
use App\Models\Client;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Repository extends Model
{
    use HasFactory;

    protected $fillable = [
        'repository_id',    // api
        'client_id',        // relationship
        'git_id',           // relationship

        'name',             // api
        'slug',             // automatically generated
        'description',      // manually added
    ];

    public function git(): BelongsTo
    {
        return $this->belongsTo(Git::class);
    }

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }
}
