<?php

namespace Database\Seeders\API;

use App\Models\API\Operation;
use App\Models\API\SubOperation;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OperationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Operation::factory(10**4)->create();
    }
}
