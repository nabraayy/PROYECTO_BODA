<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Confirmation; 
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ConfirmationController extends Controller
{
    /**
     * Muestra el formulario y comprueba si el usuario ya confirmó
     */
    public function index()
    {
        // Forzamos la comprobación directa en la DB para que al recargar sea infalible
        $yaConfirmado = false;
        
        if (Auth::check()) {
            $yaConfirmado = Confirmation::where('user_id', Auth::id())->exists();
        }

        return Inertia::render('Confirmacion', [
            // Mandamos el valor booleano puro al frontend
            'yaConfirmadoServer' => (bool) $yaConfirmado
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

        Confirmation::updateOrCreate(
            ['user_id' => Auth::id()],
            $validated
        );

        return redirect()->back();
    }
}