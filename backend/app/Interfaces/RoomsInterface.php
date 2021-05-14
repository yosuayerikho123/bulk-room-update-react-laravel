<?php


namespace App\Interfaces;


interface RoomsInterface
{
    /**
     * Get all data from database
     *
     * @return mixed
     */
    public function all();

    /**
     * Insert rooms data
     *
     * @param array $data
     * @return mixed
     */
    public function insert(array $data);
}
