<?php

use App\Http\Controllers\API\Operation as Operation_ns;
use App\Http\Controllers\API\SubOperation as SubOperation_ns;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('/v1')->group(function () {
    Route::get('/operations', Operation_ns\IndexController::class);
    Route::post('/operations', Operation_ns\StoreController::class);
    Route::patch('/operations', Operation_ns\UpdateController::class);
    Route::delete('/operations', Operation_ns\DestroyController::class);

    Route::get('/sub_operations', SubOperation_ns\IndexController::class);
    Route::post('/sub_operations', SubOperation_ns\StoreController::class);
    Route::patch('/sub_operations', SubOperation_ns\UpdateController::class);
    Route::delete('/sub_operations', SubOperation_ns\DestroyController::class);
});
