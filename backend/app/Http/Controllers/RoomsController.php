<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoomInsertRequest;
use App\Services\RoomsService;

class RoomsController extends Controller
{
    private $roomService;

    public function __construct(RoomsService $roomService)
    {
        $this->roomService = $roomService;
    }

    /**
     * Retrieve all data
     */
    public function retrieveAll()
    {
        return response()->json(["data" => $this->roomService->findAll(), "status" => 200]);
    }

    /**
     * Store the new room
     *
     * @param RoomInsertRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(RoomInsertRequest $request)
    {
        $response = $this->roomService->insert([$request->only(["name", "price"])]);

        return response()->json([
            "data" => $response["message"],
            "status" => $response["status"]
        ], $response["status"]);
    }
}
