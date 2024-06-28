<?php

namespace App\Http\Controllers\API\SubOperation;

use App\Http\Controllers\Controller;
use App\Services\API\SubOperationService;
use Illuminate\Http\Request;

class BaseController extends Controller
{
    protected $service;

    public function __construct(SubOperationService $service) {
        $this->service = $service;
    }
}
