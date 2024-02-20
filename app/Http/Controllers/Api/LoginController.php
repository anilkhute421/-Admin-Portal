<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login(Request $request ){
        
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);
 
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $response = [
                'success' => true,
                'data' => $user,
                'message' => 'login success'
            ];
            return response()->json($response, 200);
        }else{
            $response = [
                'success' => false,
                'message' => 'unauthorised'
            ];
            return response()->json($response, 401);
        }
 
    }

    public function signout(Request $request ){

        $user = User::first();
        $user->tokens()->delete();

        $response = [
            'success' => true,
            'message' => 'Logout Successful'
        ];
        return response()->json($response, 200);
    }


}
