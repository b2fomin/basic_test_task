<?php

namespace App\Http\Controllers\API\Operation;

use App\Http\Controllers\Controller;
use App\Http\Requests\API\Operation\StoreRequest;
use Illuminate\Http\Request;

class StoreController extends BaseController
{
    public function __invoke(StoreRequest $request) {
        
        $data = $request->validated();
        try {
        $this->service->store($data);
        return response()->json(['success' => true]);
        } catch (\Exception $e) {
            return response()->json(['success'=> false,'message'=> $e->getMessage()]);
        }
    }
}
