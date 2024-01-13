<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDatabaseRequest;
use App\Models\Repository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class RepositoryDatabaseController extends Controller
{
    public function store(Request $request, Repository $repository)
    {
        try {
            // $path = Storage::path($repository->slug . '/databases');

            // if (!Storage::exists($path)) {
            //     Storage::makeDirectory($path);
            // }

            $file = $request->file('file');

            if ($repository->database_backups()->where('name', $file->getClientOriginalName())->exists()) {
                return response()->json([
                    'message' => 'Database already exists',
                    'error' => 'Database already exists',
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
}
