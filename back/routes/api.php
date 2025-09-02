<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FlightController;

// obtener vuelos
Route::get('/flights/{airport}/{type}', [FlightController::class, 'getFlights']);


// listado aeropuertos
Route::get('/airports', function() {
    $response = Http::get('https://external.airport.ai/web/plugins/setup?domain=https://www.aena.es&clientId=7d854dc1-6f17-4fbe-a1fe-aaf4949e1fc0&messagingPlatform=WEB');

    $res = $response->json();

    return $res['airportPerURLPath'] ?? [];
});
