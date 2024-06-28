<?php

namespace App\Http\Requests\API\SubOperation;

use Illuminate\Foundation\Http\FormRequest;

class IndexRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'id' =>'uuid',
            'operation_id' => 'uuid',
            'number' => 'integer',
            'name' => 'string',
            'created_at_before' => 'date',
            'created_at_after' => 'date',
            'updated_at_before'=> 'date',
            'updated_at_after'=> 'date',
            'page' => 'integer',
            'per_page' => 'integer',
        ];
    }
}
