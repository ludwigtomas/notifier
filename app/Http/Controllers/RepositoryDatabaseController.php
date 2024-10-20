<?php

namespace App\Http\Controllers;

use App\Http\Requests\DeleteDatabaseRequest;
use App\Http\Requests\DownloadDatabaseRequest;
use App\Models\RepositoryDatabase;
use Illuminate\Support\Facades\Storage;
use ZipArchive;

class RepositoryDatabaseController extends Controller
{
    public function download(DownloadDatabaseRequest $request)
    {
        $databases = RepositoryDatabase::query()
            ->whereIn('id', $request->databases)
            ->with('repository')
            ->get();

        $repository_slug = $databases[0]->repository->slug;

        $zip = new ZipArchive;

        $zip_file_name = $repository_slug.'.zip';

        $zip_path = storage_path('app/public/'.$zip_file_name);

        if ($zip->open($zip_path, ZipArchive::CREATE) === true) {
            foreach ($databases as $database) {
                $file_path = storage_path('app/public/'.$database->path.'/'.$database->name);
                if (file_exists($file_path)) {
                    $zip->addFile($file_path, basename($file_path));
                } else {
                    return back();
                }
            }
            $zip->close();
        } else {
            return response()->json(['error' => 'Cannot create zip file'], 500);
        }

        return response()->download($zip_path)->deleteFileAfterSend(true);
    }

    public function destroy(DeleteDatabaseRequest $request)
    {
        $databases = RepositoryDatabase::query()
            ->wherein('id', $request->databases)
            ->get();

        foreach ($databases as $database) {
            $path = $database->path.'/'.$database->name;

            Storage::delete($path);

            $database->forceDelete();
        }

        return back();
    }
}
