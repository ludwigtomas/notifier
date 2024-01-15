<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDatabaseRequest;
use App\Models\Repository;
use App\Models\RepositoryDatabase;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class RepositoryDatabaseController extends Controller
{
    // private function checkPassword(Request $request, Repository $repository): bool
    // {
    //     return $request->password && $request->password === $repository->database_verification_code
    //         ? true
    //         : false;
    // }

    public function store(Request $request, Repository $repository)
    {
        try {
            if (!$request->password || $request->password !== $repository->database_verification_code) {
                return response()->json([
                    'type' => 'failed',
                    'message' => 'Invalid password',
                ], 401);
            }

            $file = $request->file('backup_file');

            if ($repository->database_backups()->where('name', $file->getClientOriginalName())->exists()) {
                return response()->json([
                    'type' => 'failed',
                    'message' => 'Database with this name already exists',
                ], 409);
            }

            $path = $repository->slug . '/databases/' . Carbon::now()->format('Y') . '/' . Carbon::now()->format('m');

            $database_backup = $repository->database_backups()->create([
                'name' => Carbon::now()->format('Y-m-d') . '.sql' ,
                'size' => $file->getSize() / 1000,
                'path' => $path,
            ]);

            Storage::putFileAs($path, $file, $database_backup->name);

            return response()->json([
                'type' => 'success',
                'message' => 'Database backup uploaded successfully',
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'type' => 'failed',
                'message' => $th->getMessage(),
            ], 500);
        }
    }

    public function destroy(RepositoryDatabase $repository_database): RedirectResponse
    {
        $repository_database->delete();

        Storage::delete($repository_database->repository->slug . '/databases/' . $repository_database->name . '.sql');

        return back();
    }
}
