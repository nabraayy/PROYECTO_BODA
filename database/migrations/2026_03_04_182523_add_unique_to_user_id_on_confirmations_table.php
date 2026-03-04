<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::table('confirmations', function (Blueprint $table) {
        // Esto asegura que no pueda haber dos filas con el mismo user_id
        $table->unique('user_id');
    });
}

public function down()
{
    Schema::table('confirmations', function (Blueprint $table) {
        $table->dropUnique(['user_id']);
    });
}
};
