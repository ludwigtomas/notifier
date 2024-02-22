<?php

namespace App\Models;

use App\Models\Client;
use App\Models\Repository;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ClientRepository extends Model
{
    use HasFactory;

    protected $primaryKey = ['client_id', 'repository_id'];

    protected $table = 'client_repository';

    public $timestamps = false;

    protected $fillable = [
        'client_id',
        'repository_id',
        'client_email',
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
