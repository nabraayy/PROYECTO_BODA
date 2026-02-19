<?php

namespace App\Http\Controllers;

use App\Models\Galeria;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Illuminate\Support\Facades\Storage;

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
            'archivo' => 'required|file|max:512000', 
            'titulo' => 'nullable|string|max:255',
            'descripcion' => 'nullable|string|max:500',
        ]);

        $file = $request->file('archivo');
        $mime = $file->getMimeType();

        // 1. Asegurar que las carpetas existen (Evita errores de guardado)
        Storage::disk('public')->makeDirectory('galeria/imagenes');
        Storage::disk('public')->makeDirectory('galeria/videos');

        // 🎥 VÍDEOS
        if (str_starts_with($mime, 'video/')) {
            $path = $file->store('galeria/videos', 'public');
            
            Galeria::create([
                'ruta' => 'storage/' . $path,
                'tipo' => 'video',
                'titulo' => $request->titulo,
                'descripcion' => $request->descripcion,
            ]);

            return redirect()->route('galeria.index');
        }

        // 🖼️ IMÁGENES
        try {
            ini_set('memory_limit', '1024M');
            $manager = new ImageManager(new Driver());
            
            // Leemos la imagen y corregimos la orientación según EXIF (Móviles)
            $image = $manager->read($file);
            
            // Esta línea es vital para fotos de móvil:
            // Asegura que si la foto se tomó en vertical, se mantenga vertical.
            $image->orient(); 

            // scale() es mejor que resize() porque garantiza que no se deforme
            if ($image->width() > 2500) {
                $image->scale(width: 2500);
            }

            $filename = uniqid('img_') . '.jpg';
            // Usamos Storage para guardar, es más limpio que storage_path directo
            $encoded = $image->toJpeg(80);
            Storage::disk('public')->put('galeria/imagenes/' . $filename, (string) $encoded);
            
            $finalPath = 'storage/galeria/imagenes/' . $filename;

        } catch (\Exception $e) {
            // SI FALLA (HEIC, 4K extremo), guardamos ORIGINAL para no perder la subida
            $path = $file->store('galeria/imagenes', 'public');
            $finalPath = 'storage/' . $path;
        }

        Galeria::create([
            'ruta' => $finalPath,
            'tipo' => 'imagen',
            'titulo' => $request->titulo,
            'descripcion' => $request->descripcion,
        ]);

        return redirect()->route('galeria.index');
    }
}