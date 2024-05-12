<?php

use App\Http\Controllers\ClientController;
use App\Http\Controllers\ClientRepositoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GitController;
use App\Http\Controllers\GitGroupController;
use App\Http\Controllers\HostingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RepositoryController;
use App\Http\Controllers\RepositoryDatabaseController;
use App\Http\Controllers\TestController;
use Illuminate\Support\Facades\Route;

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
        route::get('/{git}', [GitController::class, 'show'])->name('show');
        route::get('/{git}/edit', [GitController::class, 'edit'])->name('edit');
        route::post('/', [GitController::class, 'store'])->name('store');
        route::put('/{git}', [GitController::class, 'update'])->name('update');
        route::delete('/{git}', [GitController::class, 'destroy'])->name('destroy');
    });

    route::group(['prefix' => '/dashboard/git-groups', 'as' => 'git-groups.'], function () {
        route::get('/', [GitGroupController::class, 'index'])->name('index');
    });

    // 🔺 REPOSITORIES
    route::group(['prefix' => '/dashboard/repositories', 'as' => 'repositories.'], function () {
        route::get('/', [RepositoryController::class, 'index'])->name('index');
        route::post('/', [RepositoryController::class, 'store'])->name('store');
        route::get('/{repository}', [RepositoryController::class, 'show'])->name('show');
        route::get('/{repository}/edit', [RepositoryController::class, 'edit'])->name('edit');
        route::put('/{repository}', [RepositoryController::class, 'update'])->name('update');
        route::delete('/{repository}', [RepositoryController::class, 'destroy'])->name('destroy');
        route::delete('/{repository}/delete', [RepositoryController::class, 'delete'])->name('delete');

        route::get('/{repository}/last-commit', [RepositoryController::class, 'lastCommit'])->name('last-commit');
        route::get('/{repository}/google-analytics', [RepositoryController::class, 'googleAnalytics'])->name('google-analytics');
        route::get('/repositories/sync', [RepositoryController::class, 'syncWithGit'])->name('sync');
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

    // 🔺 CLIENT REPOSITORY - relationship
    route::group(['prefix' => '/client/{client}/repository/{repository}', 'as' => 'client.repository.'], function () {
        route::delete('detach', [ClientRepositoryController::class, 'detach'])->name('detach');
        route::post('attach', [ClientRepositoryController::class, 'attach'])->name('attach');
        route::patch('update', [ClientRepositoryController::class, 'update'])->name('update');
    });

    // 🔺 DATABASES
    route::group(['prefix' => '/dashboard/databases', 'as' => 'databases.'], function () {
        route::get('/', [RepositoryDatabaseController::class, 'index'])->name('index');
        route::delete('/{repository_database}', [RepositoryDatabaseController::class, 'destroy'])->name('destroy');

        route::delete('/bulk/destroy', [RepositoryDatabaseController::class, 'bulkDestroy'])->name('bulk.destroy');
        route::get('/bulk', [RepositoryDatabaseController::class, 'bulkDownload'])->name('bulk.download');
        //* STORE ---> api.php
    });

    // 🔺 HOSTINGS
    route::group(['prefix' => '/dashboard/hostings', 'as' => 'hostings.'], function () {
        route::get('/', [HostingController::class, 'index'])->name('index');
        route::get('/create', [HostingController::class, 'create'])->name('create');
        route::post('/', [HostingController::class, 'store'])->name('store');
        route::put('/{hosting}', [HostingController::class, 'update'])->name('update');
        route::delete('/{hosting}', [HostingController::class, 'destroy'])->name('destroy');
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';

// DELETE IN PRODUCTION
if (app()->isLocal()) {
    route::get('/test', [TestController::class, 'index']);
}
