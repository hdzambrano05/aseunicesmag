<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSolicitudReferidosTable extends Migration
{
    public function up(): void
    {
        Schema::create('solicitud_referidos', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('solicitud_afiliacion_id');

            $table->string('nombre_referente')->nullable();
            $table->string('documento_referente', 30)->nullable();
            $table->string('relacion_referente', 100)->nullable();
            $table->text('motivacion_afiliacion')->nullable();

            $table->timestamps();

            $table->foreign('solicitud_afiliacion_id')
                ->references('id')
                ->on('solicitudes_afiliacion')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('solicitud_referidos');
    }
}