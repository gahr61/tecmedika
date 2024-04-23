<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DoctorMedicalSpecialty extends Model
{
    use HasFactory;

    protected $table = 'doctors_medical_specialty';
    public $timestamps = false;
}
