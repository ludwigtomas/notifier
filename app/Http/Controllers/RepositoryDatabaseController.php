<?php

namespace App\Http\Controllers;

use ZipArchive;
use Carbon\Carbon;
use App\Models\Repository;
use Illuminate\Http\Request;
use App\Models\RepositoryDatabase;
use App\Jobs\RepositoryDatabaseJob;
use Illuminate\Support\Facades\File;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\StoreDatabaseRequest;

class RepositoryDatabaseController extends Controller
{
    private function sendMail(Repository $repository, string $status, string $message): void
    {
        RepositoryDatabaseJob::dispatch($repository, $status, $message);
    }

    public function store(Request $request, Repository $repository)
    {
        try {
            if (!$request->password || $request->password !== $repository->database_verification_code) {

                $this->sendMail($repository, 'failed', 'Invalid password');

                return response()->json([
                    'type' => 'failed',
                    'message' => 'Invalid password',
                ], 401);
            }

            $file = $request->file('backup_file');

            $path = $repository->slug . '/databases/' . Carbon::now()->format('Y') . '/' . Carbon::now()->format('m');

            $all_files = Storage::allFiles($path);

            $backup_name = Carbon::now()->format('Y-m-d') . '.sql';

            if (in_array($path . '/' . $backup_name, $all_files)) {

                $this->sendMail($repository, 'failed', 'Database backup "FILE" already exists');

                return response()->json([
                    'type' => 'failed',
                    'message' => 'Database backup "FILE" already exists',
                ], 409);
            }

            if ($repository->database_backups()->where('name', $backup_name)->exists()) {

                $this->sendMail($repository, 'failed', 'Database backup "DATABASE" already exists');

                return response()->json([
                    'type' => 'failed',
                    'message' => 'Database backup "DATABASE" already exists',
                ], 409);
            }

            $database_backup = $repository->database_backups()->create([
                'name' => $backup_name,
                'size' => $file->getSize() / 1000,
                'path' => $path,
            ]);

            Storage::putFileAs($path, $file, $database_backup->name);

            $this->sendMail($repository, 'success', 'Database backup uploaded successfully');

            return response()->json([
                'type' => 'success',
                'message' => 'Database backup uploaded successfully',
            ], 201);
        } catch (\Throwable $th) {

            $this->sendMail($repository, 'failed', $th->getMessage());

            return response()->json([
                'type' => 'failed',
                'message' => $th->getMessage(),
            ], 500);
        }
    }

    public function destroy(RepositoryDatabase $repository_database)
    {
        $repository_database->delete();

        Storage::delete($repository_database->path . '/' . $repository_database->name);

        return back();
    }

    public function bulkDownload(Request $request)
    {
        $databases = RepositoryDatabase::whereIn('id', $request->databases)->get();

        $file_name = explode('/', $databases[0]->path)[0] . '.zip';
        $file_path = storage_path('app/' . $file_name);
        $password = 'test';

        $zip = new ZipArchive();

        $zip_file = $zip->open($file_path, ZipArchive::CREATE | ZipArchive::OVERWRITE);

        if ($zip_file === TRUE) {

            // $zip->setPassword($password); (:  for some reason this doesn't work  :)

            foreach ($databases as $file) {
                $zip->addFile(storage_path('app/' . $file->path . '/' . $file->name), $file->name);

                $zip->setEncryptionName($file->name, ZipArchive::EM_AES_256, $password);
            }

            $zip->close();

            // Nyní odešlete soubor ke stažení
            return response()->download($file_path)->deleteFileAfterSend(true);
        } else {
            return "Failed to create the zip file.";
        }
    }

    public function bulkDestroy(Request $request)
    {
        $databases = RepositoryDatabase::whereIn('id', $request->databases)->get();

        foreach ($databases as $database) {
            File::delete(storage_path('app/' . $database->path . '/' . $database->name));

            $database->delete();
        }
    }
}
