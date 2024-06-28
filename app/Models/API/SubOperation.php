<?php

namespace App\Models\API;

use App\Models\Traits\Filterable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SubOperation extends Model
{
    use HasFactory, SoftDeletes, HasUuids, Filterable;

    protected $guarded = false;

    public function operation() {
        return $this->belongsTo(Operation::class);
    }
}
