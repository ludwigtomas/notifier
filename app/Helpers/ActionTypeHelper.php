<?php

namespace App\Helpers;

class ActionTypeHelper extends Helper
{
    public static function getActions()
    {
        return [
            'everything',
            'created',
            'updated',
            'deleted',
            'restored',
            'forceDeleted',
        ];
    }
}
