<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Database\Seeders\API\OperationSeeder;
use Database\Seeders\API\SubOperationSeeder;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(OperationSeeder::class)
        ->call(SubOperationSeeder::class);
    }
}
