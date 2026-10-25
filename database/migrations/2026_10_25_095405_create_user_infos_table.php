<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('user_infos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->constrained('users')
                ->cascadeOnDelete();

            $table->string('birth_date')->nullable();
            $table->string('province')->nullable();
            $table->string('city')->nullable();
            $table->string('education_status')->nullable();
            $table->string('field_of_study')->nullable();
            $table->string('requested_field')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_infos');
    }
};
