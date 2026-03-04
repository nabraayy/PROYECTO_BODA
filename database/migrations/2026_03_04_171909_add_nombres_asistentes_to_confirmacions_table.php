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
            // Cambiamos 'confirmacions' por 'confirmations'
            Schema::table('confirmations', function (Blueprint $table) {
                $table->text('nombres_asistentes')->nullable()->after('asistentes');
            });
        }

        public function down()
        {
            Schema::table('confirmations', function (Blueprint $table) {
                $table->dropColumn('nombres_asistentes');
            });
        }
};
