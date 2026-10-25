<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('professional_infos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->constrained('users')
                ->cascadeOnDelete();

            $table->string('father_name')->nullable();
            $table->string('birth_place')->nullable();
            $table->string('birth_certificate_number')->nullable();
            $table->string('birth_certificate_issue_date')->nullable();
            $table->string('birth_certificate_issue_place')->nullable();
            $table->string('marital_status')->nullable();
            $table->string('military_status')->nullable();
            $table->string('military_exemption_reason')->nullable();
            $table->string('work_address')->nullable();
            $table->string('home_address')->nullable();
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('professional_infos');
    }
};
