<?php

namespace Database\Seeders\API;

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
        SubOperation::factory(100)->create();
    }
}
