<?php

namespace App\Services\API;

use App\Models\API\SubOperation;
use App\Models\API\Operation;

class SubOperationService {
    public function store($data) {
        $data['number'] = SubOperation::where('operation_id', '=', $data['operation_id'])->max('number') + 1;
        SubOperation::create($data);
    }

    public function update($sub_operation, $data) {
        $sub_operation->update($data);
    }

    public function delete($sub_operation) {
        $operation = $sub_operation->operation();
        $sub_operation->delete();
        if (!SubOperation::where('operation_id', $operation->id)->exists()) {
            $operation->delete();
        }
    }
}