<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    use HasFactory;
    protected $table = 'experiences';
    protected $fillable = [
        'professional_info_id',
        'from_date',
        'to_date',
        'institution',
        'job_title',
        'salary',
        'leave_reason',
    ];

    public function professionalInfo()
    {
        return $this->belongsTo(ProfessionalInfo::class);
    }
}
