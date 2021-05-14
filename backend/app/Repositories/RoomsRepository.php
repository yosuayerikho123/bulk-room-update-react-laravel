<?php


namespace App\Repositories;


use App\Interfaces\RoomsInterface;
use App\Models\Rooms;

class RoomsRepository implements RoomsInterface
{
    private $model;

    public function __construct(Rooms $rooms)
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
        return Rooms::all();
    }

    /**
     * Insert rooms data
     *
     * @param array $data
     * @return mixed
     */
    public function insert(array $data)
    {
        return $this->model->insert($data);
    }
}
