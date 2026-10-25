<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProfessionalInfo extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'status',
        'interview_date',
        'admin_note',
        'father_name',
        'birth_place',
        'birth_certificate_number',
        'birth_certificate_issue_date',
        'birth_certificate_issue_place',
        'marital_status',
        'military_status',
        'military_exemption_reason',
        'work_address',
        'home_address',
        'description',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function educations()
    {
        return $this->hasMany(Education::class);
    }


    public function courses()
    {
        return $this->hasMany(Course::class);
    }


    public function languages()
    {
        return $this->hasMany(Language::class);
    }


    public function experiences()
    {
        return $this->hasMany(Experience::class);
    }

    public function documents()
    {
        return $this->hasMany(Document::class);
    }

}
