<?php

namespace App\Http\Controllers;

use App\Models\Galeria;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str; // Añadido para ayudar con strings

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
                    // Importante: R2 con driver S3 a veces da problemas con url(). 
                    // Si falla, usaremos la URL de tu .env (AWS_URL)
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
            // Guardamos el vídeo tal cual
            $path = $file->store('galeria/videos', 's3');
            
            Galeria::create([
                'ruta' =>  $path,
                'tipo' => 'video',
                'titulo' => $request->titulo,
                'descripcion' => $request->descripcion,
            ]);

            return redirect()->route('galeria.index');
        }

        // 📸 IMÁGENES
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
            
            // CAMBIO AQUÍ: Eliminamos el 'public' si R2 da error de permisos, 
            // y nos aseguramos de pasar el string del contenido.
            Storage::disk('s3')->put('galeria/imagenes/' . $filename, $encoded->toString());

            $finalPath = 'galeria/imagenes/' . $filename;

        } catch (\Exception $e) {
            // Si falla Intervention (ej. formato HEIC no soportado), subimos el original
            $finalPath = $file->store('galeria/imagenes', 's3');
        }

        Galeria::create([
            'ruta' => $finalPath,
            'tipo' => 'imagen',
            'titulo' => $request->titulo,
            'descripcion' => $request->descripcion,
        ]);

        return redirect()->route('galeria.index');
    }

    // NUEVA FUNCIÓN: Esta es la que realmente hace la descarga
    public function download($id)
    {
        $item = Galeria::findOrFail($id);

        // Verificamos si el archivo existe en R2
        if (!Storage::disk('s3')->exists($item->ruta)) {
            abort(404, 'El archivo no existe en el almacenamiento.');
        }

        $extension = pathinfo($item->ruta, PATHINFO_EXTENSION);
        $nombreArchivo = Str::slug($item->titulo ?? 'recuerdo-boda') . '.' . $extension;

        $temporaryUrl = Storage::disk('s3')->temporaryUrl(
        $item->ruta,
        now()->addMinutes(20),
        [
            'ResponseContentDisposition' => 'attachment; filename="' . $nombreArchivo . '"',
        ]
    );

        // Esta función de Laravel fuerza al navegador a descargar el archivo
        // en lugar de intentar abrirlo (que es lo que suele pasar con fotos).
        return redirect($temporaryUrl);
    }
    public function destroy($id)
{
    // Asegurarse de que solo el admin pueda borrar
    if (auth()->user()->role !== 'admin') {
        abort(403, 'No tienes permisos para realizar esta acción.');
    }

    $item = Galeria::findOrFail($id);

    // 1. Lo borramos físicamente de Cloudflare R2 si existe
    if (Storage::disk('s3')->exists($item->ruta)) {
        Storage::disk('s3')->delete($item->ruta);
    }

    // 2. Lo borramos de la Base de Datos
    $item->delete();

    return redirect()->route('galeria.index');
}
}