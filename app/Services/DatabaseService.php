<?php

namespace App\Services;

use Carbon\Carbon;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Throwable;

class DatabaseService
{
    public static function createDatabaseBackup()
    {
        Log::channel('backup')->info('⚙️ STARTING NEW BACKUP ⚙️');

        $filename = 'backup-'.Carbon::now()->format('Y-m-d').'.sql';

        Storage::disk('local')->makeDirectory('backups');

        $path = storage_path('app/backups/'.$filename);

        Log::channel('backup')->info('➡️ creating backup file');

        $command = 'mysqldump --no-tablespaces --user='.env('DB_USERNAME').' --password='.env('DB_PASSWORD').' --host='.env('DB_HOST').' '.env('DB_DATABASE').' > '.$path;

        exec($command);

        $time_out = 0;

        while ($time_out < 5) {
            $time_out++;
            sleep(1);
        }

        return $path;
    }

    public static function sendDatabaseBackup($path): void
    {
        Log::channel('backup')->info('➡️ preparing file for sending');

        try {
            $client = new Client;

            $response = $client->request('POST', env('BACKUP_URL'), [
                'multipart' => [
                    [
                        'name' => 'backup_file',
                        'contents' => fopen($path, 'r'),
                        'filename' => basename($path),
                    ],
                    [
                        'name' => 'password',
                        'contents' => env('BACKUP_CODE'),
                    ],
                ],
            ]);

            if ($response->getStatusCode() === 200 || $response->getStatusCode() === 201) {
                Log::channel('backup')->info('➡️ file was sent');

                File::delete($path);

                Log::channel('backup')->info('➡️ file was deleted');
                Log::channel('backup')->info('✅ END OF BACKUP');
            }
        } catch (Throwable $th) {
            Log::channel('backup')->critical('➡️ an error occurred while uploading a file', ['th' => $th->getMessage()]);
            Log::channel('backup')->emergency('❌ END OF SESSION ❌');
        }
    }
}
