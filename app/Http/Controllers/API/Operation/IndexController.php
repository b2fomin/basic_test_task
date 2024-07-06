<?php

namespace App\Http\Controllers\API\Operation;

use App\Http\Requests\API\Operation\IndexRequest;
use App\Http\Resources\API\Operation\IndexResource;
use Illuminate\Pagination\LengthAwarePaginator;

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

        /** @var LengthAwarePaginator $operations */
        $operations = $this->service->filter(array_filter($data))->paginate($per_page, ['*'], 'page', $page);

        return IndexResource::collection($operations);
    }
}
