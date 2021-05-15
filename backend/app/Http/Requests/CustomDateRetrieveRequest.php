<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * @property mixed rooms
 * @property mixed dates
 */
class CustomDateRetrieveRequest extends FormRequest
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
            "rooms"         => "required|array|min:1",
            "rooms.*"       => "required|integer",
            "dates"         => "required|array|min:2|max:2",
            "dates.*"       => "required|date"
        ];
    }
}
