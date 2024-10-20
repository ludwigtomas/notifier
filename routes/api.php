<?php

use App\Http\Controllers\Api\V1\GitlabController;
use App\Http\Controllers\Api\V1\RepositoryDatabaseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', fn(Request $request) => $request->user());

Route::group(['prefix' => 'v1'], function (): void {
    Route::group(['prefix' => 'repositories'], function (): void {
        Route::post('/{repository:slug}', [RepositoryDatabaseController::class, 'store'])->name('api.database.store');
    });

    Route::group(['prefix' => 'gitlab', 'as' => 'gitlab.'], function (): void {
        Route::get('/groups', [GitlabController::class, 'groups'])->name('groups');
        Route::get('/groups/{group}/subgroups', [GitlabController::class, 'subgroups'])->name('subgroups');
        Route::get('/groups/{group_id}/detail', [GitlabController::class, 'groupDetail'])->name('groups.detail');
        Route::get('/groups/{group_id}/repositories', [GitlabController::class, 'groupRepositories'])->name('group.repositories');
    });
});
