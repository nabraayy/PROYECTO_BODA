<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Confirmation; 
use Inertia\Inertia;

class ConfirmationController extends Controller
{
    public function index()
    {
        // Verificamos si ya existe el registro en la BD para el usuario logueado
        $yaConfirmado = auth()->check() 
            ? Confirmation::where('user_id', auth()->id())->exists() 
            : false;

        return Inertia::render('Confirmacion', [
            'yaConfirmadoServer' => (bool)$yaConfirmado
        ]);
    }

    // ConfirmationController.php

public function store(Request $request)
{
    $currentUserId = auth()->id();

    // Si ya existe, simplemente volvemos (esto refresca la página para el usuario)
    if (Confirmation::where('user_id', $currentUserId)->exists()) {
        return redirect()->back();
    }

    $validated = $request->validate([
        'nombre' => 'required|string|max:255',
        'asistencia' => 'required|in:si,no',
        'asistentes' => 'nullable|integer|min:1',
        'nombres_asistentes' => 'nullable|string',
        'intolerancias' => 'nullable|string',
        'mensaje' => 'nullable|string',
    ]);

    Confirmation::create(array_merge($validated, ['user_id' => $currentUserId]));

    // IMPORTANTE: Al volver atrás, Inertia refresca las props del componente automáticamente
    return redirect()->back();
}
}