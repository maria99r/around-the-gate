<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Http;

use Illuminate\Http\Request;

class FlightController extends Controller
{
    public function getFlights($airport, $type){
        
    $response = Http::get('https://www.aena.es/sites/Satellite', [
        'pagename'   => 'AENA_ConsultarVuelos',
        'airport'    => $airport,
        'flightType' => $type,
        'limit'      => 20,
        'dosDias'    => 'si',
    ]);

    return $response->json();

    }
}
