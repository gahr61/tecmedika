<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Appointments;
use App\Models\ClinicHistory;

class ClinicHistoryController extends Controller
{
    /**
     * Obtiene informacion de la cita y datos de la historia clinica
     * @param $id identificador de la cita
     */
    public function getInfoAppintemtClinicHistory($id){
        $appountment = Appointments::join('patients', 'patients.id', 'appointment.patients_id')
                                ->join('doctors', 'doctors.id', 'appointment.doctors_id')
                                ->select(
                                    'appointment.id', 'appointment.folio',
                                    'patients.id as patients_id', 'patients.names as patient_names', 'patients.lastname1 as patient_lastname1', 'patients.lastname2 as patient_lastname2',
                                    'doctors.id as doctors_id', 'doctors.names as doctor_names', 'doctors.lastname1 as doctor_lastname1', 'doctors.lastname2 as doctor_lastname2',
                                )->where('appointment.id', $id)
                                ->first();
        
        $clinic_history = ClinicHistory::where('appointment_id', $id)->first();

        return response()->json([
            'appointment'=> $appountment,
            'clinic_history' => $clinic_history
        ]);
    }

    /**
     * Guarda datos de historia clinica
     */
    public function store(Request $request){
        try{
            \DB::beginTransaction();

            $clinic = new ClinicHistory();
            $clinic->fill($request->all());
            $clinic->save();

            $appointment = Appointments::where('id', $request->appointment_id)->first();
            $appointment->status = 'Terminada';
            $appointment->save();

            \DB::commit();

            return response()->json([ 'message' => 'La historia clinica se registro correctamente' ]);
        }catch(\Exception $e){
            \DB::rollback();

            return response()->json([
                'error'=>'ERROR ('.$e->getCode().'): '.$e->getMessage()
            ]); 
        }
    }

    /**
     * Imprime historia clinica
     * @param $id identidicador de historia clinica
     */
    public function print($id){
        $clinic_history = ClinicHistory::join('patients', 'patients.id', 'clinic_history.patients_id')
                                    ->join('doctors', 'doctors.id', 'clinic_history.doctors_id')
                                    ->select(
                                        'patients.id as patients_id', 'patients.names as patient_names', 'patients.lastname1 as patient_lastname1', 'patients.lastname2 as patient_lastname2',
                                        'doctors.id as doctors_id', 'doctors.names as doctor_names', 'doctors.lastname1 as doctor_lastname1', 'doctors.lastname2 as doctor_lastname2',
                                        'clinic_history.date', 'clinic_history.weight', 'clinic_history.height', 'clinic_history.visit_reason', 'clinic_history.diagnosis', 
                                        'clinic_history.treatment', 'clinic_history.notes'  
                                    )->where('clinic_history.id', $id)
                                    ->first();

        $title = 'Historia clínica - '.$clinic_history->patient_names.' '.$clinic_history->patient_lastname1.(is_null($clinic_history->patient_lastname2) ? '' : ' '.$clinic_history->patient_lastname2).'pdf';

        $view = \View::make('clinic_history', compact('title', 'clinic_history'))->render();

        $pdf = \App::make('dompdf.wrapper');
        $pdf->loadHTML($view);

        return $pdf->stream($title);
    }
}
