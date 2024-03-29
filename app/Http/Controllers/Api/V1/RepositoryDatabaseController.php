<?php

namespace App\Http\Controllers\Api\V1;

use Throwable;
use App\Models\Repository;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use App\Jobs\RepositoryDatabaseJob;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class RepositoryDatabaseController extends Controller
{


    public function store(Request $request, Repository $repository)
    {
        try {
            $this->checkPassword($request->password, $repository);

            $path = $repository->slug . '/databases/' . Carbon::now()->format('Y') . '/' . Carbon::now()->format('m');

            $backup_name = Carbon::now()->format('Y-m-d') . '.sql';

            $this->checkIfRepositoryFileExists($repository, $path, $backup_name);


            // check if DATABASE already exists
            if ($repository->database_backups()->where('name', $backup_name)->exists()) {

                $this->sendMail($repository, 'failed', 'Database backup "DATABASE" already exists');

                return response()->json([
                    'type' => 'failed',
                    'message' => 'Database backup "DATABASE" already exists',
                ], 409);
            }

            $file = $request->file('backup_file');

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
        } catch (Throwable $th) {

            $this->sendMail($repository, 'failed', $th->getMessage());

            return response()->json([
                'type' => 'failed',
                'message' => $th->getMessage(),
            ], 500);
        }
    }

    private function sendMail(Repository $repository, string $status, string $message): void
    {
        RepositoryDatabaseJob::dispatch($repository, $status, $message);
    }

    private function checkPassword($password, $repository): JsonResponse
    {
        $isReady = $password === $repository->database_verification_code;

        if (!$isReady) {
            $this->sendMail($repository, 'failed', 'Invalid password');

            return response()->json([
                'type' => 'failed',
                'message' => 'Invalid password',
            ], 401);
        }
    }

    private function checkIfRepositoryFileExists(Repository $repository, String $path, String $backup_name)
    {
        $all_files = Storage::allFiles($path);

        if (in_array($path . '/' . $backup_name, $all_files)) {

            $this->sendMail($repository, 'failed', 'Database backup "FILE" already exists');

            return response()->json([
                'type' => 'failed',
                'message' => 'Database backup "FILE" already exists',
            ], 409);
        }
    }
}
