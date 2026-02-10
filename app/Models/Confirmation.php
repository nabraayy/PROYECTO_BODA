<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Confirmation extends Model
{
    use HasFactory;

    
    protected $table = 'confirmations';  

    protected $fillable = [
        'user_id',
        'nombre',
        'asistentes',
        'asistencia',
        'intolerancias',
        'mensaje',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
