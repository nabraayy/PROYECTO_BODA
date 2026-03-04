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

    public function store(Request $request)
    {
        $currentUserId = auth()->id();

        // BLOQUEO: Si ya existe, volvemos atrás. 
        // Al volver, 'index' se ejecuta, ve que existe y el Front muestra el mensaje de éxito.
        if (Confirmation::where('user_id', $currentUserId)->exists()) {
            return redirect()->back();
        }

        // Validación incluyendo el campo que faltaba: nombres_asistentes
        $validated = $request->validate([
            'nombre'             => 'required|string|max:255',
            'asistencia'         => 'required|in:si,no',
            'asistentes'         => 'nullable|integer|min:1',
            'nombres_asistentes' => 'nullable|string', // <--- El campo que faltaba
            'intolerancias'      => 'nullable|string',
            'mensaje'            => 'nullable|string',
        ]);

        // Guardamos todo junto con el ID del usuario
        Confirmation::create(array_merge($validated, ['user_id' => $currentUserId]));

        // Redirigimos al mismo sitio para que Inertia refresque las props (yaConfirmadoServer pasará a true)
        return redirect()->back();
    }
}