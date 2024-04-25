<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointments extends Model
{
    use HasFactory;

    protected $table = 'appointment';
    protected $fillable = ['folio', 'date', 'time', 'patients_id', 'doctors_id'];
}
