<?php

namespace App\Enums\RepositorySetting;

enum RepositorySettingKeyEnum: string
{
    case BACKUP_DATABASE = 'backup_database';
    case BACKUP_STORAGE = 'backup_storage';
}
