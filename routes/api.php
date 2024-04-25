<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\PatientsController;
use App\Http\Controllers\DoctorsController;
use App\Http\Controllers\AppointmentsController;
use App\Http\Controllers\ClinicHistoryController;

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
    Route::get('patients/list', [PatientsController::class, 'list']);

    Route::get('doctors/list', [DoctorsController::class, 'list']);

    Route::post('appointments', [AppointmentsController::class, 'store']);
    Route::get('appointments/status/{status}', [AppointmentsController::class, 'list']);
    Route::get('appointments/edit/{id}', [AppointmentsController::class, 'edit']);
    Route::put('appointments/update/{id}', [AppointmentsController::class, 'update']);
    Route::delete('appointments/delete/{id}', [AppointmentsController::class, 'delete']);

    Route::get('clinic_history/appointment/{id}', [ClinicHistoryController::class, 'getInfoAppintemtClinicHistory']);
    Route::post('clinic_history', [ClinicHistoryController::class, 'store']);
    Route::get('clinic_history/document/{id}', [ClinicHistoryController::class, 'print']);
});

