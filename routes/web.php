<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GitController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TemplateController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\RepositoryController;
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
route::middleware('auth:sanctum')->group(function () {
    route::group(['prefix' => 'dashboard', 'as' => 'dashboard.'], function () {
        route::get('/', [DashboardController::class, 'index'])->name('index');
    });

    route::group(['prefix' => '/dashboard/gits', 'as' => 'gits.'], function () {
        route::get('/', [GitController::class, 'index'])->name('index');
        route::post('/', [GitController::class, 'store'])->name('store');
        route::get('/{git}', [GitController::class, 'show'])->name('show');
        route::get('/{git}/edit', [GitController::class, 'edit'])->name('edit');
        route::put('/{git}', [GitController::class, 'update'])->name('update');
        route::delete('/{git}', [GitController::class, 'destroy'])->name('destroy');
    });

    route::group(['prefix' => '/dashboard/repositories', 'as' => 'repositories.'], function () {
        route::get('/', [RepositoryController::class, 'index'])->name('index');
        route::get('/create', [RepositoryController::class, 'create'])->name('create');
        route::post('/', [RepositoryController::class, 'store'])->name('store');
        route::get('/{repository}', [RepositoryController::class, 'show'])->name('show');
        route::get('/{repository}/edit', [RepositoryController::class, 'edit'])->name('edit');
        route::put('/{repository}', [RepositoryController::class, 'update'])->name('update');
        route::delete('/{repository}', [RepositoryController::class, 'destroy'])->name('destroy');
    });

    route::group(['prefix' => '/dashboard/clients', 'as' => 'clients.'], function () {
        route::get('/', [ClientController::class, 'index'])->name('index');
        route::get('/create', [ClientController::class, 'create'])->name('create');
        route::post('/', [ClientController::class, 'store'])->name('store');
        route::get('/{client}', [ClientController::class, 'show'])->name('show');
        route::get('/{client:id}/edit', [ClientController::class, 'edit'])->name('edit');
        route::put('/{client}', [ClientController::class, 'update'])->name('update');
        route::delete('/{client}', [ClientController::class, 'destroy'])->name('destroy');
    });

    route::group(['prefix' => '/dashboard/backups', 'as' => 'backups.'], function () {
        route::get('/', [RepositoryDatabaseController::class, 'index'])->name('index');
        route::delete('/{repository_database}', [RepositoryDatabaseController::class, 'destroy'])->name('destroy');
        //* STORE REQUEST is in api.php
    });

    route::group(['prefix' => '/dashboard/templates', 'as' => 'templates.'], function () {
        route::get('/', [TemplateController::class, 'index'])->name('index');
        route::get('/create', [TemplateController::class, 'create'])->name('create');
        route::post('/', [TemplateController::class, 'store'])->name('store');
        route::get('/{template}', [TemplateController::class, 'show'])->name('show');
        route::get('/{template}/edit', [TemplateController::class, 'edit'])->name('edit');
        route::put('/{template}', [TemplateController::class, 'update'])->name('update');
        route::delete('/{template}', [TemplateController::class, 'destroy'])->name('destroy');
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
