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
            'yaConfirmadoServer' => (bool)$yaConfirmado
        ]);
    }

    public function store(Request $request)
    {
        // 1. Definimos el ID del usuario al principio para evitar el Error 500
        $currentUserId = auth()->id();

        // 2. BLOQUEO: Si ya existe, redirigimos atrás sin hacer nada
        // Esto impide que se cree una segunda confirmación
        if (Confirmation::where('user_id', $currentUserId)->exists()) {
            return redirect()->back()->with('error', 'Ya has enviado tu confirmación anteriormente.');
        }

        // 3. Validamos los datos
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'asistentes' => 'nullable|integer|min:1',
            'nombres_asistentes' => 'nullable|string',
            'asistencia' => 'required|in:si,no',
            'intolerancias' => 'nullable|string',
            'mensaje' => 'nullable|string',
        ]);

        // 4. Creamos el registro (Solo llegará aquí si no existía antes)
        Confirmation::create(array_merge($validated, ['user_id' => $currentUserId]));

        return redirect()->back()->with('message', 'Confirmación procesada correctamente');
    }
}