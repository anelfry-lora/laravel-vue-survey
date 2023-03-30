<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SurveyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
Route::middleware('auth:api')->get('/user', function (Request $request) {
=======
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
>>>>>>> first commit, config proyect whit vue
    return $request->user();
=======
Route::middleware('auth:sanctum')->group(function(){
=======
//Protecte rout
Route::middleware('auth:sanctum')->group(function () {
>>>>>>> Commit for test
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);
<<<<<<< HEAD
>>>>>>> create surveys form
=======
    Route::resource('/survey', controller: SurveyController::class);

    Route::get('/dashboard', [DashboardController::class, 'index']);
>>>>>>> Commit for test
});

Route::get('/survey-by-slug/{survey:slug}', [SurveyController::class, 'showForGuest']);
Route::post('/survey/{survey}/answer', [SurveyController::class, 'storeAnswer']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
