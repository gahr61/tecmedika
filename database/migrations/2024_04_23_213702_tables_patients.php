<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('patients', function(Blueprint $table){
            $table->id();
            $table->string('names', 100);
            $table->string('lastname1', 100);
            $table->string('lastname2', 100)->nullable();
            $table->date('birthdate');
            $table->enum('sex', ['Masculino', 'Femenino', 'Otro'])->nullable();
            $table->string('email', 200);
            $table->string('phone', 25);
            $table->timestamps();            
        });

        Schema::create('clinic_history', function(Blueprint $table){
            $table->id();
            $table->bigInteger('patients_id')->unsigned()->index();
            $table->bigInteger('doctors_id')->unsigned()->index();
            $table->string('weight', 10)->nullable();
            $table->string('height', 10)->nullable();
            $table->string('visit_reason', 200);
            $table->string('diagnosis', 250);
            $table->string('treatment', 300);
            $table->string('notes', 500);
            $table->timestamps();

            $table->foreign('patients_id')->references('id')->on('patients')->onDelete('cascade');
            $table->foreign('doctors_id')->references('id')->on('doctors')->onDelete('cascade');
        });

        Schema::create('appointment', function(Blueprint $table){
            $table->id();
            $table->bigInteger('patients_id')->unsigned()->index();
            $table->date('date');
            $table->time('time');
            $table->boolean('isFinished')->default(false);
            $table->timestamps();

            $table->foreign('patients_id')->references('id')->on('patients')->onDelete('cascade');
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointment');
        Schema::dropIfExists('clinic_history');
        Schema::dropIfExists('patients');
    }
};
