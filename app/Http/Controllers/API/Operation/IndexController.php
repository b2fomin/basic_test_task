<?php

namespace App\Http\Controllers\API\Operation;

use App\Http\Filters\OperationFilter;
use App\Http\Requests\API\Operation\IndexRequest;
use App\Http\Resources\API\Operation\IndexResource;
use App\Models\API\Operation;

class IndexController extends BaseController
{
    public function __invoke(IndexRequest $request) {
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

        $filter = app()->make(OperationFilter::class, ['queryParams' => array_filter($data)]);

        $operations = Operation::filter($filter)->paginate($per_page, ['*'], 'page', $page);

        return IndexResource::collection($operations);
    }
}
