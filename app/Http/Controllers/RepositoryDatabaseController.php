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
        // Získání souboru z požadavku
        $backupFile = $request->file('backup_file');

        // Kontrola, zda byl soubor úspěšně nahrán

        try {
            if ($backupFile->isValid()) {

                $repository->database_backups()->create([
                    'name' => $backupFile->getClientOriginalName(),
                    'size' => $backupFile->getSize() / 1000,
                ]);

                // Přesunutí souboru do umístění podle vašich potřeb
                $path = $backupFile->storeAs('backup', 'backup-2024-12-01');

                // Zde můžete dále zpracovávat cestu nebo provádět další akce
                return response()->json(['message' => 'Soubor byl úspěšně nahrán.']);
            } else {
                // Soubor nebyl nahrán úspěšně
                return response()->json(['error' => 'Chyba při nahrávání souboru.'], 400);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Database upload failed',
                'error' => $th->getMessage(),
            ], 500);
        }




        // try {
        //     $file = $request->file('file');

        //     if ($repository->database_backups()->where('name', $file->getClientOriginalName())->exists()) {
        //         return response()->json([
        //             'message' => 'Database already exists',
        //         ], 409);
        //     }

        //     $repository->database_backups()->create([
        //         'name' => $file->getClientOriginalName(),
        //         'size' => $file->getSize() / 1000,
        //     ]);

        //     $file->storeAs($repository->slug . '/databases', $file->getClientOriginalName());

        //     return response()->json([
        //         'message' => 'Database uploaded successfully'
        //     ], 201);
        // } catch (\Throwable $th) {
        //     return response()->json([
        //         'message' => 'Database upload failed',
        //         'error' => $th->getMessage(),
        //     ], 500);
        // }
    }

    public function destroy(RepositoryDatabase $repository_database): RedirectResponse
    {
        $repository_database->delete();

        Storage::delete($repository_database->repository->slug . '/databases/' . $repository_database->name . '.sql');

        return back();
    }
}
