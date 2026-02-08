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

        $confirmation = new Confirmation();
        $confirmation->user_id = auth()->id(); 
        $confirmation->nombre = $validated['nombre'];
        $confirmation->asistentes = $validated['asistentes'];
        $confirmation->asistencia = $validated['asistencia'];
        $confirmation->intolerancias = $validated['intolerancias'];
        $confirmation->mensaje = $validated['mensaje'];
        $confirmation->save();

        if (auth()->user()->role === 'admin') {
            return redirect()->route('dashboard')->with('status', 'Confirmación guardada correctamente');
        }
       return redirect()->route('confirmar.asistencia')
            ->with('status', 'Confirmación guardada correctamente');
    }
}
