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
    // 1. Si ya existe, ni lo intentamos. Volvemos atrás.
    if (\App\Models\Confirmation::where('user_id', auth()->id())->exists()) {
        return redirect()->back();
    }

    // 2. Validación simple
    $request->validate([
        'nombre' => 'required|string|max:255',
        'asistencia' => 'required',
    ]);

    // 3. Guardado manual (más seguro que el validated)
    try {
        $conf = new \App\Models\Confirmation();
        $conf->user_id = auth()->id();
        $conf->nombre = $request->nombre;
        $conf->asistencia = $request->asistencia;
        $conf->asistentes = $request->asistentes ?? 1;
        $conf->nombres_asistentes = $request->nombres_asistentes ?? '';
        $conf->intolerancias = $request->intolerancias ?? '';
        $conf->mensaje = $request->mensaje ?? '';
        $conf->save();

        // 4. Redirección limpia
        return redirect()->route('confirmar.asistencia'); 

    } catch (\Exception $e) {
        // Si falla el guardado, volvemos atrás sin error 500
        return redirect()->back();
    }

}
}