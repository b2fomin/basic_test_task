<?php


namespace App\Http\Filters;


use Illuminate\Database\Eloquent\Builder;

class OperationFilter extends AbstractFilter
{
    protected function getCallbacks(): array
    {
        return [
            'name' => [$this, 'name'],
            'number' => [$this, 'number'],
            'created_at' => [$this, 'created_at'],
            'updated_at' => [$this, 'updated_at'],

        ];
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
