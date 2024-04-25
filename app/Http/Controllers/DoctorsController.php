<?php

namespace App\Http\Controllers;

use App\Models\Doctors;
use Illuminate\Http\Request;

class DoctorsController extends Controller
{
    public function list(){
        $doctors = Doctors::select('doctors.id', 'doctors.names', 'doctors.lastname1', 'doctors.lastname2')
                            ->get();

        return response()->json($doctors);
    }
}
