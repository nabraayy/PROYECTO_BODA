<?php

namespace App\Http\Controllers;

use App\Models\Galeria;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

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
        'archivo' => 'required|file',
        'titulo' => 'nullable|string|max:255',
        'descripcion' => 'nullable|string|max:500',
    ]);

    $file = $request->file('archivo');
    $mime = $file->getMimeType();

    // 🎥 VÍDEOS (no se procesan)
    if (str_starts_with($mime, 'video/')) {

        if ($file->getSize() > 300 * 1024 * 1024) {
            return back()->withErrors([
                'archivo' => 'El vídeo es demasiado grande (máx. 300MB).'
            ]);
        }

        $ruta = $file->store('galeria/videos', 'public');

        Galeria::create([
            'ruta' => 'storage/' . $ruta,
            'tipo' => 'video',
            'titulo' => $request->titulo,
            'descripcion' => $request->descripcion,
        ]);

        return redirect()->route('galeria.index');
    }

    // 🖼️ IMÁGENES (optimizadas)
    ini_set('memory_limit', '1024M');

    $manager = new ImageManager(new Driver());
    $image = $manager->read($file->getPathname());

    // Reducimos primero (clave para imágenes grandes)
    $image->resize(2500, null, function ($constraint) {
        $constraint->aspectRatio();
        $constraint->upsize();
    });

    $filename = uniqid('img_') . '.jpg';
    $savePath = storage_path('app/public/galeria/imagenes/' . $filename);

    // Compresión equilibrada
    $image->save($savePath, 70);

    Galeria::create([
        'ruta' => 'storage/galeria/imagenes/' . $filename,
        'tipo' => 'imagen',
        'titulo' => $request->titulo,
        'descripcion' => $request->descripcion,
    ]);

    return redirect()->route('galeria.index');
}

}
