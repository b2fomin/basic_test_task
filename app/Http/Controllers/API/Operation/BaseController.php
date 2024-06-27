<?php

namespace App\Http\Controllers\API\Operation;

use App\Http\Controllers\Controller;
use App\Services\API\OperationService;
use Illuminate\Http\Request;

class BaseController extends Controller
{
    private $service;

    public function __construct(OperationService $service) {
        $this->service = $service;
    }
}
