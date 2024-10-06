<?php

namespace App\Enums\RepositoryFile;

enum RepositoryFileTypeEnum: string
{
    case DATABASE = 'database';
    case ZIP = 'zip';
}
