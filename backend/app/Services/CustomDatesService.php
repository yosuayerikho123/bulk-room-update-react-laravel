<?php


namespace App\Services;


use App\Repositories\CustomDatesRepository;
use Carbon\Carbon;
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
     * Find the custom room price between dates
     *
     * @param array $rooms_id
     * @param array $dates
     * @return mixed
     */
    public function findCustomRoomsBetweenDates(array $rooms_id, array $dates)
    {
        $dates[0] = Carbon::parse($dates[0])->format("Y-m-d");
        $dates[1] = Carbon::parse($dates[1])->format("Y-m-d");

        return $this->repository->betweenDates($rooms_id, $dates);
    }

    /**
     * Insert data into database
     *
     * @param int $rooms_id
     * @param array $dates
     * @param int $price
     * @return array
     */
    public function insert(int $rooms_id, array $dates, int $price)
    {
        $dates = collect($dates);
        $response = [
            "message"   => "Insert successfully",
            "status"    => 200
        ];

        DB::beginTransaction();
        try {
            $dates = $dates->map(function ($date) {
                 return Carbon::parse($date)->format("Y-m-d");
            });

            $array = $dates->map(function ($date, $index) use($rooms_id, $price) {

                return [
                    "rooms_id"      => $rooms_id,
                    "price"         => $price,
                    "dates"         => $date
                ];
            });
            DB::connection()->enableQueryLog();
            $this->repository->deleteInDates($rooms_id, $dates->toArray());
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
