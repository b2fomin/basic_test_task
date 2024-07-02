<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
Route::get('/operations', function () {
    return view('welcome');
});
Route::get('/sub_operations', function () {
    return view('welcome');
});