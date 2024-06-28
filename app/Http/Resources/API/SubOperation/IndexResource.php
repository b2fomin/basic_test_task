<?php

namespace App\Http\Resources\API\SubOperation;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class IndexResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'operation_id' => $this->operation_id,
            'name' => $this->name,
            'number' => $this->number,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
