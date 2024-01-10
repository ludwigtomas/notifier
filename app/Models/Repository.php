<?php

namespace App\Models;

use App\Models\Git;
use App\Models\Client;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Repository extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';

    protected $fillable = [
        'id',    // api
        'git_id',           // relationship

        'name',             // api
        'slug',             // automatically generated
        'repository_url',   // api
        'description',      // manually added

        'updated_at',       // api
        'created_at',       // api
    ];

    public function git(): BelongsTo
    {
        return $this->belongsTo(Git::class);
    }

    public function client(): BelongsToMany
    {
        return $this->belongsToMany(Client::class);
    }
}
