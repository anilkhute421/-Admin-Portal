<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Invoice;
use Illuminate\Http\Request;

class CoustomerController extends Controller
{
    public function customer(){
        $customer = Customer::orderBy('id', 'DESC')->get();
        $invoice = Invoice::with(['customer' => function ($query) {
            $query->select('id', 'name');
        }])->orderBy('id', 'DESC')->get();
        
        $data = [];
        $data['invoice'] = $invoice;
        $data['customer'] = $customer;
        $reponse = [
            'sucess' => true,
            'data' => $data,
            'message' => 'data fetched'

        ];
        return response()->json($reponse , 200);
    }

    public function create(Request $request){

        $validator = validator($request->all(), [
            'name' => 'required',
            'email' => 'required|email', // 0 all
            'phone' => 'required',// 0 all
            'address'  => 'required',
        ]);
        if ($validator->fails()) {
            // return $this->sendSingleFieldError($validator->errors()->first(), 201, 200);
            $response = [
                'success' => false,
                'message' => $validator->errors()->first(),
                'status'  => 200
            ];
            //\Log::emergency('before sendResponse');
            return response()->json($response,201);
        }

        Customer::create($request->all());
        
        $reponse = [
            'sucess' => true,
            'message' => 'customer created succefully'

        ];
        return response()->json($reponse , 200);
    }


    public function view($id){

        $customerDetails = Customer::where('id',$id)->first();

        if($customerDetails){
            $reponse = [
                'sucess' => true,
                'data' => $customerDetails,
                'message' => 'customer fetched'
    
            ];
            return response()->json($reponse , 200);
        }else{
            $reponse = [
                'sucess' => false,
                'message' => 'check the customer id'
    
            ];
            return response()->json($reponse , 201);
        }
    }

    public function update(Request $request , $id){

        $validator = validator($request->all(), [
            'name' => 'required',
            'email' => 'required|email', // 0 all
            'phone' => 'required',// 0 all
            'address'  => 'required',
        ]);
        if ($validator->fails()) {
            // return $this->sendSingleFieldError($validator->errors()->first(), 201, 200);
            $response = [
                'success' => false,
                'message' => $validator->errors()->first(),
                'status'  => 200
            ];
            //\Log::emergency('before sendResponse');
            return response()->json($response,201);
        }

        Customer::where('id', $id)->update($request->all());
        
        $reponse = [
            'sucess' => true,
            'message' => 'customer created succefully'

        ];
        return response()->json($reponse , 200);
    }
}
