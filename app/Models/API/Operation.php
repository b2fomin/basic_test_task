<?php

namespace App\Models\API;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Operation extends Model
{
    use HasFactory, SoftDeletes, HasUuids;

    public function sub_operations() {
        return $this->hasMany(SubOperation::class);
    }
}
