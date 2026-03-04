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
    // Si no está logueado por algún motivo, fuera.
    if (!auth()->check()) return redirect()->route('login');

    $userId = auth()->id();

    // Si ya existe, NO HACEMOS NADA, solo volvemos. 
    // Esto quita el error 500 de "duplicado"
    if (\App\Models\Confirmation::where('user_id', $userId)->exists()) {
        return redirect()->back();
    }

    // Guardado ultra-seguro (si un campo falla, no rompe el resto)
    \App\Models\Confirmation::create([
        'user_id'            => $userId,
        'nombre'             => $request->nombre,
        'asistencia'         => $request->asistencia,
        'asistentes'         => $request->asistentes ?? 1,
        'nombres_asistentes' => $request->nombres_asistentes ?? '',
        'intolerancias'      => $request->intolerancias ?? '',
        'mensaje'            => $request->mensaje ?? '',
    ]);

    return redirect()->back();
}
}