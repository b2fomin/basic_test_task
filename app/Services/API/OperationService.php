<?php

namespace App\Services\API;

use App\Http\Filters\OperationFilter;
use App\Models\API\Operation;

class OperationService {
    public function store(array $data) {
        $operation = Operation::createOrFirst($data);
        $sub_operation = $operation->subOperations()->create([
            'operation_id' => $operation->id,
            'name' => 'null',
            'number' => 1]);
        $sub_operation->delete();
    }

    public function update(string $id, array $data) {
        $operation = Operation::findOrFail($id);
        $operation->update($data);
    }

    public function delete(string $id, bool $force_delete) {
        $operation = Operation::findOrFail($id);
        if ($force_delete) {
            $operation->subOperations()->forceDelete();
            $operation->forceDelete();
        }
        else {
            $operation->subOperations()->delete();
            $operation->delete();
        }
    }

    public function clear(bool $force_delete) {
        if ($force_delete) {
            Operation::withTrashed()->subOperations()->forceDelete();
            Operation::withTrashed()->forceDelete();
        }
        else {
            
            Operation::all()->subOperations()->delete();
            Operation::delete();
        }
    }

    public function filter(array $query_params) {
        /** @var array $data */
        $filter = app()->make(OperationFilter::class, ['queryParams' => $query_params]);
        return Operation::filter($filter);
    }
}