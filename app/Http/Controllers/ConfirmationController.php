<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Confirmation; 
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ConfirmationController extends Controller
{
    /**
     * Aplicamos el middleware auth para que solo usuarios 
     * registrados puedan ver o enviar el formulario.
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        // Ya no hace falta check() porque el middleware garantiza que está logueado
        $yaConfirmado = Confirmation::where('user_id', Auth::id())->exists();

        return Inertia::render('Confirmacion', [
            'yaConfirmadoServer' => (bool)$yaConfirmado
        ]);
    }

    public function store(Request $request)
    {
        $currentUserId = Auth::id();

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

        return redirect()->back();
    }
}