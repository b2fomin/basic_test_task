<?php

namespace App\Services\API;

use App\Models\API\Operation;

class OperationService {
    public function store($data) {
        $operation = Operation::createOrFirst($data);
        $sub_operation = $operation->subOperations()->create([
            'operation_id' => $operation->id,
            'name' => 'null',
            'number' => 1]);
        $sub_operation->delete();
    }

    public function update($operation, $data) {
        $operation->update($data);
    }

    public function delete($operation, $force_delete) {
        if ($force_delete) {
            $operation->subOperations()->forceDelete();
            $operation->forceDelete();
        }
        else {
            $operation->subOperations()->delete();
            $operation->delete();
        }
    }

    public function clear($force_delete) {
        if ($force_delete) {
            Operation::withTrashed()->subOperations()->forceDelete();
            Operation::withTrashed()->forceDelete();
        }
        else {
            
            Operation::all()->subOperations()->delete();
            Operation::delete();
        }
    }
}