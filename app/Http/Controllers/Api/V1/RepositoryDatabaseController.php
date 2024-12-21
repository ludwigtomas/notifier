<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\RepositoryFile\RepositoryFileTypeEnum;
use App\Enums\RepositorySetting\RepositorySettingKeyEnum;
use App\Http\Controllers\Controller;
use App\Jobs\RepositoryDatabaseJob;
use App\Models\Repository;
use App\Models\RepositoryFile;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class RepositoryDatabaseController extends Controller
{
    public function store(Request $request, Repository $repository)
    {
        $backup_types = RepositorySettingKeyEnum::cases();

        $backup_types = array_map(fn($type) => $type->value, $backup_types);

        $validated = $request->validate([
            'backup_type' => ['required', 'string', 'in:' . implode(',', $backup_types)],
            'password' => ['required', 'string'],
            'backup_file' => ['required', 'file'],
        ], [
            'backup_type.required' => 'Backup type is required',
            'backup_type.string' => 'Backup type must be a string',
            'backup_type.in' => 'Backup type must be one of the following: ' . implode(', ', $backup_types),

            'password.required' => 'Password is required',
            'password.string' => 'Password must be a string',

            'backup_file.required' => 'Backup file is required',
            'backup_file.file' => 'Backup file must be a file',
        ]);

        try {
            $this->checkPassword($validated['password'], $repository);

            match ($validated['backup_type']) {
                RepositorySettingKeyEnum::BACKUP_DATABASE->value => $this->storeDatabaseFile(
                    $repository,
                    $validated['backup_file'],
                ),
                RepositorySettingKeyEnum::BACKUP_STORAGE->value => $this->storeStorageFile(
                    $repository,
                    $validated['backup_file'],
                ),
            };

            $this->sendMail($repository, 'success', 'Backup uploaded successfully' . ' - ' . $validated['backup_type']);

            return response()->json([
                'type' => 'success',
                'message' => 'Backup uploaded successfully' . ' - ' . $validated['backup_type'],
            ], 201);
        } catch (Exception $e) {
            // $this->sendMail($repository, 'failed', 'Backup failed to upload' . ' - ' . $validated['backup_type']);

            return response()->json([
                'type' => 'error',
                'message' => 'Backup failed to upload' . ' - ' . $validated['backup_type'],
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    private function storeStorageFile(
        Repository $repository,
        $file,
    ): void {
        /*
         * ludwig-tomas/storage/2021/09
         */
        $path = $repository->slug . '/storages/' . now()->format('Y') . '/' . now()->format('m');

        /*
         * 15-614f1b7b7b7b7.zip
         */
        $backup_name = now()->format('d') . '-' . uniqid() . '.' . $file->getClientOriginalExtension();

        $test = RepositoryFile::create([
            'repository_id' => $repository->repository_id,

            'file_type' => RepositoryFileTypeEnum::STORAGE_BACKUP,
            'name' => $backup_name,
            'size' => $file->getSize() / 1000,
            'path' => $path,
        ]);

        Storage::disk('local')->putFileAs($path, $file, $backup_name);
    }

    private function storeDatabaseFile(
        Repository $repository,
        $file,
    ): void {

        /*
         * ludwig-tomas/database/2021/09
         */
        $path = $repository->slug . '/databases/' . now()->format('Y') . '/' . now()->format('m');

        /*
         * 15-614f1b7b7b7b7.sql
         */
        $backup_name = now()->format('d') . '-' . uniqid() . '.' . $file->getClientOriginalExtension();

        RepositoryFile::create([
            'repository_id' => $repository->repository_id,

            'file_type' => RepositoryFileTypeEnum::DATABASE_BACKUP,
            'name' => $backup_name,
            'size' => $file->getSize() / 1000,
            'path' => $path,
        ]);

        Storage::disk('local')->putFileAs($path, $file, $backup_name);
    }

    private function checkPassword(string $password, Repository $repository): void
    {
        if ($password !== $repository->database_verification_code) {
            $this->sendMail($repository, 'failed', 'Database backup -- PASSWORD -- is incorrect');

            abort(403, 'Database backup -- PASSWORD -- is incorrect');
        }
    }

    // private function checkIfBackupExists(string $path, string $backup_name, Repository $repository): void
    // {
    //     if (Storage::exists($path . '/' . $backup_name)) {
    //         $this->sendMail($repository, 'failed', 'Database backup already exists');

    //         abort(409, 'Database backup already exists');
    //     }
    // }

    // private function checkIfDatabaseExists(string $backup_name, Repository $repository): void
    // {
    //     if ($repository->databases->contains('name', $backup_name)) {
    //         $this->sendMail($repository, 'failed', 'Database backup already exists');

    //         abort(409, 'Database backup already exists');
    //     }
    // }

    private function sendMail(Repository $repository, string $status, string $message): void
    {
        RepositoryDatabaseJob::dispatch($repository, $status, $message);
    }
}
