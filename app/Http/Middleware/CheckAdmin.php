<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckAdmin
{
    /**
     * Maneja la solicitud entrante.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // Verifica si el usuario tiene rol de administrador
        if (auth()->user() && auth()->user()->isAdmin()) {
            return $next($request);
        }

        // Redirige si no es administrador
        return redirect('/'); // O a cualquier otra página que desees
    }
}
