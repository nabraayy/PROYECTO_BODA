<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Confirmation; 
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ConfirmationController extends Controller
{
    public function index()
    {
        // 1. Miramos si el usuario está logueado y si YA tiene una confirmación
        $user = Auth::user();
        $yaConfirmado = false;

        if ($user) {
            // Buscamos en la tabla 'confirmations' si existe su user_id
            $yaConfirmado = Confirmation::where('user_id', $user->id)->exists();
        }

        // 2. Pasamos el resultado exacto al Frontend
        return Inertia::render('Confirmacion', [
            'yaConfirmadoServer' => (bool) $yaConfirmado
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'asistentes' => 'nullable|integer|min:1',
            'nombres_asistentes' => 'nullable|string',
            'asistencia' => 'required|in:si,no',
            'intolerancias' => 'nullable|string',
            'mensaje' => 'nullable|string',
        ]);

        // Guardamos usando el ID del usuario autenticado
        // Esto sobreescribe si ya existe o crea uno nuevo si no
        Confirmation::updateOrCreate(
            ['user_id' => Auth::id()],
            $validated
        );

        // IMPORTANTE: Al hacer redirect back, Inertia vuelve a ejecutar el método index()
        // y mandará el nuevo valor de 'yaConfirmadoServer' (que ahora será true)
        return redirect()->back();
    }
}