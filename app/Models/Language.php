<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Language extends Model
{
    use HasFactory;
    protected $table = 'languages';
    protected $fillable = [
        'professional_info_id',
        'language',
        'speaking_level',
        'writing_level',
    ];

    public function professionalInfo()
    {
        return $this->belongsTo(ProfessionalInfo::class);
    }
}
