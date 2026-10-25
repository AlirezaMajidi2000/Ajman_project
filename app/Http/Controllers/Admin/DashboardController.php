<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;

class DashboardController extends Controller
{
    public function index()
    {
        $applicants = User::where('role', 'applicant')
            ->with(['info', 'professionalInfo'])
            ->latest()
            ->get();

        $totalCount = $applicants->count();
        $interviewCount = 0;
        $acceptedCount = 0;

        return view('admin.dashboard', compact(
            'applicants',
            'totalCount',
            'interviewCount',
            'acceptedCount'
        ));
    }
}
