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

        // --- SOLUCIÓN AL ERROR 500 ---
        // Si el usuario ya existe, no intentamos validar ni crear nada.
        // Simplemente redirigimos atrás. 
        // Al llegar al Front, 'yaConfirmadoServer' será true y saltará TU mensaje.
        if (Confirmation::where('user_id', $currentUserId)->exists()) {
            return redirect()->back();
        }

        $validated = $request->validate([
            'nombre'             => 'required|string|max:255',
            'asistencia'         => 'required|in:si,no',
            'asistentes'         => 'nullable|integer|min:1',
            'nombres_asistentes' => 'nullable|string',
            'intolerancias'      => 'nullable|string',
            'mensaje'            => 'nullable|string',
        ]);

        // Usamos updateOrCreate por seguridad extra para evitar duplicados en el último segundo
        Confirmation::updateOrCreate(
            ['user_id' => $currentUserId],
            $validated
        );

        return redirect()->back();
    }
}