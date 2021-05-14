<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CustomDatesInsertRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            "rooms_id"      => "required|string|min:1",
            "dates"         => "required|array|min:1",
            "dates.*.date"  => "required|date",
            "dates.*.price" => "required|integer|min:1"
        ];
    }
}
