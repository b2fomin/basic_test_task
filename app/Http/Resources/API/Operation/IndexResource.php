<?php

namespace App\Http\Resources\API\Operation;

use App\Models\API\Operation;
use App\Http\Filters\OperationFilter;
use Illuminate\Http\Resources\Json\JsonResource;

class IndexResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request): array
    {
        $query = $request->query;

        $page = $query->get('page');
        $per_page = $query->get('per_page');

        $filter = app()->make(OperationFilter::class, ['queryParams' => $query->all()]);

        $filtered_operations = Operation::filter($filter)->paginate($per_page, ['*'], 'page', $page);

        return [
            'id' => $this->id,
            'name' => $this->name,
            'number' => $this->number,
            'pages_num' => $filtered_operations->lastPage(),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
