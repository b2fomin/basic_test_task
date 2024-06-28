<?php

namespace App\Http\Controllers\API\Operation;

use App\Http\Controllers\Controller;
use App\Http\Requests\API\Operation\DestroyRequest;
use App\Http\Resources\API\SuccessResource;
use App\Models\API\Operation;
use Illuminate\Http\Request;

class DestroyController extends BaseController
{
    public function __invoke(DestroyRequest $request) {
        $data = $request->validated();
        try{
            $operation = Operation::findOrFail($data["id"]);
            $this->service->delete($operation, $data['force_delete']);
            return new SuccessResource([]);
        } catch (\Exception $e) {
            return new SuccessResource(['err_msg'=> $e->getMessage()]);
        }
    }
}
