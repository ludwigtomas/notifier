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
        'client_id',
        'git_id',

        'name',
        'slug',
        'description',
        'git_id',
        'user_id',
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
