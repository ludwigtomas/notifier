<?php

namespace App\Observers;

use App\Models\Repository;
use Illuminate\Support\Str;

class RepositoryObserver
{
    public function creating(Repository $repository): void
    {
        $repository->database_verification_code = Str::uuid();
    }
}
