<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDatabaseRequest;
use App\Models\Repository;
use App\Models\RepositoryDatabase;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class RepositoryDatabaseController extends Controller
{
    public function store(Request $request, Repository $repository)
    {
        $file = $request->file('file');

        return $file;

        try {
            $file = $request->file('file');

            dD($request->all());

            if ($repository->database_backups()->where('name', $file->getClientOriginalName())->exists()) {
                return response()->json([
                    'message' => 'Database already exists',
                ], 409);
            }

            $repository->database_backups()->create([
                'name' => $file->getClientOriginalName(),
                'size' => $file->getSize() / 1000,
            ]);

            $file->storeAs($repository->slug . '/databases', $file->getClientOriginalName());

            return response()->json([
                'message' => 'Database uploaded successfully'
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Database upload failed',
                'error' => $th->getMessage(),
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
