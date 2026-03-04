<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Confirmation; 
use Inertia\Inertia;

class ConfirmationController extends Controller
{
    public function index()
    {
        $yaConfirmado = false;
        if (auth()->check()) {
            // Buscamos si existe el registro para el usuario logueado
            $yaConfirmado = Confirmation::where('user_id', auth()->id())->exists();
        }

        return Inertia::render('Confirmacion', [
            // El casting a (bool) es vital para que React lo reciba correctamente
            'yaConfirmadoServer' => (bool)$yaConfirmado
        ]);
    }

    public function store(Request $request)
    {
        $currentUserId = auth()->id();

        // BLOQUEO: Si ya existe, abortamos.
        if (Confirmation::where('user_id', $currentUserId)->exists()) {
            return redirect()->back()->withErrors(['error' => 'Ya has enviado tu confirmación.']);
        }

        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'asistentes' => 'nullable|integer|min:1',
            'nombres_asistentes' => 'nullable|string',
            'asistencia' => 'required|in:si,no',
            'intolerancias' => 'nullable|string',
            'mensaje' => 'nullable|string',
        ]);

        Confirmation::create(array_merge($validated, ['user_id' => $currentUserId]));

        // Al volver atrás, index() se ejecuta, detecta el registro y bloquea el Front
        return redirect()->back();
    }
}