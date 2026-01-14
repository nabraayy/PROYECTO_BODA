<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('galerias', function (Blueprint $table) {
            $table->id();
            $table->string('ruta');
            $table->enum('tipo', ['imagen', 'video']);
            $table->string('titulo')->nullable();
            $table->text('descripcion')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('galerias');
    }
};
