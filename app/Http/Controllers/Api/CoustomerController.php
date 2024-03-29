<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Invoice;
use Illuminate\Http\Request;

class CoustomerController extends Controller
{
    public function customer($dataType)
    {

        $data = [];

        if ($dataType == 'customer') {
            $customer = Customer::orderBy('id', 'DESC')->get();
            $data['customer'] = $customer;
        }

        if ($dataType == 'invoice') {
            $invoice = Invoice::with(['customer' => function ($query) {
                $query->select('id', 'name');
            }])->orderBy('id', 'DESC')->get();

            $data['invoice'] = $invoice;
        }

        $reponse = [
            'sucess' => true,
            'data' => $data,
            'message' => 'data fetched'

        ];
        return response()->json($reponse, 200);
    }

    public function create(Request $request , $createType)
    {

        if($createType == 'customerCreate'){
            
        $validator = validator($request->all(), [
            'name' => 'required',
            'email' => 'required|email', // 0 all
            'phone' => 'required', // 0 all
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
            return response()->json($response, 201);
        }

        Customer::create($request->all());

        $reponse = [
            'sucess' => true,
            'message' => 'customer created succefully'

        ];
        return response()->json($reponse, 200);


        }elseif($createType == 'invoiceCreate'){

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
    
            Invoice::create($request->all());
            
            $reponse = [
                'sucess' => true,
                'message' => 'Invoice created succefully'
    
            ];
            return response()->json($reponse , 200);

        }

    }


    public function view($id)
    {

        $customerDetails = Customer::where('id', $id)->first();

        if ($customerDetails) {
            $reponse = [
                'sucess' => true,
                'data' => $customerDetails,
                'message' => 'customer fetched'

            ];
            return response()->json($reponse, 200);
        } else {
            $reponse = [
                'sucess' => false,
                'message' => 'check the customer id'

            ];
            return response()->json($reponse, 201);
        }
    }

    public function update(Request $request, $id)
    {

        $validator = validator($request->all(), [
            'name' => 'required',
            'email' => 'required|email', // 0 all
            'phone' => 'required', // 0 all
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
            return response()->json($response, 201);
        }

        Customer::where('id', $id)->update($request->all());

        $reponse = [
            'sucess' => true,
            'message' => 'customer created succefully'

        ];
        return response()->json($reponse, 200);
    }
}
