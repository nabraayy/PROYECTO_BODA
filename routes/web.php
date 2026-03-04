<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\GaleriaController;
use App\Http\Controllers\ConfirmationController;

use App\Http\Controllers\DashboardController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth'])->name('dashboard');


Route::get('/welcome', function() {
    return Inertia::render('Welcome'); // Página de bienvenida para usuarios comunes
})->name('welcome');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/nuestra-historia', function () {
    return Inertia::render('NuestraHistoria');
})->name('nuestra.historia');

Route::get('/confirmar', function () {
    $yaConfirmado = false;
    if (auth()->check()) {
        $yaConfirmado = \App\Models\Confirmation::where('user_id', auth()->id())->exists();
    }
    return Inertia::render('Confirmacion', [
        'yaConfirmadoServer' => $yaConfirmado
    ]);
})->name('confirmar.asistencia');

Route::post('/confirmar-asistencia', [ConfirmationController::class, 'store'])->name('confirmar.asistencia.store');

Route::get('/galeria', [GaleriaController::class, 'index'])->name('galeria.index');
Route::post('/galeria', [GaleriaController::class, 'store'])->name('galeria.store');
Route::get('download-link/{filename}', [GaleriaController::class, 'getDownloadLink']);

require __DIR__.'/auth.php';
