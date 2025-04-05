<?php

namespace App\Http\Controllers;

use App\Http\Requests\DestroyRepositoryFileRequest;
use Exception;
use ZipArchive;
use Illuminate\Http\Request;
use App\Models\RepositoryFile;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\DownloadRepositoryFileRequest;
use Illuminate\Http\RedirectResponse;

class RepositoryFileController extends Controller
{
    public function download(DownloadRepositoryFileRequest $request)
    {
        $databases = RepositoryFile::query()
            ->whereIn('id', $request->repository_files)
            ->with('repository')
            ->get();


        if($databases->isEmpty()) {
            return back();
        }

        $repository_slug = $databases[0]->repository->slug;
        $zip_file_name = $repository_slug . '-' . now()->format('Y-m-d') . '.zip';
        $zip_path = storage_path('app/public/'.$zip_file_name);

        try {
            $zip = new ZipArchive;
            if ($zip->open($zip_path, ZipArchive::CREATE) !== true) {
                throw new \Exception("Cannot create zip archive");
            }

            $missing_files = [];
            foreach ($databases as $database) {
                $file_path = Storage::disk('local')->path($database->path.'/'.$database->name);

                if (file_exists($file_path)) {
                    $zip->addFile($file_path, basename($file_path));
                } else {
                    $missing_files[] = $database->name;
                }
            }

            $zip->close();

            if (!empty($missing_files)) {
                Log::warning("Some files were missing during download", [
                    'missing_files' => $missing_files,
                    'user_id' => Auth::id()
                ]);
            }

            return response()->download($zip_path)->deleteFileAfterSend(true);

        } catch (Exception $e) {
            Log::error("Error while downloading files", [
                'error' => $e->getMessage(),
                'user_id' => Auth::id()
            ]);

            return back();
        }
    }

    public function destroy(DestroyRepositoryFileRequest $request): RedirectResponse
    {
        $repository_files = RepositoryFile::query()
            ->whereIn('id', $request->repository_files)
            ->get();

        foreach ($repository_files as $file) {
            $path = $file->path.'/'.$file->name;
            if (Storage::disk('local')->exists($path)) {
                Storage::disk('local')->delete($path);
            }

            $file->delete();
        }

        return back();
    }
}
