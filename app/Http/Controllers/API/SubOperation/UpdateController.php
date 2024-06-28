<?php

namespace App\Http\Controllers\API\SubOperation;

use App\Http\Controllers\Controller;
use App\Http\Requests\API\SubOperation\UpdateRequest;
use App\Http\Resources\API\SuccessResource;
use App\Models\API\SubOperation;
use Illuminate\Http\Request;

class UpdateController extends BaseController
{
    public function __invoke(UpdateRequest $request) {
        $data = $request->validated();

        $operations = SubOperation::find($data['id']);
        unset($data['id']);
        
        try {
            $this->service->update($operations, $data);
            return new SuccessResource([]);
        } catch (\Exception $e) {
            return new SuccessResource(['err_msg'=> $e->getMessage()]);
        }
    }
}
