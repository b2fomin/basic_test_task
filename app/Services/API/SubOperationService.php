<?php

namespace App\Services\API;

use App\Models\API\SubOperation;
use App\Models\API\Operation;
use App\Http\Filters\SubOperationFilter;


class SubOperationService {
    public function store(array $data) {
        $data['number'] = SubOperation::where('operation_id', '=', $data['operation_id'])->max('number') + 1;
        SubOperation::createOrFirst($data);
    }

    public function update(string $id, array $data) {
        $sub_operation = SubOperation::findOrFail($id);
        $sub_operation->update($data);
    }

    public function delete(string $id, bool $force_delete) {
        $sub_operation = SubOperation::findOrFail($id);
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

    public function clear(bool $force_delete) {
        if ($force_delete) {
            SubOperation::withTrashed()->operation()->forceDelete();
            SubOperation::withTrashed()->forceDelete();
        }
        else {
            SubOperation::all()->operations()->delete();
            SubOperation::delete();
        }
    }
    public function filter(array $query_params) {
        $filter = app()->make(SubOperationFilter::class, ['queryParams' => $query_params]);
        return SubOperation::filter($filter);
    }
}