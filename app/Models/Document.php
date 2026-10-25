<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;

    protected $fillable = [
        'professional_info_id',
        'type',
        'file_path',
        'original_name',
        'status',
        'rejection_reason',
    ];

    public function professionalInfo()
    {
        return $this->belongsTo(ProfessionalInfo::class);
    }
}
