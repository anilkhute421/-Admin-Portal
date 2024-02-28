<?php

use App\Http\Controllers\Api\CoustomerController;
use App\Http\Controllers\Api\InvoiceController;
use App\Http\Controllers\Api\LoginController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
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


Route::post('/login' , [LoginController::class , 'login']);
Route::middleware('auth:sanctum')->get('/customer/{dataType?}' , [CoustomerController::class , 'customer']);
Route::middleware('auth:sanctum')->post('/customer/create/{createType?}' , [CoustomerController::class , 'create']);
Route::middleware('auth:sanctum')->get('/customer/details/{id?}' , [CoustomerController::class , 'view']);
Route::middleware('auth:sanctum')->post('/customer/update/{id?}' , [CoustomerController::class , 'update']);
Route::middleware('auth:sanctum')->get('/invoice/details/{id?}' , [InvoiceController::class , 'view']);
Route::middleware('auth:sanctum')->post('/invoice/update/{id?}' , [InvoiceController::class , 'update']);
Route::middleware('auth:sanctum')->get('/signout' , [LoginController::class , 'signout']);












