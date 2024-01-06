<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\GitController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\DashboardController;

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

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

route::group(['prefix' => 'dashboard', 'as' => 'dashboard.'], function () {
    route::get('/', [DashboardController::class, 'index'])->name('index');
});

route::group(['prefix' => '/dashboard/gits', 'as' => 'gits.'], function () {
    route::get('/', [GitController::class, 'index'])->name('index');
    route::get('/create', [GitController::class, 'create'])->name('create');
    route::post('/', [GitController::class, 'store'])->name('store');
    route::get('/{git}', [GitController::class, 'show'])->name('show');
    route::get('/{git}/edit', [GitController::class, 'edit'])->name('edit');
    route::put('/{git}', [GitController::class, 'update'])->name('update');
    route::delete('/{git}', [GitController::class, 'destroy'])->name('destroy');
});

route::group(['prefix' => '/dashboard/projects', 'as' => 'projects.'], function () {
    route::get('/', [ProjectController::class, 'index'])->name('index');
    route::get('/create', [ProjectController::class, 'create'])->name('create');
    route::post('/', [ProjectController::class, 'store'])->name('store');
    route::get('/{project}', [ProjectController::class, 'show'])->name('show');
    route::get('/{project}/edit', [ProjectController::class, 'edit'])->name('edit');
    route::put('/{project}', [ProjectController::class, 'update'])->name('update');
    route::delete('/{project}', [ProjectController::class, 'destroy'])->name('destroy');
});

route::group(['prefix' => '/dashboard/clients', 'as' => 'clients.'], function () {
    route::get('/', [ClientController::class, 'index'])->name('index');
    route::get('/create', [ClientController::class, 'create'])->name('create');
    route::post('/', [ClientController::class, 'store'])->name('store');
    route::get('/{client}', [ClientController::class, 'show'])->name('show');
    route::get('/{client}/edit', [ClientController::class, 'edit'])->name('edit');
    route::put('/{client}', [ClientController::class, 'update'])->name('update');
    route::delete('/{client}', [ClientController::class, 'destroy'])->name('destroy');
});




Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
