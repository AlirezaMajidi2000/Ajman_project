<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;
    protected $table = 'courses';
    protected $fillable = [
        'professional_info_id',
        'certificate_title',
        'training_field',
        'institution',
        'from_date',
        'to_date',
    ];

    public function professionalInfo()
    {
        return $this->belongsTo(ProfessionalInfo::class);
    }
}
