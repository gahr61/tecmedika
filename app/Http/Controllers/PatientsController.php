<?php

namespace App\Http\Controllers;

use App\Models\Patients;
use App\Models\Doctors;
use App\Models\ClinicHistory;

use Illuminate\Http\Request;

class PatientsController extends Controller
{
    /**
     * Muestra listado de pacientes.
     */
    public function index()
    {
        $patients = Patients::select(
                            'patients.id', 'patients.names', 'patients.lastname1', 'patients.lastname2', 'patients.email', 'patients.phone',
                        )->get();

        return response()->json($patients);
    }

    /**
     * Imprime historia clinica de paciente
     * @param $id identificador de paciente
     */
    public function print($id){
        $patient = Patients::select(
                        'patients.id', 'patients.names', 'patients.lastname1', 'patients.lastname2', 'patients.email', 'patients.phone',
                        )->where('id', $id)
                        ->first();

        $clinic_histories = ClinicHistory::join('doctors', 'doctors.id', 'clinic_history.doctors_id')
                                    ->select(
                                        'doctors.id as doctors_id', 'doctors.names as doctor_names', 'doctors.lastname1 as doctor_lastname1', 'doctors.lastname2 as doctor_lastname2',
                                        'clinic_history.date', 'clinic_history.weight', 'clinic_history.height', 'clinic_history.visit_reason', 'clinic_history.diagnosis', 
                                        'clinic_history.treatment', 'clinic_history.notes'  
                                    )
                                    ->where('clinic_history.patients_id', $patient->id)
                                    ->get();

        $title = 'Historia clínica - '.$patient->names.' '.$patient->lastname1.(is_null($patient->lastname2) ? '' : ' '.$patient->lastname2).'pdf';

        $months = array('Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre');
        $days = array('Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado');

        $date = $days[date('w')].', '.date('d').' de '.$months[date('m') - 1].' de '.date('Y');

        $view = \View::make('patient_history', compact('title', 'date', 'patient', 'clinic_histories'))->render();

        $pdf = \App::make('dompdf.wrapper');
        $pdf->loadHTML($view);

        return $pdf->stream($title);
    }

    /**
     * Guarda los datos de un nuevo paciente.
     */
    public function store(Request $request)
    {
        try{
            \DB::beginTransaction();

            $patient = new Patients();
            $patient->fill($request->all());
            $patient->save();

            \DB::commit();

            return response()->json([
                'message'=>'El paciente se registro correctamente'
            ]);
        }catch(\Exception $e){
            \DB::rollback();
            return response()->json([
                'error'=>'ERROR ('.$e->getCode().'): '.$e->getMessage()
            ]);
        }
    }

    /**
     * Obtiene listado de pacientes para llenar campos tipo combo
     */
    public function list(){
        $patients = Patients::select('id', 'names', 'lastname1', 'lastname2')->get();

        return response()->json($patients);
    }


    /**
     * Obtiene los datos de un paciente.
     */
    public function edit($id)
    {
       $patient = Patients::select('names', 'lastname1', 'lastname2', 'birthdate', 'email', 'sex', 'phone')
                        ->where('id', $id)
                        ->first();

        return response()->json($patient);
    }

    /**
     * Actualza los datos de un paciente.
     */
    public function update($id, Request $request)
    {
        try{
            \DB::beginTransaction();

            $patient = Patients::where('id', $id)->first();
            $patient->fill($request->all());
            $patient->save();

            \DB::commit();

            return response()->json([
                'message'=>'El paciente se actualizo correctamente'
            ]);
        }catch(\Exception $e){
            \DB::rollback();
            return response()->json([
                'error'=>'ERROR ('.$e->getCode().'): '.$e->getMessage()
            ]);
        }
    }

    /**
     * Elimina un paciente.
     */
    public function destroy($id)
    {
        try{
            \DB::beginTransaction();

            $patient = Patients::where('id', $id)->first();            
            $patient->delete();

            \DB::commit();

            return response()->json([
                'message'=>'El paciente se elimino correctamente'
            ]);
        }catch(\Exception $e){
            \DB::rollback();
            return response()->json([
                'error'=>'ERROR ('.$e->getCode().'): '.$e->getMessage()
            ]);
        }
    }
}
