<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ApplicationController extends Controller
{
    public function store(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            // professional_infos
            'father_name' => 'required|string|max:50',
            'birth_place' => 'required|string|max:50',
            'birth_certificate_number' => 'required|string|max:40',
            'birth_certificate_issue_date' => 'required|string|max:20',
            'birth_certificate_issue_place' => 'required|string|max:40',
            'marital_status' => 'required|string|max:10',
            'military_status' => 'required|string|max:20',
            'military_exemption_reason' => 'nullable|string|max:100',
            'work_address' => 'nullable|string|max:100',
            'home_address' => 'required|string|max:100',
            'description' => 'nullable|string|max:1000',

            // documents
            'photo' => 'nullable|file|mimes:jpg,jpeg,png,webp|max:2048',
            'national_card' => 'nullable|file|mimes:jpg,jpeg,png,webp|max:2048',
            'birth_certificate' => 'nullable|file|mimes:jpg,jpeg,png,webp|max:2048',
            'education_certificate' => 'nullable|file|mimes:jpg,jpeg,png,webp|max:2048',
            'resume' => 'nullable|file|mimes:pdf|max:2048',

            // educations
            'education' => 'nullable|array',
            'education.*.degree_title' => 'nullable|string|max:50',
            'education.*.field_of_study' => 'nullable|string|max:50',
            'education.*.institution' => 'nullable|string|max:50',
            'education.*.gpa' => 'nullable|string|max:10',
            'education.*.academic_year' => 'nullable|string|max:20',

            // courses
            'courses' => 'nullable|array',
            'courses.*.certificate_title' => 'nullable|string|max:50',
            'courses.*.training_field' => 'nullable|string|max:50',
            'courses.*.institution' => 'nullable|string|max:50',
            'courses.*.from_date' => 'nullable|string|max:20',
            'courses.*.to_date' => 'nullable|string|max:20',

            // languages
            'languages' => 'nullable|array',
            'languages.*.language' => 'nullable|string|max:50',
            'languages.*.speaking_level' => 'nullable|string|max:20',
            'languages.*.writing_level' => 'nullable|string|max:20',

            // experience
            'experience' => 'nullable|array',
            'experience.*.from_date' => 'nullable|string|max:20',
            'experience.*.to_date' => 'nullable|string|max:20',
            'experience.*.institution' => 'nullable|string|max:50',
            'experience.*.job_title' => 'nullable|string|max:50',
            'experience.*.salary' => 'nullable|string|max:20',
            'experience.*.leave_reason' => 'nullable|string|max:100',
        ]);

        $professionalInfo = $user->professionalInfo()->updateOrCreate(
            ['user_id' => $user->id],
            [
                'father_name' => $validated['father_name'],
                'birth_place' => $validated['birth_place'],
                'birth_certificate_number' => $validated['birth_certificate_number'],
                'birth_certificate_issue_date' => $validated['birth_certificate_issue_date'],
                'birth_certificate_issue_place' => $validated['birth_certificate_issue_place'],
                'marital_status' => $validated['marital_status'],
                'military_status' => $validated['military_status'],
                'military_exemption_reason' => $validated['military_exemption_reason'] ?? null,
                'work_address' => $validated['work_address'] ?? null,
                'home_address' => $validated['home_address'],
                'description' => $validated['description'] ?? null,
            ]
        );

        $types = [
            'photo' => 'photo',
            'national_card' => 'national_card',
            'birth_certificate' => 'birth_certificate',
            'education_certificate' => 'education_certificate',
            'resume' => 'resume',
        ];

        foreach ($types as $inputName => $type) {
            if ($request->hasFile($inputName)) {
                $file = $request->file($inputName);
                $path = $file->store("documents/{$user->id}", 'public');

                $professionalInfo->documents()->updateOrCreate(
                    ['type' => $type],
                    [
                        'file_path' => $path,
                        'original_name' => $file->getClientOriginalName(),
                        'status' => 'pending',
                    ]
                );
            }
        }

        if (!empty($validated['education'])) {
            foreach ($validated['education'] as $edu) {
                // فقط ردیف‌هایی که حداقل یک فیلد پر دارن
                if (!empty(array_filter($edu))) {
                    $professionalInfo->educations()->create($edu);
                }
            }
        }

        if (!empty($validated['courses'])) {
            foreach ($validated['courses'] as $course) {
                if (!empty(array_filter($course))) {
                    $professionalInfo->courses()->create($course);
                }
            }
        }

        if (!empty($validated['languages'])) {
            foreach ($validated['languages'] as $lang) {
                if (!empty(array_filter($lang))) {
                    $professionalInfo->languages()->create($lang);
                }
            }
        }

        if (!empty($validated['experience'])) {
            foreach ($validated['experience'] as $exp) {
                if (!empty(array_filter($exp))) {
                    $professionalInfo->experiences()->create($exp);
                }
            }
        }

        return redirect()->route('dashboard')->with('success', 'اطلاعات با موفقیت ثبت شد.');
    }
}
