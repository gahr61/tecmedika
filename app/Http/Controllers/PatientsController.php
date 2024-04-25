<?php

namespace App\Http\Controllers;

use App\Models\Patients;
use App\Models\Doctors;

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
