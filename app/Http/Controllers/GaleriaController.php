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
            'galeria' => Galeria::latest()->get()->map(function ($item) {
                return [
                    'id' => $item->id,
                    'ruta' => $item->ruta,
                    'tipo' => $item->tipo,
                    'titulo' => $item->titulo,
                    'descripcion' => $item->descripcion,
                    'created_at' => $item->created_at->format('d M Y'),
                    'url' => Storage::disk('s3')->url($item->ruta),
                ];
            }),
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


        // 🎥 VÍDEOS
        if (str_starts_with($mime, 'video/')) {
            $path = $file->store('galeria/videos', 's3');
            
            Galeria::create([
                'ruta' =>  $path,
                'tipo' => 'video',
                'titulo' => $request->titulo,
                'descripcion' => $request->descripcion,
            ]);

            return redirect()->route('galeria.index');
        }

        
        try {
            ini_set('memory_limit', '1024M');
            $manager = new ImageManager(new Driver());
            
            
            $image = $manager->read($file);
            
            $image->orient(); 

            if ($image->width() > 2500) {
                $image->scale(width: 2500);
            }

            $filename = uniqid('img_') . '.jpg';
            $encoded = $image->toJpeg(80);
            Storage::disk('s3')->put('galeria/imagenes/' . $filename, (string) $encoded, 'public');

            $finalPath = 'galeria/imagenes/' . $filename;

        } catch (\Exception $e) {
            $path = $file->store('galeria/imagenes', 's3');
            $finalPath = $path;
        }

        Galeria::create([
            'ruta' => $finalPath,
            'tipo' => 'imagen',
            'titulo' => $request->titulo,
            'descripcion' => $request->descripcion,
        ]);

        return redirect()->route('galeria.index');
    }

    public function getDownloadLink($filename)
    {
        // Generar un enlace público (sin expiración)
        $fileUrl = Storage::disk('s3')->url($filename);

        return response()->json(['url' => $fileUrl]);
    }
    
}