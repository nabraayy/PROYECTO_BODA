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
    // Buscamos si el usuario identificado ya tiene una fila en la tabla
    $user = auth()->user();
    $yaConfirmado = $user ? \App\Models\Confirmation::where('user_id', $user->id)->exists() : false;

    return Inertia::render('Confirmacion', [
        'yaConfirmadoServer' => (bool)$yaConfirmado // IMPORTANTE: forzar booleano
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