<?php


namespace App\Repositories;


use App\Interfaces\CustomDatesInterface;
use App\Models\CustomDates;

class CustomDatesRepository implements CustomDatesInterface
{
    private $model;

    /**
     * CustomDatesRepository constructor.
     * @param CustomDates $rooms
     */
    public function __construct(CustomDates $rooms)
    {
        $this->model = $rooms;
    }

    /**
     * Get all data from database
     *
     * @return mixed
     */
    public function all()
    {
        return CustomDates::all();
    }

    /**
     * Insert room data
     *
     * @param array $data
     * @return mixed
     */
    public function insert(array $data)
    {
        return $this->model->insert($data);
    }

    /**
     * Delete rooms where dates
     *
     * @param int $room_id
     * @param array $dates
     * @return mixed
     */
    public function deleteInDates(int $room_id, array $dates)
    {
        return $this->model->whereIn("dates", $dates)->where("rooms_id", $room_id)->delete();
    }

    /**
     * Find the rooms price between dates
     *
     * @param array $rooms_id
     * @param array $dates_between
     * @return mixed
     */
    public function betweenDates(array $rooms_id, array $dates_between)
    {
        return $this->model->whereIn("rooms_id", $rooms_id)->whereBetween("dates", $dates_between)->get();
    }
}
