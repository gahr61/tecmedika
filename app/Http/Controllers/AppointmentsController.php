<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Appointments;

class AppointmentsController extends Controller
{

    /**
     * Elimina una cita
     */
    public function delete($id){
        try{
            \DB::beginTransaction();

            $appointment = Appointments::find($id);            
            $appointment->delete();

            \DB::commit();

            return response()->json([ 'message'=>'La cita se elimino correctamente' ]);
        }catch(\Exception $e){
            \DB::rollback();

            return response()->json([ 'error'=>'Error: '.$e->getCode().' - '.$e->getMessage().', '.$e->getLine() ]);
        }
        
    }

    /**
     * Obtiene datos de una cita
     */
    public function edit($id){
        $appointment = Appointments::select('id', 'folio', 'date', 'time', 'patients_id', 'doctors_id')->first();

        return response()->json($appointment);
    }

    /**
     * Obtiene id de doctor
     */
    public function getDoctorsId(){
        $user = auth()->user();

        $doctor = Doctors::select('id')->where('users_id', $user->id)->first();

        return $doctor->id;
    }

    /**
     * Obtiene listado de citas
     */
    public function list($status){
        $appointments = Appointments::join('patients', 'patients.id', 'appointment.patients_id')
                                ->join('doctors', 'doctors.id', 'appointment.doctors_id')
                                ->select(
                                    'appointment.id', 'appointment.folio', 'appointment.date', 'appointment.time', 'appointment.status',
                                    'patients.names as patient_names', 'patients.lastname1 as patient_lastname1', 'patients.lastname2 as patient_lastname2',
                                    'doctors.names as doctor_names', 'doctors.lastname1 as doctor_lastname1', 'doctors.lastname2 as doctor_lastname2'
                                );
        
        $user_role = auth()->user()->role;

        if($user_role == 'Doctor'){
            $doctor_id = $this->getDoctorsId();
            $appointments = $appointments->where('appointment.id', $doctor_id);
        }

        if($status != 'all'){
            $appointments = $appointments->where('appointment.status', $status);
        }

        $appointments = $appointments->get();

        return response()->json($appointments);

    }
    
    /**
     * Guarda datos de una cita
     */
    public function store(Request $request){
        try{
            \DB::beginTransaction();

            $appointment = new Appointments();
            $appointment->fill($request->all());
            $appointment->save();

            \DB::commit();

            return response()->json(['message'=> 'La cita se registro correctamente']);
        }catch(\Exception $e){
            \DB::rollback();

            return response()->json([
                'error' => 'Error: '.$e->getCode().' - '.$e->getMessage() 
            ]);
        }
    }

    /**
     * Actualiza datos de una cita
     */
    public function update($id, Request $request){
        try{
            \DB::beginTransaction();

            $appointment = Appointments::find($id);
            $appointment->fill($request->all());
            $appointment->save();

            \DB::commit();

            return response()->json(['message'=> 'La cita se actualizo correctamente']);
        }catch(\Exception $e){
            \DB::rollback();

            return response()->json([
                'error' => 'Error: '.$e->getCode().' - '.$e->getMessage() 
            ]);
        }
    }
}
