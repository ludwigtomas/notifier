<?php

namespace App\Enums\HostingRepository;

enum HostingRepositoryPasswordTypeEnum: string
{
    case PASSWORD_TEXT = 'text';
    case SSH_KEY = 'ssh_key';
}
