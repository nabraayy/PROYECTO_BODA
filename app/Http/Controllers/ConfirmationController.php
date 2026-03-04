<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Confirmation; 
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ConfirmationController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        // Esto es lo que faltaba: pasar la variable al cargar la página
        $yaConfirmado = Confirmation::where('user_id', Auth::id())->exists();

        return Inertia::render('Confirmacion', [
            'yaConfirmadoServer' => (bool)$yaConfirmado
        ]);
    }

public function store(Request $request)
{
    $currentUserId = Auth::id();

    // 1. EL ESCUDO: Si ya existe, nos salimos ANTES de que explote la base de datos
    if (Confirmation::where('user_id', $currentUserId)->exists()) {
        // Volvemos atrás sin hacer nada. El Front recibirá la señal y mostrará el éxito.
        return redirect()->back();
    }

    // 2. VALIDACIÓN: Aseguramos que los datos sean correctos
    $validated = $request->validate([
        'nombre'             => 'required|string|max:255',
        'asistencia'         => 'required|in:si,no',
        'asistentes'         => 'nullable|integer|min:0',
        'nombres_asistentes' => 'nullable|string',
        'intolerancias'      => 'nullable|string',
        'mensaje'            => 'nullable|string',
    ]);

    // 3. INSERTAR CON SEGURIDAD
    try {
        Confirmation::create([
            'user_id'            => $currentUserId,
            'nombre'             => $validated['nombre'],
            'asistencia'         => $validated['asistencia'],
            // Usamos ?? para que si viene vacío se guarde algo coherente y no un null prohibido
            'asistentes'         => $validated['asistentes'] ?? 0,
            'nombres_asistentes' => $validated['nombres_asistentes'] ?? '',
            'intolerancias'      => $validated['intolerancias'] ?? '',
            'mensaje'            => $validated['mensaje'] ?? '',
        ]);

        return redirect()->back();

    } catch (\Exception $e) {
        // Si hay un error de SQL inesperado, capturamos el fallo para que no salga el error 500
        // y simplemente refrescamos la página.
        return redirect()->back();
    }
}
}