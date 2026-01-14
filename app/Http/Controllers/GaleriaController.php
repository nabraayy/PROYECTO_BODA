<?php

namespace App\Http\Controllers;

use App\Models\Galeria;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GaleriaController extends Controller
{
    public function index()
    {
        return Inertia::render('Galeria', [
            'galeria' => Galeria::latest()->get()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'archivo' => 'required|file|max:51200', // 50MB
            'titulo' => 'nullable|string|max:255',
            'descripcion' => 'nullable|string|max:500',
        ]);

        $file = $request->file('archivo');
        $mime = $file->getMimeType();

        $tipo = str_starts_with($mime, 'video') ? 'video' : 'imagen';

        $ruta = $file->store('galeria', 'public');

        Galeria::create([
            'ruta' => 'storage/' . $ruta,
            'tipo' => $tipo,
            'titulo' => $request->titulo,
            'descripcion' => $request->descripcion,
        ]);

        return redirect()->route('galeria.index');
    }
}
