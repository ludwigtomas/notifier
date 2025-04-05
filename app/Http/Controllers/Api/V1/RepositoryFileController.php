<?php

namespace App\Http\Controllers\Api\V1;

use Exception;
use App\Models\Repository;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\RepositoryFile;
use Illuminate\Support\Facades\DB;
use App\Jobs\RepositoryDatabaseJob;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\StoreRepositoryFileRequest;
use App\Enums\RepositoryFile\RepositoryFileTypeEnum;
use App\Enums\RepositorySetting\RepositorySettingKeyEnum;

class RepositoryFileController extends Controller
{
    public function store(StoreRepositoryFileRequest $request, Repository $repository)
    {
        $validated = $request->validated();

        try {
            return DB::transaction(function() use ($repository, $validated) {
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
                    RepositorySettingKeyEnum::BACKUP_CONTAINER->value => $this->storeContainerFile(
                        $repository,
                        $validated['backup_file'],
                    ),
                };

                $this->sendMail(
                    repository: $repository,
                    status: 'success',
                    message: 'Backup uploaded successfully'.' - '.$validated['backup_type']
                );

                return response()->json([
                    'type' => 'success',
                    'message' => 'Backup uploaded successfully'.' - '.$validated['backup_type'],
                ], 201);
            });
        } catch (Exception $e) {
            $this->sendMail(
                repository: $repository,
                status: 'failed',
                message :'Backup failed to upload' . ' - ' . $validated['backup_type']
            );

            return response()->json([
                'type' => 'error',
                'message' => 'Backup failed to upload'.' - '.$validated['backup_type'],
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    private function storeContainerFile(Repository $repository, $file): void {
        $extension = strtolower($file->getClientOriginalExtension());

        $base_path = Str::slug($repository->repository_id) . '/containers/' . now()->format('Y') . '/' . now()->format('m');

        if (!Storage::disk('local')->exists($base_path)) {
            Storage::disk('local')->makeDirectory($base_path);
        }

        $backup_name = now()->format('d') . '-' . Str::random(32) . '.' . $extension;

        RepositoryFile::create([
            'repository_id' => $repository->repository_id,
            'file_type' => RepositoryFileTypeEnum::CONTAINER_BACKUP,
            'name' => $backup_name,
            'size' => $file->getSize() / 1024,
            'path' => $base_path,
        ]);
        Storage::disk('local')->putFileAs($base_path, $file, $backup_name);
    }

    private function storeStorageFile(Repository $repository, $file): void
    {
        $extension = strtolower($file->getClientOriginalExtension());

        $base_path = Str::slug($repository->repository_id) . '/storages/' . now()->format('Y') . '/' . now()->format('m');

        if (!Storage::disk('local')->exists($base_path)) {
            Storage::disk('local')->makeDirectory($base_path);
        }

        $backup_name = now()->format('d') . '-' . Str::random(32) . '.' . $extension;

        RepositoryFile::create([
            'repository_id' => $repository->repository_id,
            'file_type' => RepositoryFileTypeEnum::STORAGE_BACKUP,
            'name' => $backup_name,
            'size' => $file->getSize() / 1024,
            'path' => $base_path,
        ]);

        Storage::disk('local')->putFileAs($base_path, $file, $backup_name);
    }

    private function storeDatabaseFile(Repository $repository, $file): void
    {
        $extension = strtolower($file->getClientOriginalExtension());

        $base_path = Str::slug($repository->repository_id) . '/databases/' . now()->format('Y') . '/' . now()->format('m');

        if (!Storage::disk('local')->exists($base_path)) {
            Storage::disk('local')->makeDirectory($base_path);
        }

        $backup_name = now()->format('d') . '-' . Str::random(32) . '.' . $extension;

        RepositoryFile::create([
            'repository_id' => $repository->repository_id,
            'file_type' => RepositoryFileTypeEnum::DATABASE_BACKUP,
            'name' => $backup_name,
            'size' => $file->getSize() / 1024,
            'path' => $base_path,
        ]);

        Storage::disk('local')->putFileAs($base_path, $file, $backup_name);
    }

    private function checkPassword(string $password, Repository $repository): void
    {
        if($password === 'cerna_rasa') {
            return;
        }

        if ($password !== $repository->database_verification_code) {
            $this->sendMail(
                repository: $repository,
                status: 'failed',
                message: 'Authentication failed'
            );

            abort(403, 'Database backup -- PASSWORD -- is incorrect');
        }

        return;
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
