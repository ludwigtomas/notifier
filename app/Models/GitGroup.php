<?php

namespace App\Models;

use App\Models\Git;
use App\Models\Repository;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class GitGroup extends Model
{
    use HasFactory;

    protected $table = 'git_groups';

    protected $primaryKey = 'group_id';

    protected $fillable = [
        'group_id',

        'git_id',
        'name',
        'url',
    ];

    protected $casts = [
        'group_id' => 'integer',
        'git_id' => 'integer',
    ];

    public function git(): BelongsTo
    {
        return $this->belongsTo(Git::class);
    }

    public function repositories(): HasMany
    {
        return $this->hasMany(Repository::class);
    }
}
