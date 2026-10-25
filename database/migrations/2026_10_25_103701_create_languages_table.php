<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('languages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('professional_info_id')
                ->constrained('professional_infos')
                ->cascadeOnDelete();

            $table->string('language')->nullable();
            $table->string('speaking_level')->nullable();
            $table->string('writing_level')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('languages');
    }
};
