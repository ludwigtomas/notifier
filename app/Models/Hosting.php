<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Hosting extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'name',
        'hosting_url',
    ];

    public function repositories()
    {
        return $this->hasMany(Repository::class, 'hosting_id');
    }
}
