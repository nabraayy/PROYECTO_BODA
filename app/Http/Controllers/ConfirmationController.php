<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Confirmation; 
use Inertia\Inertia;

class ConfirmationController extends Controller
{
    /**
     * Muestra el formulario y comprueba si el usuario ya confirmó
     */
    public function index()
    {
        // Comprobamos si el usuario actual ya tiene una fila en la tabla de confirmaciones
        $yaConfirmado = false;
        if (auth()->check()) {
            $yaConfirmado = Confirmation::where('user_id', auth()->id())->exists();
        }

        return Inertia::render('Confirmacion', [
            'yaConfirmadoServer' => $yaConfirmado
        ]);
    }

    /**
     * Guarda o actualiza la confirmación
     */
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

        $user = auth()->user();

        // Buscar si ya existe para este usuario
        $confirmation = Confirmation::where('user_id', $user->id)->first();

        if (Confirmation::where('user_id', $userId)->exists()) {
        return redirect()->back()->withErrors(['error' => 'Ya has enviado tu confirmación anteriormente.']);
        }

        // 3. Solo llegamos aquí si es la primera vez
        Confirmation::create(array_merge($validated, ['user_id' => $userId]));

        return redirect()->back()->with('message', 'Confirmación procesada correctamente');
    }
}