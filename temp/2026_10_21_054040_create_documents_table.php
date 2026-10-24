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
            $table->foreignId('application_id')
                  ->constrained('applications')
                  ->cascadeOnDelete();
            $table->enum('type', ['national_card', 'birth_certificate', 'photo']);
            $table->string('file_path');
            $table->string('original_name');
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->text('rejection_reason')->nullable();
            $table->timestamp('uploaded_at')->nullable();
            $table->timestamps();

        });
    }

    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};