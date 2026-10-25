<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('professional_info_id')
                ->constrained('professional_infos')
                ->cascadeOnDelete();

            $table->string('type');
            $table->string('file_path')->nullable();
            $table->string('original_name')->nullable();
            $table->string('status')->default('pending');
            $table->text('rejection_reason')->nullable();

            $table->timestamps();

            $table->unique(['professional_info_id', 'type']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};
