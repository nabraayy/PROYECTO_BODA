<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\GaleriaController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/nuestra-historia', function () {
    return Inertia::render('NuestraHistoria');
})->name('nuestra.historia');

Route::get('/confirmar', function () {
    return Inertia::render('Confirmacion');
})->name('confirmar.asistencia');

Route::get('/galeria', [GaleriaController::class, 'index'])->name('galeria.index');
Route::post('/galeria', [GaleriaController::class, 'store'])->name('galeria.store');

require __DIR__.'/auth.php';
