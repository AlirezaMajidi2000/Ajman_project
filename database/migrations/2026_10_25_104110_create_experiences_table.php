<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('experiences', function (Blueprint $table) {
            $table->id();
            $table->foreignId('professional_info_id')
                ->constrained('professional_infos')
                ->cascadeOnDelete();

            $table->string('from_date')->nullable();
            $table->string('to_date')->nullable();
            $table->string('institution')->nullable();
            $table->string('job_title')->nullable();
            $table->string('salary')->nullable();
            $table->string('leave_reason')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('experiences');
    }
};
