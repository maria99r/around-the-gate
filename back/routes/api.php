<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FlightController;

// obtener vuelos
Route::get('/flights/{airport}/{type}', [FlightController::class, 'getFlights']);


// listado aeropuertos
Route::get('/airports', [FlightController::class, 'getAirports']);

// imagenes de compañias
Route::get('/airline', [FlightController::class, 'getLogo']);