<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request){
        $request->validate([
            'email' =>  'required|string|email',
            'password'  =>  'required|string'
        ]);

        $credentials = request(['email', 'password']);

        if(!\Auth::attempt($credentials)){
            return response()->json([
                'error' =>  'Usuario y/o contraseña incorrecto'
            ]);
        }

        $user = $request->user();
        
        if($user->isActive == false){
            return response()->json([
                'error'=>'El usuario no tiene acceso, contacte al administrador del sistema'
            ]);
        }

        $token = $user->createToken($user->role);
        $token->expires_at = Carbon::now()->addDays(1);

        return response()->json([
            'access_token'  => $token->plainTextToken,
            'user' => [
                'id'    =>  $user->id,
                'name'  =>  $user->names.' '.$user->lastname1.(is_null($user->lastname2) ? '' : ' '.$user->lastname2),        
            ],
            'role'  => $user->role,
            'expires_at'=>  Carbon::parse($token->expires_at)->toDateString()
        ]);

    }

    public function logout(Request $request){
        try{
            $user = auth()->user();
            
            $user->tokens()->delete();

            return response()->json(['message'=>'Sesión finalizada']);
        }catch(\Exception $e){
            return response()->json([
                'error'=>'ERROR ('.$e->getCode().'): '.$e->getMessage()
            ]);
        }
        
    }
}
