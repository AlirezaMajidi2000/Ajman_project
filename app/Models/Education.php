<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    use HasFactory;

    protected $table = 'educations';

    protected $fillable = [
        'professional_info_id',
        'degree_title',
        'field_of_study',
        'institution',
        'gpa',
        'academic_year',
    ];

    public function professionalInfo()
    {
        return $this->belongsTo(ProfessionalInfo::class);
    }
}
