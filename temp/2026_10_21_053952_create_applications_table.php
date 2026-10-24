<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                  ->constrained('users')
                  ->cascadeOnDelete();
            $table->foreignId('reviewer_id')
                  ->nullable()
                  ->constrained('admins')
                  ->nullOnDelete();
            $table->enum('status', [
                'pending_review',
                'invited',
                'accepted',
                'rejected',
                'docs_pending',
                'docs_submitted',
                'final_accepted',
                'final_rejected',
            ])->default('pending_review');
            $table->dateTime('interview_date')->nullable();
            $table->text('admin_note')->nullable();
            $table->timestamp('submitted_at')->nullable();
            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('applications');
    }
};