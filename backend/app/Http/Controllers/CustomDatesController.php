<?php

namespace App\Http\Controllers;

use App\Http\Requests\CustomDateRetrieveRequest;
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
     * Find room price between date
     *
     * @param CustomDateRetrieveRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function findBetween(CustomDateRetrieveRequest $request)
    {
        $rooms_id   = $request->rooms;
        $dates      = $request->dates;

        return response()->json([
            "data"      => $this->customDatesService->findCustomRoomsBetweenDates($rooms_id, $dates)
        ]);
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
        $params = (object) $request->only(["rooms_id", "dates", "price"]);

        $response = $this->customDatesService->insert($params->rooms_id, $params->dates, $params->price);

        return response()->json(["data" => $response["message"], "status" => $response["status"]], $response["status"]);
    }
}
