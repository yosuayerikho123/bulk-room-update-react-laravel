<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Query\Builder;

/**
 * Class Rooms
 * @mixin Builder
 * @package App\Models
 */
class Rooms extends Model
{
    protected $table = "rooms";
    protected $primaryKey = "id";
}
