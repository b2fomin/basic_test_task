<?php

namespace App\Http\Controllers\API\SubOperation;

use App\Http\Controllers\Controller;
use App\Http\Requests\API\SubOperation\StoreRequest;
use App\Http\Resources\API\SuccessResource;
use Illuminate\Http\Request;

class StoreController extends BaseController
{
    public function __invoke(StoreRequest $request) {
        /** @var array $data */
        $data = $request->validated();
        try {
        $this->service->store($data);
        return new SuccessResource([]);
        } catch (\Exception $e) {
            return new SuccessResource(['err_msg'=> $e->getMessage()]);
        }
    }
}
