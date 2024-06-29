<?php

namespace Database\Factories\API;

use App\Models\API\Operation;
use App\Models\API\SubOperation;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\API\SubOperation>
 */
class SubOperationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $operation_id = Operation::inRandomOrder()->first()['id'];
        $sub_op_where = SubOperation::withTrashed()->where('operation_id', $operation_id);
        $number = 1;
        if ($sub_op_where->exists()) {
            $number = $sub_op_where->max('number') + 1;
        }

        $name = '';
        for ($i = 0; $i < rand(4, 10); ++$i) {
            $name .= $this->faker->randomLetter();
        }

        return [
            'operation_id' => $operation_id,
            'name' => $name,
            'number' => $number,
        ];
    }
}
