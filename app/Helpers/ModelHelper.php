<?php

namespace App\Helpers;

class ModelHelper extends Helper
{
    public static function getModels()
    {
        $models = [];
        $path = app_path('Models');
        $files = scandir($path);
        foreach ($files as $file) {
            if (is_file($path.'/'.$file)) {
                $models[] = str_replace('.php', '', $file);
            }
        }

        return $models;
    }

    public static function modelsPath(array $models)
    {
        return array_map(fn ($model) => 'App\\Models\\'.$model, $models);
    }
}
