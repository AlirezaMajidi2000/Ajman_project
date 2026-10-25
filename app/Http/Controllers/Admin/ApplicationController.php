<?php

namespace App\Http\Controllers\Admin;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;

class ApplicationController extends Controller
{
    public function show(User $user)
    {
        abort_if($user->role !== 'applicant', 404);

        $user->load([
            'info',
            'professionalInfo.documents',
            'professionalInfo.educations',
            'professionalInfo.courses',
            'professionalInfo.languages',
            'professionalInfo.experiences',
        ]);

        return view('admin.applications.show', compact('user'));
    }

    public function showJson(User $user)
    {
        abort_if($user->role !== 'applicant', 404);

        $user->load([
            'info',
            'professionalInfo.documents',
            'professionalInfo.educations',
            'professionalInfo.courses',
            'professionalInfo.languages',
            'professionalInfo.experiences',
        ]);

        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'last_name' => $user->last_name,
            'national_code' => $user->national_code,
            'phone' => $user->phone,
            'username' => $user->username,
            'info' => $user->info,
            'professional_info' => $user->professionalInfo,
            'documents' => $user->professionalInfo?->documents,
            'educations' => $user->professionalInfo?->educations,
            'courses' => $user->professionalInfo?->courses,
            'languages' => $user->professionalInfo?->languages,
            'experiences' => $user->professionalInfo?->experiences,
        ]);

    }
    public function indexJson()
    {
        $applicants = User::where('role', 'applicant')
            ->with(['info', 'professionalInfo'])
            ->latest()
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'fullName' => $user->name . ' ' . $user->last_name,
                    'nationalId' => $user->national_code,
                    'phone' => $user->phone,
                    'city' => $user->info?->city ?? '—',
                    'field' => $user->info?->requested_field ?? '—',
                    'status' => $user->professionalInfo?->status ?? 'pending',
                    'interviewDate' => $user->professionalInfo?->interview_date,
                ];
            });

        return response()->json($applicants);
    }

    public function schedule(Request $request, User $user)
    {
        abort_if($user->role !== 'applicant', 404);

        $validated = $request->validate([
            'interview_date' => 'required|string',
            'status' => 'required|string|in:pending,invited,accepted,rejected',
        ]);

        $user->professionalInfo()->updateOrCreate(
            ['user_id' => $user->id],
            [
                'interview_date' => $validated['interview_date'],
                'status' => $validated['status'],
            ]
        );

        return response()->json(['success' => true]);
    }


    public function destroy(User $user)
    {
        abort_if($user->role !== 'applicant', 404);

        $user->delete();

        return response()->json(['success' => true]);
    }

}
