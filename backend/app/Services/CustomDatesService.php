<?php


namespace App\Services;


use App\Repositories\CustomDatesRepository;
use Illuminate\Support\Facades\DB;

class CustomDatesService
{
    private $repository;

    /**
     * CustomDatesService constructor.
     * @param CustomDatesRepository $repository
     */
    public function __construct(CustomDatesRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Insert data into database
     *
     * @param int $rooms_id
     * @param array $data
     * @return array
     */
    public function insert(int $rooms_id, array $data)
    {
        $collection = collect($data);
        $response = [
            "message"   => "Insert successfully",
            "status"    => 200
        ];

        DB::beginTransaction();
        try {
            // make array unique then pluck the date
            $unique = $collection->unique("date");

            $dates = $unique->pluck("date")->toArray();
            $array = $unique->map(function ($item) use($rooms_id) {
                $item["rooms_id"] = $rooms_id;
                $item["dates"] = $item["date"];
                unset($item["date"]);

                return $item;
            });
            $this->repository->deleteInDates($rooms_id, $dates);
            $this->repository->insert($array->toArray());

            DB::commit();
        } catch (\Exception $exception) {
            $response["message"]    = $exception->getMessage();
            $response["status"]     = 500;

            DB::rollBack();
        }

        return $response;
    }

    /**
     * Get all adata
     */
    public function getAll()
    {
        return $this->repository->all();
    }
}
