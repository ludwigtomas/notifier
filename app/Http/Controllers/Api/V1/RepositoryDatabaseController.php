<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Jobs\RepositoryDatabaseJob;
use App\Models\Repository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;
use Throwable;

class RepositoryDatabaseController extends Controller
{
    public function store(Request $request, Repository $repository): JsonResponse
    {
        try {
            $this->checkPassword($request->password, $repository);

            $path = $repository->slug . '/databases/' . now()->format('Y') . '/' . now()->format('m');

            $backup_name = now()->format('Y-m-d') . '.sql';

            $this->checkIfBackupExists($path, $backup_name);

            $this->checkIfDatabaseExists($repository, $backup_name);

            $file = $request->file('backup_file');

            $database_backup = $repository->database_backups()->create([
                'name' => $backup_name,
                'size' => $file->getSize() / 1000,
                'path' => $path,
            ]);

            Storage::putFileAs($path, $file, $database_backup->name);

            $this->sendMail($repository, 'success', 200, 'Database backup uploaded successfully');

            return response()->json([
                'type' => 'success',
                'message' => 'Database backup uploaded successfully',
            ], 201);
        } catch (Throwable $th) {

            $this->sendMail($repository, 'failed', $th->getMessage());

            return response()->json([
                'type' => 'failed',
                'message' => $th->getMessage(),
            ], 500);
        }
    }

    private function checkPassword($password, $repository)
    {
        $password !== $repository->database_verification_code ? abort(403, 'Unauthorized') : true;
    }

    private function checkIfBackupExists(string $path, string $backup_name)
    {
        $all_files = Storage::allFiles($path);

        in_array($path . '/' . $backup_name, $all_files) ? abort(409, 'Database backup -- FILE -- (' . $backup_name . ') already exists in') : true;
    }

    private function checkIfDatabaseExists(Repository $repository, string $backup_name)
    {
        $repository->database_backups()->whereName($backup_name)->exists() ? abort(409, 'Database backup -- RECORD -- (' . $backup_name . ') already exists') : true;
    }

    private function sendMail(Repository $repository, string $status, string $message): void
    {
        RepositoryDatabaseJob::dispatch($repository, $status, $message);
    }
}
