<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\GaleriaController;
use App\Http\Controllers\ConfirmationController;
use App\Http\Controllers\DashboardController;

// --- PÁGINAS PÚBLICAS ---
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/nuestra-historia', function () {
    return Inertia::render('NuestraHistoria');
})->name('nuestra.historia');

// --- PÁGINAS QUE REQUIEREN LOGIN ---
Route::middleware(['auth'])->group(function () {
    
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Welcome para logueados
    Route::get('/welcome', function() {
        return Inertia::render('Welcome');
    })->name('welcome');

    // --- SECCIÓN CONFIRMACIÓN ---
    // Mantenemos tu estructura original pero pasando la variable 'yaConfirmadoServer'
    Route::get('/confirmar', function () {
        $yaConfirmado = \App\Models\Confirmation::where('user_id', auth()->id())->exists();
        
        return Inertia::render('Confirmacion', [
            'yaConfirmadoServer' => (bool)$yaConfirmado
        ]);
    })->name('confirmar.asistencia');

    // Ruta POST para guardar (apunta a tu controlador)
    Route::post('/confirmar-asistencia', [ConfirmationController::class, 'store'])->name('confirmar.asistencia.store');

    // --- GALERÍA ---
    Route::get('/galeria', [GaleriaController::class, 'index'])->name('galeria.index');
    Route::post('/galeria', [GaleriaController::class, 'store'])->name('galeria.store');
    Route::get('download-link/{filename}', [GaleriaController::class, 'getDownloadLink']);

    // --- PERFIL ---
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';