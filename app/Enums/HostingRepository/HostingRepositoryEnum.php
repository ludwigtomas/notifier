<?php

namespace App\Enums\HostingRepository;

enum HostingRepositoryEnum: int
{
    case PASSWORD_TEXT = 0;
    case SSH_KEY = 1;
}
