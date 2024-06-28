<?php

namespace App\Http\Controllers\API\SubOperation;
use App\Http\Requests\API\SubOperation\DestroyRequest;
use App\Models\API\SubOperation;


class DestroyController extends BaseController
{
    public function __invoke(DestroyRequest $request) {
        $data = $request->validated();
        $operation = SubOperation::findOrFail($data["id"]);
        $this->service->delete($operation, $data['force_delete']);
    }
}
