<?php


namespace App\Services;


use App\Repositories\RoomsRepository;
use Illuminate\Support\Facades\DB;

class RoomsService
{
    private $repository;

    public function __construct(RoomsRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Retrieve all rooms
     *
     * @return mixed
     */
    public function findAll()
    {
        return $this->repository->all();
    }

    /**
     * Insert a room
     *
     * @param array $data
     * @return array
     */
    public function insert(array $data)
    {
        $response = [
            "message"   => "Insert successfully",
            "status"    => 200
        ];

        DB::beginTransaction();
        try {
            $this->repository->insert($data);

            DB::commit();
        } catch (\Exception $exception) {

            $response["message"]    = $exception->getMessage();
            $response["status"]     = 500;

            DB::rollBack();
        }

        return $response;
    }
}
