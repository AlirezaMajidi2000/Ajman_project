<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserInfo extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'birth_date',
        'province',
        'city',
        'education_status',
        'field_of_study',
        'requested_field',
    ];

    protected $casts = [
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
