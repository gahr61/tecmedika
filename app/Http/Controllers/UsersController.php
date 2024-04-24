<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;

class UsersController extends Controller
{
    /**
     * Obtiene listado de usuarios
     */
    public function list(){
        $user_logged = auth()->user();

        $users = User::select(
                        'id', 'names', 'lastname1', 'lastname2', 'email', 'role', 'isActive'
                    )->where('id', '!=', $user_logged->id);

        if($user_logged->role === 'Doctor'){
            $users = $users->where('role', '!=', 'Administrador de sistema');
        }
        
        $users = $users->get();

        return response()->json($users);
    }

    /**
     * Obtiene los datos de un usuario para edicion
     * @param $id identificador de usuario
     * @return json
     */
    public function edit($id){
        $user = User::select('id', 'names', 'lastname1', 'lastname2', 'email', 'role', 'isActive')
                    ->where('id', $id)
                    ->first();

        return response()->json($user);
    }

    /**
     * Actualiza datos de un usuario
     * @param $id, $request
     * @return json
     */
    public function update($id, Request $request){
        try{
            \DB::beginTransaction();

            $user = User::where('id', $id)->first();
            $user->names = $request->names;
            $user->lastname1 = $request->lastname1;
            $user->lastname2 = $request->lastname2;
            $user->email = $request->email;
            $user->role = $request->role;
            $user->isActive = $request->isActive;
            $user->save();

            \DB::commit();

            return response()->json([
                'message'=>'El usuarios se actualizao correctamente'
            ]);
        }catch(\Exception $e){
            \DB::rollback();

            return response()->json([
                'error'=>'ERROR ('.$e->getCode().'): '.$e->getMessage()
            ]);
        }
    }
}
