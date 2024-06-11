<?php

namespace App\Helpers;

class ModelHelper extends Helper
{
    public static function allTestingos()
    {
        return 'TEst';
        // $models = [];
        // $path = app_path('Models');
        // $files = scandir($path);
        // foreach ($files as $file) {
        //     if (is_file($path . '/' . $file)) {
        //         $models[] = str_replace('.php', '', $file);
        //     }
        // }
        // return $models;
    }
}
