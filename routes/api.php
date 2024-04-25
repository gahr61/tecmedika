<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\PatientsController;
use App\Http\Controllers\DoctorsController;

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

Route::group(['prefix'=>'auth'], function(){
    Route::post('login', [AuthController::class, 'login']);

    Route::group(['middleware'=>'auth:sanctum'], function(){
        Route::get('logout', [AuthController::class, 'logout']);
    });
});

Route::group(['middleware'=>'auth:sanctum'], function(){
    Route::get('users', [UsersController::class, 'list']);
    Route::get('users/edit/{id}', [UsersController::class, 'edit']);
    Route::put('users/update/{id}', [UsersController::class, 'update']);

    Route::get('patients', [PatientsController::class, 'index']);
    Route::post('patients', [PatientsController::class, 'store']);
    Route::get('patients/edit/{id}', [PatientsController::class, 'edit']);
    Route::put('patients/update/{id}', [PatientsController::class, 'update']);
    Route::delete('patients/{id}', [PatientsController::class, 'destroy']);

    Route::get('doctors/list', [DoctorsController::class, 'list']);
});

