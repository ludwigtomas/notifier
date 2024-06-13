<?php

namespace App\Http\Controllers\Api\V1;

use Throwable;
use App\Models\Repository;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\RepositoryDatabase;
use App\Jobs\RepositoryDatabaseJob;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\ApiDatabaseRequest;
use Exception;

class RepositoryDatabaseController extends Controller
{
    public function store(ApiDatabaseRequest $request, Repository $repository): JsonResponse
    {
        try {
            $password = $request->password;

            $file = $request->file('backup_file');

            $this->checkPassword($password, $repository);

            $path = $repository->slug . '/databases/' . now()->format('Y') . '/' . now()->format('m');

            $backup_name = now()->format('d') . '-' . uniqid() . '.sql';

            // $this->checkIfBackupExists($path, $backup_name, $repository);

            // $this->checkIfDatabaseExists($backup_name, $repository);

            $database_backup = RepositoryDatabase::create([
                'repository_id' => $repository->repository_id,
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
        } catch (Exception $e) {
            $this->sendMail($repository, 'failed', 'Database backup failed to upload');

            return response()->json([
                'type' => 'error',
                'message' => 'Database backup failed to upload',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    private function checkPassword(string $password, Repository $repository)
    {
        if ($password !== $repository->database_verification_code) {
            $this->sendMail($repository, 'failed', 'Database backup -- PASSWORD -- is incorrect');

            abort(403, 'Database backup -- PASSWORD -- is incorrect');
        }
    }

    // private function checkIfBackupExists(string $path, string $backup_name, Repository $repository)
    // {
    //     dd($backup_name);

    //     $all_files = Storage::allFiles($path);

    //     if (in_array($path . '/' . $backup_name, $all_files)) {
    //         $this->sendMail($repository, 'failed', 'Database backup -- FILE -- (' . $backup_name . ') already exists');

    //         abort(403, 'Database backup -- FILE -- (' . $backup_name . ') already exists');
    //     }
    // }

    // private function checkIfDatabaseExists(string $backup_name, Repository $repository)
    // {
    //     if ($repository->database_backups()->whereName($backup_name)->exists()) {
    //         $this->sendMail($repository, 'failed', 'Database backup -- RECORD -- (' . $backup_name . ') already exists');

    //         abort(403, 'Database backup -- RECORD -- (' . $backup_name . ') already exists');
    //     }
    // }

    private function sendMail(Repository $repository, string $status, string $message): void
    {
        RepositoryDatabaseJob::dispatch($repository, $status, $message);
    }
}
