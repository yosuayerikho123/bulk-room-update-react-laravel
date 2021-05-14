<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Query\Builder;

/**
 * Class CustomDates
 * @mixin Builder
 * @package App\Models
 */
class CustomDates extends Model
{
    protected $table = "custom_dates";
    protected $primaryKey = "id";
}
