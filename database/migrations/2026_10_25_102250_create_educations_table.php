<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('educations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('professional_info_id')
                ->constrained('professional_infos')
                ->cascadeOnDelete();

            $table->string('degree_title')->nullable();
            $table->string('field_of_study')->nullable();
            $table->string('institution')->nullable();
            $table->string('gpa')->nullable();
            $table->string('academic_year')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('educations');
    }
};
