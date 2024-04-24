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
            'expires_at'=>  Carbon::parse($token->expires_at)->toDateString()
        ]);

    }
}
