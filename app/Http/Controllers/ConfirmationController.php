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
            'nombres_asistentes' => 'nullable|array',
            'nombres_asistentes.*' => 'string|max:255',
            'asistencia' => 'required|in:si,no',
            'intolerancias' => 'nullable|string',
            'mensaje' => 'nullable|string',
        ]);

        $validated['nombres_asistentes'] = json_encode($validated['nombres_asistentes'] ?? []);
        $user = auth()->user();

        // Buscar si ya existe para este usuario
        $confirmation = Confirmation::where('user_id', $user->id)->first();

        if ($confirmation) {
            // Si ya existe, actualizamos los datos
            $confirmation->update($validated);
        } else {
            // Si no existe, creamos uno nuevo asociando el user_id
            Confirmation::create(array_merge($validated, ['user_id' => $user->id]));
        }

        return redirect()->back()->with('message', 'Confirmación procesada correctamente');
    }
}