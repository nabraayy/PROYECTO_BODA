<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Confirmation; 
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ConfirmationController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        // Esto es lo que faltaba: pasar la variable al cargar la página
        $yaConfirmado = Confirmation::where('user_id', Auth::id())->exists();

        return Inertia::render('Confirmacion', [
            'yaConfirmadoServer' => (bool)$yaConfirmado
        ]);
    }

    public function store(Request $request)
    {
        $currentUserId = Auth::id();

        // Si ya existe, NO HACEMOS NADA. Ni validación ni insert.
        // Volvemos atrás y el index() se encargará de decir que ya existe.
        if (Confirmation::where('user_id', $currentUserId)->exists()) {
            return redirect()->back();
        }

        $validated = $request->validate([
            'nombre'             => 'required|string|max:255',
            'asistencia'         => 'required|in:si,no',
            'asistentes'         => 'nullable|integer|min:1',
            'nombres_asistentes' => 'nullable|string',
            'intolerancias'      => 'nullable|string',
            'mensaje'            => 'nullable|string',
        ]);

        // Usamos un try-catch por si la base de datos diera un error inesperado
        try {
            Confirmation::create(array_merge($validated, ['user_id' => $currentUserId]));
        } catch (\Exception $e) {
            // Si falla el insert por duplicado o cualquier cosa, volvemos sin error 500
            return redirect()->back();
        }

        return redirect()->back();
    }
}