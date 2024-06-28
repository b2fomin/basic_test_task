<?php

use App\Http\Controllers\API\Operation\DestroyController;
use App\Http\Controllers\API\Operation\IndexController;
use App\Http\Controllers\API\Operation\StoreController;
use App\Http\Controllers\API\Operation\UpdateController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('/v1')->group(function () {
    Route::get('/operations', IndexController::class);
    Route::post('/operations', StoreController::class);
    Route::patch('/operations', UpdateController::class);
    Route::delete('/operations', DestroyController::class);
});
