<?php

namespace App\Http\Controllers;
use App\Models\Confirmation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
public function index()
{
    $confirmed = Confirmation::with('user')
        ->where('asistencia', 'si')
        ->get();

    $notConfirmed = Confirmation::with('user')
        ->where('asistencia', 'no')
        ->get();

    return Inertia::render('Dashboard', [
        'confirmed' => $confirmed,
        'notConfirmed' => $notConfirmed,
        'stats' => [
            'total' => Confirmation::count(),
            'yes' => $confirmed->count(),
            'no' => $notConfirmed->count(),
            'intolerances' => Confirmation::whereNotNull('intolerancias')
                ->where('intolerancias', '!=', '')
                ->count(),
            'guests' => Confirmation::where('asistencia', 'si')->sum('asistentes'),
        ],
    ]);
}



}
