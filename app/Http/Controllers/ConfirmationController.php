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
    return Inertia::render('Confirmacion', [
        // Forzamos el booleano para evitar que React reciba null o 1/0
        'yaConfirmadoServer' => Confirmation::where('user_id', auth()->id())->exists()
    ]);
}

    public function store(Request $request)
    {
        // 2. Seguridad extra: Si ya existe, no dejamos que guarde nada nuevo
        if (Confirmation::where('user_id', Auth::id())->exists()) {
            return redirect()->back()->with('error', 'Ya has enviado tu confirmación.');
        }

        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'asistentes' => 'nullable|integer|min:1',
            'nombres_asistentes' => 'nullable|string',
            'asistencia' => 'required|in:si,no',
            'intolerancias' => 'nullable|string',
            'mensaje' => 'nullable|string',
        ]);

        // 3. Guardamos asegurando que el user_id se incluya
        Confirmation::create(array_merge($validated, ['user_id' => Auth::id()]));

        return redirect()->back()->with('message', 'Confirmación procesada correctamente');
    }
}