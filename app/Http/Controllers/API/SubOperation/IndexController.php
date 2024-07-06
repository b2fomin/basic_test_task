<?php

namespace App\Http\Controllers\API\SubOperation;

use App\Http\Controllers\Controller;
use App\Http\Filters\SubOperationFilter;
use App\Http\Requests\API\SubOperation\IndexRequest;
use App\Http\Resources\API\SubOperation\IndexResource;
use App\Models\API\SubOperation;
use Illuminate\Http\Request;

class IndexController extends BaseController
{
    public function __invoke(IndexRequest $request) {
        /** @var array $data */
        $data = $request->validated();
        $page = $per_page = 1;
        if (isset($data['page'])) {
            $page = $data['page'];
            unset($data['page']);
        }

        if (isset($data['per_page'])) {
            $per_page = $data['per_page'];
            unset($data['per_page']);
        }
        $subOperations = $this->service->filter(array_filter($data))->paginate($per_page, ['*'], 'page', $page);

        return IndexResource::collection($subOperations);
    }
}
