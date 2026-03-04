<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Confirmation; 
use Inertia\Inertia;

class ConfirmationController extends Controller
{
    /**
     * Muestra el formulario o el mensaje de éxito basándose en la base de datos.
     */
    public function index()
    {
        $yaConfirmado = false;
        if (auth()->check()) {
            // Buscamos si existe el registro para el usuario logueado
            $yaConfirmado = Confirmation::where('user_id', auth()->id())->exists();
        }

        return Inertia::render('Confirmacion', [
            // El casting a (bool) garantiza que React reciba un true/false real
            'yaConfirmadoServer' => (bool)$yaConfirmado
        ]);
    }

    /**
     * Guarda la confirmación y bloquea envíos duplicados.
     */
    public function store(Request $request)
    {
        $currentUserId = auth()->id();

        // BLOQUEO DE SEGURIDAD: Si ya existe en la DB, abortamos para evitar duplicados.
        if (Confirmation::where('user_id', $currentUserId)->exists()) {
            return redirect()->back()->withErrors(['error' => 'Ya has enviado tu confirmación.']);
        }

        // Validación de datos
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'asistencia' => 'required|in:si,no',
            'asistentes' => 'nullable|integer|min:1',
            'nombres_asistentes' => 'nullable|string',
            'intolerancias' => 'nullable|string',
            'mensaje' => 'nullable|string',
        ]);

        // Creación vinculada al usuario
        Confirmation::create(array_merge($validated, ['user_id' => $currentUserId]));

        // Al redirigir, Inertia vuelve a ejecutar index() y actualizará las props
        return redirect()->back()->with('message', '¡Confirmación guardada!');
    }
}