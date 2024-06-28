<?php

namespace App\Services\API;

use App\Models\API\Operation;

class OperationService {
    public function store($data) {
        $operation = Operation::createOrFirst($data);
        $sub_operation = $operation->sub_operations()->create([
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
            $operation->sub_operations()->forceDelete();
            $operation->forceDelete();
        }
        else {
            $operation->sub_operations()->delete();
            $operation->delete();
        }
    }
}