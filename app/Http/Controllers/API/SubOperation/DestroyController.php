<?php

namespace App\Http\Controllers\API\SubOperation;
use App\Http\Requests\API\SubOperation\DestroyRequest;
use App\Http\Resources\API\SuccessResource;
use App\Models\API\SubOperation;


class DestroyController extends BaseController
{
    public function __invoke(DestroyRequest $request) {
        /** @var array $data */
        $data = $request->validated();
        try{
            $this->service->delete($data["id"], $data['force_delete']);
            return new SuccessResource([]);
        } catch (\Exception $e) {
            return new SuccessResource(['err_msg'=> $e->getMessage()]);
        }
    }
}
