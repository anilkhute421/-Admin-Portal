<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    public function view($id){

        $invoiceDetails = Invoice::where('id',$id)->first();

        if($invoiceDetails){
            $reponse = [
                'sucess' => true,
                'data' => $invoiceDetails,
                'message' => 'Invoice created succefully'
    
            ];
            return response()->json($reponse , 200);
        }else{
            $reponse = [
                'sucess' => false,
                'message' => 'check the id'
    
            ];
            return response()->json($reponse , 201);
        }
    }

    public function update(Request $request , $id){

        $validator = validator($request->all(), [
            'customer_id' => 'required',
            'date' => 'required|date', // 0 all
            'amount' => 'required',// 0 all
            'status'  => 'required',
        ]);
        if ($validator->fails()) {
            $response = [
                'success' => false,
                'message' => $validator->errors()->first(),
                'status'  => 200
            ];
            return response()->json($response,201);
        }

        Invoice::where('id',$id)->update($request->all());
        
        $reponse = [
            'sucess' => true,
            'message' => 'Invoice created succefully'

        ];
        return response()->json($reponse , 200);
    }
}
