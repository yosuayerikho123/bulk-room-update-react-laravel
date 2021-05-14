<?php

namespace App\Http\Controllers;

use App\Http\Requests\CustomDatesInsertRequest;
use App\Services\CustomDatesService;

class CustomDatesController extends Controller
{
    private $customDatesService;

    public function __construct(CustomDatesService $service)
    {
        $this->customDatesService = $service;
    }

    /**
     * Retrieve all data
     */
    public function retrieveAll()
    {
        return response()->json(["data" => $this->customDatesService->getAll(), "status" => 200]);
    }

    /**
     * Insert multiple data
     *
     * @param CustomDatesInsertRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function insertMultiple(CustomDatesInsertRequest $request)
    {
        $params = (object) $request->only(["rooms_id", "dates"]);

        $response = $this->customDatesService->insert($params->rooms_id, $params->dates);

        return response()->json(["data" => $response, "status" => $response["status"]], $response["status"]);
    }
}
