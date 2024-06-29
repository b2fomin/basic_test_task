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
        return [
            'name' => $this->faker->regexify("[A-Za-z]".'{'. rand(4, 10) . '}'),
        ];
    }
}
