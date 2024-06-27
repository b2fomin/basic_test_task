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

        $page = $data['page'];
        unset($data['page']);
        $per_page = $data['per_page'];
        unset($data['per_page']);

        $filter = app()->make(OperationFilter::class, ['query_params' => array_filter($data)]);

        $operations = Operation::filter($filter)->paginate($per_page, ['*'], 'page', $page);

        return IndexResource::collection($operations);
    }
}
