<?php

namespace App\Http\Controllers\API\Operation;

use App\Http\Controllers\Controller;
use App\Http\Requests\API\Operation\UpdateRequest;
use App\Http\Resources\API\Operation\SuccessResource;
use App\Models\API\Operation;
use Illuminate\Http\Request;

class UpdateController extends BaseController
{
    public function __invoke(UpdateRequest $request, Operation $operation) {
        $data = $request->validated();
        try {
            $this->service->update($operation, $data);
            return new SuccessResource([]);
        } catch (\Exception $e) {
            return new SuccessResource(['err_msg'=> $e->getMessage()]);
        }
    }
}
