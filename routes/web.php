<?php

use App\Models\Git;
use App\Services\GitlabService;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GitController;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\TestController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\HostingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\GitGroupController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\RepositoryController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\GoogleAnalyticsController;
use App\Http\Controllers\ClientRepositoryController;
use App\Http\Controllers\HostingRepositoryController;
use App\Http\Controllers\RepositoryDatabaseController;

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

route::get('/', function () {
    return to_route('login');
});

route::middleware('auth:sanctum')->group(function () {
    route::group(['prefix' => 'dashboard', 'as' => 'dashboard.'], function () {
        route::get('/', [DashboardController::class, 'index'])->name('index');
    });

    // 🔺 GITS
    route::group(['prefix' => '/dashboard/gits', 'as' => 'gits.'], function () {
        route::get('/', [GitController::class, 'index'])->name('index');
        route::get('/{git}/edit', [GitController::class, 'edit'])->name('edit');
        route::post('/', [GitController::class, 'store'])->name('store');
        route::put('/{git}', [GitController::class, 'update'])->name('update');
        route::delete('/{git}', [GitController::class, 'destroy'])->name('destroy');
    });

    // 🔺 GIT GROUPS
    route::group(['prefix' => '/dashboard/git-groups', 'as' => 'git-groups.'], function () {
        route::get('/', [GitGroupController::class, 'index'])->name('index');
        route::post('/attach', [GitGroupController::class, 'attach'])->name('attach');
        route::get('/{git_group}/edit', [GitGroupController::class, 'edit'])->name('edit');
        route::put('/{git_group}', [GitGroupController::class, 'update'])->name('update');
        route::post('/', [GitGroupController::class, 'store'])->name('store');
    });

    // 🔺 REPOSITORIES
    route::group(['prefix' => '/dashboard/repositories', 'as' => 'repositories.'], function () {
        route::get('/', [RepositoryController::class, 'index'])->name('index');
        route::post('/', [RepositoryController::class, 'store'])->name('store');
        route::get('/{repository}', [RepositoryController::class, 'show'])->name('show');
        route::get('/{repository}/edit', [RepositoryController::class, 'edit'])->name('edit');
        route::put('/{repository}', [RepositoryController::class, 'update'])->name('update');
        route::delete('/{repository}/delete', [RepositoryController::class, 'destroy'])->name('destroy');
        route::patch('/{repository}/restore', [RepositoryController::class, 'restore'])->name('restore');
        route::delete('/{repository}/force-delete', [RepositoryController::class, 'forceDelete'])->name('force-delete');

        route::get('/{repository}/last-commit', [RepositoryController::class, 'lastCommit'])->name('last-commit');
        route::get('/{repository}/google-analytics', [RepositoryController::class, 'googleAnalytics'])->name('google-analytics');
        route::get('/repositories/sync', [RepositoryController::class, 'syncWithGit'])->name('sync');
    });

    // 🔺 DATABASES
    route::group(['prefix' => '/dashboard/databases', 'as' => 'databases.'], function () {
        route::delete('/destroy', [RepositoryDatabaseController::class, 'destroy'])->name('destroy');
        route::delete('/test/bulk-destroy', [RepositoryDatabaseController::class, 'bulkDestroy'])->name('bulk.destroy');

        route::get('/download', [RepositoryDatabaseController::class, 'download'])->name('download');
        //* STORE ---> api.php
    });

    // 🔺 CLIENTS
    route::group(['prefix' => '/dashboard/clients', 'as' => 'clients.'], function () {
        route::get('/', [ClientController::class, 'index'])->name('index');
        route::get('/create', [ClientController::class, 'create'])->name('create');
        route::post('/', [ClientController::class, 'store'])->name('store');
        route::get('/{client}', [ClientController::class, 'show'])->name('show');
        route::get('/{client:id}/edit', [ClientController::class, 'edit'])->name('edit');
        route::put('/{client}', [ClientController::class, 'update'])->name('update');
        route::delete('/{client}', [ClientController::class, 'destroy'])->name('destroy');
    });

    // 🔺 CLIENT REPOSITORY
    route::group(['prefix' => '/client/{client}/repository/{repository}', 'as' => 'client-repository.'], function () {
        route::delete('detach', [ClientRepositoryController::class, 'detach'])->name('detach');
        route::post('attach', [ClientRepositoryController::class, 'attach'])->name('attach');
        route::patch('update', [ClientRepositoryController::class, 'update'])->name('update');
    });

    // 🔺 HOSTINGS REPOSITORY
    route::group(['prefix' => '/dashboard/hosting-repository', 'as' => 'hosting-repository.'], function () {
        route::post('/hosting/{hosting}/repository/{repository}/attach', [HostingRepositoryController::class, 'attach'])->name('attach');
        route::delete('/hosting/{hosting}/repository/{repository}/detach', [HostingRepositoryController::class, 'detach'])->name('detach');

        route::post('/', [HostingRepositoryController::class, 'store'])->name('store');
        route::put('/{hosting_repository}/update', [HostingRepositoryController::class, 'update'])->name('update');
        route::delete('/{hosting_repository}', [HostingRepositoryController::class, 'destroy'])->name('destroy');
        route::get('/{hosting_repository}/vps-connect', [HostingRepositoryController::class, 'vpsConnect'])->name('vps-connect');
    });

    // 🔺 HOSTINGS
    route::group(['prefix' => '/dashboard/hostings', 'as' => 'hostings.'], function () {
        route::get('/', [HostingController::class, 'index'])->name('index');
        route::get('/create', [HostingController::class, 'create'])->name('create');
        route::post('/', [HostingController::class, 'store'])->name('store');
        route::get('/{hosting}/edit', [HostingController::class, 'edit'])->name('edit');
        route::put('/{hosting}', [HostingController::class, 'update'])->name('update');
        route::delete('/{hosting}', [HostingController::class, 'destroy'])->name('destroy');
    });

    // 🔺 NOTIFICATIONS
    route::group(['prefix' => '/dashboard/notifications', 'as' => 'notifications.'], function () {
        route::get('/', [NotificationController::class, 'index'])->name('index');
        route::get('/{notification}', [NotificationController::class, 'show'])->name('show');
        route::get('/{notification}/edit', [NotificationController::class, 'edit'])->name('edit');
        route::put('/{notification}', [NotificationController::class, 'update'])->name('update');
        route::patch('/{notification}/mark-as-read', [NotificationController::class, 'markAsRead'])->name('mark-as-read');
        route::delete('/{notification}', [NotificationController::class, 'destroy'])->name('destroy');
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// DELETE IN PRODUCTION
if (app()->isLocal()) {

    route::get('/test', function () {
        $file = Storage::get('databases_1719494018.zip');

        return response()->streamDownload(function () use ($file) {
            echo $file;
        }, 'databases_1719494018.zip');
    })->name('test');

    route::Get('/testingos', function(){
        GitlabService::getUserID(Git::first());
    });

    Route::get('/test/{repository}', [TestController::class, 'index'])->name('test.index');
    route::get('/{repository}/google-analytics', [GoogleAnalyticsController::class, 'googleAnalytics'])->name('google-analytics');
}
