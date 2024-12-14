<?php

namespace App\Http\Controllers;

use App\Http\Requests\DownloadRepositoryFileRequest;
use App\Http\Requests\StoreRepositoryFileRequest;
use App\Http\Requests\UpdateRepositoryFileRequest;
use App\Models\RepositoryFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use ZipArchive;

class RepositoryFileController extends Controller
{
    public function download(DownloadRepositoryFileRequest $request)
    {
        $databases = RepositoryFile::query()
            ->whereIn('id', $request->repository_file)
            ->with('repository')
            ->get();

        $repository_slug = $databases[0]->repository->slug;

        $zip = new ZipArchive;

        $zip_file_name = $repository_slug.'.zip';

        $zip_path = storage_path('app/public/'.$zip_file_name);

        if ($zip->open($zip_path, ZipArchive::CREATE) === true) {

            foreach ($databases as $database) {
                // get the file from local storage

                $file_path = Storage::disk('local')->path($database->path.'/'.$database->name);

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

    public function index(): void {}

    public function create(): void {}

    public function store(StoreRepositoryFileRequest $request): void {}

    public function show(RepositoryFile $repositoryFile): void {}

    public function edit(RepositoryFile $repositoryFile): void {}

    public function update(UpdateRepositoryFileRequest $request, RepositoryFile $repositoryFile): void {}

    public function destroy(Request $request): void
    {
        $repository_files = RepositoryFile::query()
            ->whereIn('id', $request->repository_files)
            ->get();

        foreach ($repository_files as $file) {
            Storage::disk('local')->delete($file->path.'/'.$file->name);

            $file->delete();
        }
    }
}
