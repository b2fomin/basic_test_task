<?php

namespace Database\Factories\API;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\API\Operation>
 */
class OperationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = '';
        for ($i = 0; $i < rand(4, 10); ++$i) {
            $name .= $this->faker->randomLetter();
        }

        return [
            'name' => $name,
        ];
    }
}
