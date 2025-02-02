<?php

namespace App\Models\API;

use App\Models\Traits\Filterable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Operation extends Model
{
    use HasFactory, SoftDeletes, HasUuids, Filterable;

    protected $guarded = false;

    public function subOperations() {
        return $this->hasMany(SubOperation::class);
    }
}
