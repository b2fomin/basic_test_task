<?php

namespace App\Http\Controllers\API\Operation;

use App\Http\Controllers\Controller;
use App\Http\Requests\API\Operation\UpdateRequest;
use App\Http\Resources\API\SuccessResource;
use App\Models\API\Operation;
use Illuminate\Http\Request;

class UpdateController extends BaseController
{
    public function __invoke(UpdateRequest $request) {
        $data = $request->validated();

        $operations = Operation::find($data['id']);
        unset($data['id']);
        if (is_null($data['name'])) unset($data['name']);
        
        try {
            $this->service->update($operations, $data);
            return new SuccessResource([]);
        } catch (\Exception $e) {
            return new SuccessResource(['err_msg'=> $e->getMessage()]);
        }
    }
}
