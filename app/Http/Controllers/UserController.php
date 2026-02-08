<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    // Mostrar formulario para crear un nuevo usuario
    public function create()
    {
        return view('users.create');
    }

    // Almacenar un nuevo usuario en la base de datos
    public function store(Request $request)
    {
        // Validar los datos
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'nullable|in:admin,user', // Validar que el rol sea admin o user
        ]);

        // Crear el nuevo usuario
        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']), // Encriptar la contraseña
            'role' => $validated['role'] ?? User::ROLE_USER, // Asignar rol por defecto si no se proporciona
        ]);

        // Redirigir a la lista de usuarios o donde prefieras
        return redirect()->route('users.index');
    }

    // Mostrar formulario para editar un usuario
    public function edit($id)
    {
        $user = User::findOrFail($id); // Buscar el usuario por su ID
        return view('users.edit', compact('user')); // Pasar el usuario a la vista
    }

    // Actualizar un usuario en la base de datos
    public function update(Request $request, $id)
    {
        // Validar los datos
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $id, // Ignorar el email del usuario actual
            'password' => 'nullable|string|min:8|confirmed',
            'role' => 'nullable|in:admin,user', // Validar el rol
        ]);

        $user = User::findOrFail($id); // Buscar el usuario por su ID

        // Actualizar los datos del usuario
        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => isset($validated['password']) ? bcrypt($validated['password']) : $user->password, // Solo actualizar la contraseña si se proporciona
            'role' => $validated['role'] ?? $user->role, // Mantener el rol existente si no se proporciona uno nuevo
        ]);

        // Redirigir después de actualizar
        return redirect()->route('users.index');
    }

    // Método para listar todos los usuarios (si lo necesitas)
    public function index()
    {
        $users = User::all(); // Obtener todos los usuarios
        return view('users.index', compact('users')); // Pasar los usuarios a la vista
    }
}
