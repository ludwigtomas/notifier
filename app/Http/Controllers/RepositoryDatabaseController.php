<?php

namespace App\Http\Controllers;

use ZipArchive;
use Illuminate\Http\Request;
use App\Models\RepositoryDatabase;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class RepositoryDatabaseController extends Controller
{
    public function destroy(RepositoryDatabase $repository_database)
    {
        $repository_database->delete();

        Storage::delete($repository_database->path.'/'.$repository_database->name);

        return back();
    }

    public function bulkDownload(Request $request)
    {
        $databases = RepositoryDatabase::whereIn('id', $request->databases)->get();

        $file_name = explode('/', $databases[0]->path)[0].'.zip';
        $file_path = storage_path('app/'.$file_name);
        $password = 'test';

        $zip = new ZipArchive();

        $zip_file = $zip->open($file_path, ZipArchive::CREATE | ZipArchive::OVERWRITE);

        if ($zip_file === true) {

            // $zip->setPassword($password); (:  for some reason this doesn't work  :)

            foreach ($databases as $file) {
                $zip->addFile(storage_path('app/'.$file->path.'/'.$file->name), $file->name);

                $zip->setEncryptionName($file->name, ZipArchive::EM_AES_256, $password);
            }

            $zip->close();

            // Nyní odešlete soubor ke stažení
            return response()->download($file_path)->deleteFileAfterSend(true);
        } else {
            return 'Failed to create the zip file.';
        }
    }

    public function bulkDestroy(Request $request)
    {
        $databases = RepositoryDatabase::whereIn('id', $request->databases)->get();

        foreach ($databases as $database) {
            File::delete(storage_path('app/'.$database->path.'/'.$database->name));

            $database->delete();
        }
    }
}
