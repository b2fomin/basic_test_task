<?php

use App\Http\Controllers\API\Operation\IndexController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('/v1')->group(function () {
    Route::get('/operations', IndexController::class);
});
