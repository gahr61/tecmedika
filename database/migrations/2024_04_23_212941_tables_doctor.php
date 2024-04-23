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
        Schema::create('doctors', function(Blueprint $table){
            $table->id();
            $table->bigInteger('users_id')->unsigned()->index();
            $table->string('names', 100);
            $table->string('lastname1', 100);
            $table->string('lastname2', 100)->nullable();
            $table->timestamps();
            
            $table->foreign('users_id')->references('id')->on('users')->onDelete('cascade');
        });

        Schema::create('medical_specialty', function(Blueprint $table){
            $table->id();
            $table->string('name', 200);
            $table->timestamps();
        });

        Schema::create('doctors_medical_specialty', function(Blueprint $table){
            $table->id();
            $table->bigInteger('doctors_id')->unsigned()->index();
            $table->bigInteger('medical_specialty_id')->unsigned()->index();

            $table->foreign('doctors_id')->references('id')->on('doctors')->onDelete('cascade');
            $table->foreign('medical_specialty_id')->references('id')->on('medical_specialty')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('doctors_medical_specialty');
        Schema::dropIfExists('medical_specialty');
        Schema::dropIfExists('doctors');
    }
};
