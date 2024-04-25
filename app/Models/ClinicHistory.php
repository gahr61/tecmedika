<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClinicHistory extends Model
{
    use HasFactory;

    protected $table = 'clinic_history';
    protected $fillable = ['patients_id', 'doctors_id', 'appointment_id', 'date', 'weight', 'heigth', 'visit_reason', 'diagnosis', 'treatment', 'notes'];
}
