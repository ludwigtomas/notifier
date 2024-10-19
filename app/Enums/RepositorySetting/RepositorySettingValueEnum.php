<?php

namespace App\Enums\RepositorySetting;

enum RepositorySettingValueEnum: string
{
    case DAILY = 'daily';
    case WEEKLY = 'weekly';
    case MONTHLY = 'monthly';
}
