<?php

namespace App\Http\Resources\API\SubOperation;

use Illuminate\Http\Request;
use App\Models\API\SubOperation;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Filters\SubOperationFilter;

class IndexResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $query = $request->query;

        $page = $query->get('page');
        $per_page = $query->get('per_page');

        $filter = app()->make(SubOperationFilter::class, ['queryParams' => $query->all()]);

        $filtered_operations = SubOperation::filter($filter)->paginate($per_page, ['*'], 'page', $page);

        return [
            'id' => $this->id,
            'operation_id' => $this->operation_id,
            'name' => $this->name,
            'number' => $this->number,
            'pages_num' => $filtered_operations->lastPage(),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
