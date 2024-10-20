<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Jobs\RepositoryDatabaseJob;
use App\Models\Repository;
use App\Models\RepositoryDatabase;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class RepositoryDatabaseController extends Controller
{
    public function store(Request $request, Repository $repository): JsonResponse
    {
        try {
            $validated = $request->validate([
                'password' => ['required', 'string'],
                'backup_file' => ['required', 'file'],
            ], [
                'password.required' => 'Password is required',
                'password.string' => 'Password must be a string',
                'backup_file.required' => 'Backup file is required',
                'backup_file.file' => 'Backup file must be a file',
            ]);

            $password = $validated['password'];

            $file = $validated['backup_file'];

            $this->checkPassword($password, $repository);

            $path = $repository->slug.'/databases/'.now()->format('Y').'/'.now()->format('m');

            $backup_name = now()->format('d').'-'.uniqid().'.sql';

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

    private function sendMail(Repository $repository, string $status, string $message): void
    {
        RepositoryDatabaseJob::dispatch($repository, $status, $message);
    }
}
