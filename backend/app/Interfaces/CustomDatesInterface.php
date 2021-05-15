<?php


namespace App\Interfaces;


interface CustomDatesInterface
{
    /**
     * Get all data from database
     *
     * @return mixed
     */
    public function all();

    /**
     * Insert custom rooms data
     *
     * @param array $data
     * @return mixed
     */
    public function insert(array $data);

    /**
     * Delete custom rooms where dates
     *
     * @param int $room_id
     * @param array $dates
     * @return mixed
     */
    public function deleteInDates(int $room_id, array $dates);

    /**
     * Find the rooms price between dates
     *
     * @param array $rooms_id
     * @param array $dates_between
     * @return mixed
     */
    public function betweenDates(array $rooms_id, array $dates_between);
}
