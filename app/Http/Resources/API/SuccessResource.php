<?php

namespace App\Http\Resources\API;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SuccessResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if (isset($this->resource['err_msg'])) {
            return [
                'success' => false,
                'err_msg' => $this->resource['err_msg'],
            ];
        } else {
            return [
                'success' => true,
            ];
        }
    }
}
