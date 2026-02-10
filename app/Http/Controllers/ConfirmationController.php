<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Confirmation; 

class ConfirmationController extends Controller
{
    public function store(Request $request)
{
    $validated = $request->validate([
        'nombre' => 'required|string|max:255',
        'asistentes' => 'nullable|integer|min:1',
        'asistencia' => 'required|in:si,no',
        'intolerancias' => 'nullable|string',
        'mensaje' => 'nullable|string',
    ]);

    $user = auth()->user();

    // 🔒 Buscar confirmación existente del usuario
    $confirmation = Confirmation::where('user_id', $user->id)->first();

    if ($confirmation) {
        // ✏️ Actualizar confirmación existente
        $confirmation->update($validated);
    } else {
        // ➕ Crear nueva confirmación
        Confirmation::create([
            'user_id' => $user->id,
            ...$validated,
        ]);
    }

    // 🚫 NO redirigir al dashboard para usuarios normales
    return redirect()
        ->back()
        ->with('status', 'Confirmación guardada correctamente');
}

}
