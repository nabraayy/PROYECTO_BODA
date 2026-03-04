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
        $yaConfirmado = Confirmation::where('user_id', Auth::id())->exists();

        return Inertia::render('Confirmacion', [
            'yaConfirmadoServer' => (bool)$yaConfirmado
        ]);
    }

   public function store(Request $request)
{
    $currentUserId = Auth::id();

    // 1. COMPROBACIÓN PREVIA (Evita el 100% de los errores 500 por duplicado)
    // Si ya existe el registro, no hacemos NADA más. Solo volvemos.
    if (Confirmation::where('user_id', $currentUserId)->exists()) {
        return redirect()->back();
    }

    // 2. Si no existe, procedemos a validar
    $validated = $request->validate([
        'nombre'             => 'required|string|max:255',
        'asistencia'         => 'required|in:si,no',
        'asistentes'         => 'nullable|integer|min:1',
        'nombres_asistentes' => 'nullable|string',
        'intolerancias'      => 'nullable|string',
        'mensaje'            => 'nullable|string',
    ]);

    // 3. GUARDADO SEGURO
    // Usamos un bloque try-catch por si acaso hubiera un error de red o base de datos
    try {
        Confirmation::create(array_merge($validated, [
            'user_id' => $currentUserId,
            // Aseguramos que los campos opcionales no lleguen como null si la DB no los quiere
            'asistentes' => $validated['asistentes'] ?? 0,
            'nombres_asistentes' => $validated['nombres_asistentes'] ?? '',
            'intolerancias' => $validated['intolerancias'] ?? '',
            'mensaje' => $validated['mensaje'] ?? '',
        ]));

        return redirect()->back();

    } catch (\Exception $e) {
        // Si algo falla, redirigimos atrás sin que explote la pantalla (adiós error 500)
        return redirect()->back();
    }
}
}