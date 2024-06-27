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

    public function delete($sub_operation, $force_delete) {
        $number = $sub_operation->number;
        $operation = $sub_operation->operation();
        if ($force_delete)
            $sub_operation->forceDelete();
        else 
            $sub_operation->delete();

        $all_sub_operations = SubOperation::withTrashed()->where('operation_id', $operation->id);
        if (!$all_sub_operations->exists()) {
            $operation->forceDelete();
        }
        else {
            if ($all_sub_operations->trashed()) {
                $operation->delete();
            }

            foreach($all_sub_operations as $row) {
                if ($row->number > $number)
                    --$row->number;
            }
        }
    }
}