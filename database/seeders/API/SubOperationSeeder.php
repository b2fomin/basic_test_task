<?php

namespace Database\Seeders\API;

use App\Models\API\Operation;
use App\Models\API\SubOperation;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubOperationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $operations_arr = [];
        foreach(Operation::all() as $operation){
            for($i = 0; $i < rand(1, 10); ++$i) {
                $id = $operation->id;
                if (!isset($operations_arr[$id])) {
                    $operations_arr[$id] = 0;
                }

                $fields = ['operation_id' => $id,
                        'number' => ++$operations_arr[$id]];
            
                SubOperation::factory()->create($fields);
            }
        }
    
    }
}
