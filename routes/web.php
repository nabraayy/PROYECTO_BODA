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

// --- PÁGINAS PROTEGIDAS (REQUIEREN LOGIN) ---
Route::middleware(['auth'])->group(function () {
    
    // Dashboard principal
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Ruta de bienvenida alternativa
    Route::get('/welcome', function() {
        return Inertia::render('Welcome');
    })->name('welcome');

    // --- SECCIÓN DE CONFIRMACIÓN (Aquí estaba el cambio) ---
    // Ahora usamos el controlador para el GET, así cargará la variable 'yaConfirmadoServer'
    Route::get('/confirmar', [ConfirmationController::class, 'index'])->name('confirmar.asistencia');
    // El POST para guardar la confirmación
    Route::post('/confirmar-asistencia', [ConfirmationController::class, 'store'])->name('confirmar.asistencia.store');

    // --- GALERÍA ---
    Route::get('/galeria', [GaleriaController::class, 'index'])->name('galeria.index');
    Route::post('/galeria', [GaleriaController::class, 'store'])->name('galeria.store');
    Route::get('download-link/{filename}', [GaleriaController::class, 'getDownloadLink']);

    // --- PERFIL DE USUARIO ---
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';