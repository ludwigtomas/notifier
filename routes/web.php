<?php

use App\Http\Controllers\ClientController;
use App\Http\Controllers\ClientRepositoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GitController;
use App\Http\Controllers\GitGroupController;
use App\Http\Controllers\GoogleAnalyticsController;
use App\Http\Controllers\HostingController;
use App\Http\Controllers\HostingRepositoryController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RepositoryController;
use App\Http\Controllers\RepositoryFileController;
use App\Http\Controllers\RepositorySettingController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\WorkerController;
use App\Models\Git;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', fn() => to_route('login'));

Route::middleware('auth:sanctum')->group(function (): void {
    Route::group(['prefix' => 'dashboard', 'as' => 'dashboard.'], function (): void {
        Route::get('/', [DashboardController::class, 'index'])->name('index');
    });

    // 🔺 GITS
    Route::group(['prefix' => '/dashboard/gits', 'as' => 'gits.'], function (): void {
        Route::get('/', [GitController::class, 'index'])->name('index');
        Route::get('/{git}/edit', [GitController::class, 'edit'])->name('edit');
        Route::post('/', [GitController::class, 'store'])->name('store');
        Route::put('/{git}', [GitController::class, 'update'])->name('update');
        Route::delete('/{git}', [GitController::class, 'destroy'])->name('destroy');
        Route::get('/{git:slug}/sync', [GitController::class, 'sync'])->name('sync');
    });

    // 🔺 GIT GROUPS
    Route::group(['prefix' => '/dashboard/git-groups', 'as' => 'git-groups.'], function (): void {
        Route::get('/', [GitGroupController::class, 'index'])->name('index');
        Route::post('/attach', [GitGroupController::class, 'attach'])->name('attach');
        Route::get('/{git_group}/edit', [GitGroupController::class, 'edit'])->name('edit');
        Route::put('/{git_group}', [GitGroupController::class, 'update'])->name('update');
        Route::post('/', [GitGroupController::class, 'store'])->name('store');
    });

    // 🔺 REPOSITORIES
    Route::group(['prefix' => '/dashboard/repositories', 'as' => 'repositories.'], function (): void {
        Route::get('/', [RepositoryController::class, 'index'])->name('index');
        Route::post('/', [RepositoryController::class, 'store'])->name('store');
        Route::get('/{repository}', [RepositoryController::class, 'show'])->name('show');
        Route::get('/{repository}/edit', [RepositoryController::class, 'edit'])->name('edit');
        Route::put('/{repository}', [RepositoryController::class, 'update'])->name('update');
        Route::delete('/{repository}/delete', [RepositoryController::class, 'destroy'])->name('destroy');
        Route::patch('/{repository}/restore', [RepositoryController::class, 'restore'])->name('restore');
        Route::delete('/{repository}/force-delete', [RepositoryController::class, 'forceDelete'])->name('force-delete');

        Route::get('/{repository}/last-commit', [RepositoryController::class, 'lastCommit'])->name('last-commit');
        Route::get('/{repository}/google-analytics', [RepositoryController::class, 'googleAnalytics'])->name('google-analytics');
        Route::get('/repositories/sync', [RepositoryController::class, 'syncWithGit'])->name('sync');

        Route::post('/{repository}/deploy', [RepositoryController::class, 'deploy'])->name('deploy');
    });

    // 🔺 REPOSITORY SETTINGS
    Route::group(['prefix' => '/dashboard/repositories/', 'as' => 'repository-settings.'], function (): void {
        Route::get('/{repository}/repository-settings/create', [RepositorySettingController::class, 'create'])->name('create');
        Route::post('/{repository}/repository-settings/store', [RepositorySettingController::class, 'store'])->name('store');

        Route::get('/{repository}/repository-settings/{repository_setting}/edit', [RepositorySettingController::class, 'edit'])->name('edit');
        Route::put('/{repository_setting}/update', [RepositorySettingController::class, 'update'])->name('update');
    });

    // 🔺 REPOSITORY FILE
    Route::group(['prefix' => '/dashboard/repository-files', 'as' => 'repository-files.'], function (): void {
        Route::get('/download', [RepositoryFileController::class, 'download'])->name('download');
        Route::delete('/delete', [RepositoryFileController::class, 'destroy'])->name('destroy');
        // Route::get('/create', [RepositoryFileController::class, 'create'])->name('create');
        // Route::post('/store', [RepositoryFileController::class, 'store'])->name('store');

        // Route::get('/{repository_file}/edit', [RepositoryFileController::class, 'edit'])->name('edit');
        // Route::put('/update', [RepositoryFileController::class, 'update'])->name('update');
    });

    // 🔺 DATABASES
    // Route::group(['prefix' => '/dashboard/databases', 'as' => 'databases.'], function (): void {
    //     Route::delete('/destroy', [RepositoryDatabaseController::class, 'destroy'])->name('destroy');
    //     Route::delete('/test/bulk-destroy', [RepositoryDatabaseController::class, 'bulkDestroy'])->name('bulk.destroy');

    //     Route::get('/download', [RepositoryDatabaseController::class, 'download'])->name('download');
    //     //* STORE ---> api.php
    // });

    // 🔺 CLIENTS
    Route::group(['prefix' => '/dashboard/clients', 'as' => 'clients.'], function (): void {
        Route::get('/', [ClientController::class, 'index'])->name('index');
        Route::get('/create', [ClientController::class, 'create'])->name('create');
        Route::post('/', [ClientController::class, 'store'])->name('store');
        Route::get('/{client}', [ClientController::class, 'show'])->name('show');
        Route::get('/{client:id}/edit', [ClientController::class, 'edit'])->name('edit');
        Route::put('/{client}', [ClientController::class, 'update'])->name('update');
        Route::delete('/{client}', [ClientController::class, 'destroy'])->name('destroy');
    });

    // 🔺 CLIENT REPOSITORY
    Route::group(['prefix' => '/client/{client}/repository/{repository}', 'as' => 'client-repository.'], function (): void {
        Route::delete('detach', [ClientRepositoryController::class, 'detach'])->name('detach');
        Route::post('attach', [ClientRepositoryController::class, 'attach'])->name('attach');
        Route::patch('update', [ClientRepositoryController::class, 'update'])->name('update');
    });

    // 🔺 HOSTINGS REPOSITORY
    Route::group(['prefix' => '/dashboard/hosting-repository', 'as' => 'hosting-repository.'], function (): void {
        Route::post('/hosting/{hosting}/repository/{repository}/attach', [HostingRepositoryController::class, 'attach'])->name('attach');
        Route::delete('/hosting/{hosting}/repository/{repository}/detach', [HostingRepositoryController::class, 'detach'])->name('detach');

        Route::post('/', [HostingRepositoryController::class, 'store'])->name('store');
        Route::put('/{hosting_repository}/update', [HostingRepositoryController::class, 'update'])->name('update');
        Route::delete('/{hosting_repository}', [HostingRepositoryController::class, 'destroy'])->name('destroy');
        Route::get('/{hosting_repository}/vps-connect', [HostingRepositoryController::class, 'vpsConnect'])->name('vps-connect');
    });

    // 🔺 HOSTINGS
    Route::group(['prefix' => '/dashboard/hostings', 'as' => 'hostings.'], function (): void {
        Route::get('/', [HostingController::class, 'index'])->name('index');
        Route::get('/create', [HostingController::class, 'create'])->name('create');
        Route::post('/', [HostingController::class, 'store'])->name('store');
        Route::get('/{hosting}/edit', [HostingController::class, 'edit'])->name('edit');
        Route::put('/{hosting}', [HostingController::class, 'update'])->name('update');
        Route::delete('/{hosting}', [HostingController::class, 'destroy'])->name('destroy');
    });

    // 🔺 WORKERS
    Route::group(['prefix' => '/dashboard/workers', 'as' => 'workers.'], function (): void {
        Route::get('/', [WorkerController::class, 'index'])->name('index');
        Route::get('/create', [WorkerController::class, 'create'])->name('create');
        Route::post('/', [WorkerController::class, 'store'])->name('store');
        Route::get('/{worker}/edit', [WorkerController::class, 'edit'])->name('edit');

        // EXTERNAL FORWARDING
        Route::get('/{worker}/ping', [WorkerController::class, 'ping'])->name('ping');
        Route::post('/{worker}/command', [WorkerController::class, 'command'])->name('command');
        Route::get('/{worker}/status', [WorkerController::class, 'status'])->name('status');
        Route::get('/{worker}/containers', [WorkerController::class, 'containers'])->name('containers');
        // END EXTERNAL FORWARDING

        Route::put('/{worker}', [WorkerController::class, 'update'])->name('update');
        Route::delete('/{worker}', [WorkerController::class, 'destroy'])->name('destroy');
    });

    // 🔺 NOTIFICATIONS
    Route::group(['prefix' => '/dashboard/notifications', 'as' => 'notifications.'], function (): void {
        Route::get('/', [NotificationController::class, 'index'])->name('index');
        Route::get('/{notification}', [NotificationController::class, 'show'])->name('show');
        Route::get('/{notification}/edit', [NotificationController::class, 'edit'])->name('edit');
        Route::put('/{notification}', [NotificationController::class, 'update'])->name('update');
        Route::patch('/{notification}/mark-as-read', [NotificationController::class, 'markAsRead'])->name('mark-as-read');
        Route::delete('/{notification}', [NotificationController::class, 'destroy'])->name('destroy');
    });
});

Route::middleware('auth')->group(function (): void {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// DELETE IN PRODUCTION
if (app()->isLocal()) {

    Route::get('/test', function () {
        $file = Storage::get('databases_1719494018.zip');

        return response()->streamDownload(function () use ($file): void {
            echo $file;
        }, 'databases_1719494018.zip');
    })->name('test');

    Route::get('/test/{repository}', [TestController::class, 'index'])->name('test.index');
    Route::get('/{repository}/google-analytics', [GoogleAnalyticsController::class, 'googleAnalytics'])->name('google-analytics');

    Route::get('/testingos', [TestController::class, 'test'])->name('testingos');
    // Route::Get('/testingos', function (): void {
    //     $repositories = Repository::query()
    //         ->with('repositorySettings')
    //         ->get();

    //     foreach ($repositories as $repository) {
    //         foreach ($repository->repositorySettings as $setting) {
    //             match ($setting->value->value) {
    //                 'daily' => dd('daily'),
    //                 'weekly' => dd('weekly'),
    //                 'monthly' => dd('monthly'),
    //             };
    //         }
    //     }

}
