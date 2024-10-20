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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

route::group(['prefix' => 'v1'], function () {
    route::group(['prefix' => 'repositories'], function () {
        route::post('/{repository:slug}', [RepositoryDatabaseController::class, 'store'])->name('api.database.store');
    });

    route::group(['prefix' => 'gitlab', 'as' => 'gitlab.'], function () {
        route::get('/groups', [GitlabController::class, 'groups'])->name('groups');
        route::get('/groups/{group}/subgroups', [GitlabController::class, 'subgroups'])->name('subgroups');
        route::get('/groups/{group_id}/detail', [GitlabController::class, 'groupDetail'])->name('groups.detail');
        route::get('/groups/{group_id}/repositories', [GitlabController::class, 'groupRepositories'])->name('group.repositories');
    });
});
