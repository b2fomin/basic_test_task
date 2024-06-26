<?php

namespace App\Services\API;

use App\Models\API\Operation;

class OperationService {
    public function store($data) {
        $operation = Operation::create($data);
        $sub_operation = $operation->sub_operations()->create([
            'operation_id' => $operation->id,
            'name' => 'null',
            'number' => 1]);
        $sub_operation->delete();
    }
}