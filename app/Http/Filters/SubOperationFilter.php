<?php


namespace App\Http\Filters;


use Illuminate\Database\Eloquent\Builder;

class SubOperationFilter extends AbstractFilter
{
    protected function getCallbacks(): array
    {
        return [
            'id' => [$this, 'id'],
            'name' => [$this, 'name'],
            'number' => [$this, 'number'],
            '$operation_id' => [$this, 'operation_id'],
            'created_at' => [$this, 'created_at'],
            'updated_at' => [$this, 'updated_at'],

        ];
    }

    public function id(Builder $builder, $value) {
        $builder->find($value);
    }

    public function operation_id(Builder $builder, $value) {
        $builder->where("operation_id", $value);   
    }

    public function name(Builder $builder, $value) {
        $builder->where("name", "like", "%{$value}%");
    }

    public function number(Builder $builder, $value) {
        $builder->where("number", $value);
    }

    public function created_at(Builder $builder, $date_before, $date_after) {
        $builder->whereBetween("created_at", [$date_before, $date_after]);
    }

    public function updated_at(Builder $builder, $date_before, $date_after) {
        $builder->whereBetween("updated_at", [$date_before, $date_after]);
    }
}
