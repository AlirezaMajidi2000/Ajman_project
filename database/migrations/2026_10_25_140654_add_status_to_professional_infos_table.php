<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('professional_infos', function (Blueprint $table) {
            $table->string('status')->default('pending')->after('user_id');
            $table->string('interview_date')->nullable()->after('status');
            $table->text('admin_note')->nullable()->after('interview_date');
        });
    }

    public function down(): void
    {
        Schema::table('professional_infos', function (Blueprint $table) {
            $table->dropColumn(['status', 'interview_date', 'admin_note']);
        });
    }};
