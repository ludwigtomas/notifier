<?php

namespace App\Enums\RepositoryFile;

enum RepositoryFileTypeEnum: string
{
    case DATABASE_BACKUP = 'database_backup';
    case STORAGE_BACKUP = 'storage_backup';
    case CONTAINER_BACKUP = 'container_backup';
}
