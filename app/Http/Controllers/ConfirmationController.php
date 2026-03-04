<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Confirmation; 
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ConfirmationController extends Controller
{
    /**
     * Aplicamos el middleware auth para que solo usuarios 
     * registrados puedan ver o enviar el formulario.
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        // Ya no hace falta check() porque el middleware garantiza que está logueado
        $yaConfirmado = Confirmation::where('user_id', Auth::id())->exists();

        return Inertia::render('Confirmacion', [
            'yaConfirmadoServer' => (bool)$yaConfirmado
        ]);
    }

    public function store(Request $request)
{
    $currentUserId = Auth::id();

    // 1. EL CANDADO: Si ya existe, no permitimos NI LA VALIDACIÓN.
    // Simplemente mandamos al usuario de vuelta. 
    // Al volver, el Front verá que ya existe y mostrará el mensaje de éxito.
    if (Confirmation::where('user_id', $currentUserId)->exists()) {
        return redirect()->back();
    }

    // 2. Si ha pasado el filtro anterior, es que es la PRIMERA VEZ.
    // Validamos los datos.
    $validated = $request->validate([
        'nombre'             => 'required|string|max:255',
        'asistencia'         => 'required|in:si,no',
        'asistentes'         => 'nullable|integer|min:0',
        'nombres_asistentes' => 'nullable|string',
        'intolerancias'      => 'nullable|string',
        'mensaje'            => 'nullable|string',
    ]);

    // 3. GUARDADO ÚNICO.
    try {
        Confirmation::create([
            'user_id'            => $currentUserId,
            'nombre'             => $validated['nombre'],
            'asistencia'         => $validated['asistencia'],
            'asistentes'         => $validated['asistentes'] ?? 1,
            'nombres_asistentes' => $validated['nombres_asistentes'] ?? '',
            'intolerancias'      => $validated['intolerancias'] ?? '',
            'mensaje'            => $validated['mensaje'] ?? '',
        ]);

        return redirect()->back();

    } catch (\Exception $e) {
        // Si por algún milisegundo de diferencia chocan dos peticiones,
        // capturamos el error 500 y simplemente redirigimos.
        return redirect()->back();
    }
}
}