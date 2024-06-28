<?php

namespace App\Http\Controllers\API\Operation;

use App\Http\Controllers\Controller;
use App\Http\Requests\API\Operation\DestroyRequest;
use App\Models\API\Operation;
use Illuminate\Http\Request;

class DestroyController extends BaseController
{
    public function __invoke(DestroyRequest $request) {
        $data = $request->validated();
        $operation = Operation::findOrFail($data["id"]);
        $this->service->delete($operation, $data['force_delete']);
    }
}
