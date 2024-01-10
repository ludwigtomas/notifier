<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClientRepository extends Model
{
    use HasFactory;

    protected $table = 'client_repository';

    public $timestamps = false;

    protected $fillable = [
        'client_id',
        'repository_id',
        'client_email',
    ];
}
