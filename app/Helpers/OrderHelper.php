<?php

namespace App\Helpers;

class OrderHelper extends Helper
{
    public static function testingos()
    {
        return 'TEst';
    }

    public static function formatDate($date)
    {
        return date('d/m/Y', strtotime($date));
    }
}
