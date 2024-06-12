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
            if (is_file($path . '/' . $file)) {
                $models[] = str_replace('.php', '', $file);
            }
        }

        return $models;
    }

    public static function modelsPath(array $models)
    {
        return array_map(function ($model) {
            return 'App\\Models\\' . $model;
        }, $models);
    }

    // $path = app_path('Models');

    // $models = [];

    // foreach (new DirectoryIterator($path) as $file) {

    //     if ($file->isDot() || $file->isDir()) {
    //         continue;
    //     }

    //     $filename = $file->getFilename();

    //     $model = pathinfo($filename, PATHINFO_FILENAME);

    //     $models[] = $model;
    // }
}
