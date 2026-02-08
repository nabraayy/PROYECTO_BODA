<?php

namespace App\Http\Controllers;
use App\Models\Confirmation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    
   

    
    public function index()
    {
        
        $confirmations = Confirmation::all();

        if ($confirmations->isEmpty()) {
            return Inertia::render('Dashboard', [
                'confirmed' => [],  
                'notConfirmed' => [],
            ]);
        }

        $confirmed = $confirmations->where('asistencia', 'si');
        $notConfirmed = $confirmations->where('asistencia', 'no');

        return Inertia::render('Dashboard', [
            'confirmed' => $confirmed,   
            'notConfirmed' => $notConfirmed,  
        ]);
    }

}
