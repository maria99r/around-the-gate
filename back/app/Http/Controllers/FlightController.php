<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;

class FlightController extends Controller
{
    public function getFlights($airport, $type)
    {
        $response = Http::get('https://www.aena.es/sites/Satellite', [
            'pagename' => 'AENA_ConsultarVuelos',
            'airport' => $airport,
            'flightType' => $type,
            'limit' => 20,
            'dosDias' => 'si',
        ]);

        if (!$response) {
            return response()->json(['error' => 'No se pudieron obtener vuelos'], 500);
        }

        return $response->json();
    }

    public function getAirports()
    {
        // listado aeropuertos
        $response = Http::get('https://external.airport.ai/web/plugins/setup?domain=https://www.aena.es&clientId=7d854dc1-6f17-4fbe-a1fe-aaf4949e1fc0&messagingPlatform=WEB');

        if (!$response) {
            return response()->json(['error' => 'No se pudieron obtener los aeropuertos'], 500);
        }
        $res = $response->json();

        return $res['airportPerURLPath'] ?? [];
    }

    public function getLogo(Request $request)
    {
        $urlLogo = $request->query('url');
        $url = "https://www.aena.es" . $urlLogo;

        $response = Http::get($url);

        if ($response->failed()) {
            return response()->json(['error' => 'No se pudo cargar la imagen'], 404);
        }

        return response($response->body(), 200)
            ->header('Content-Type', $response->header('Content-Type'));
    }
}
