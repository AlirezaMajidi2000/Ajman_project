<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function showRegister()
    {
        return view('auth.register');
    }

    public function register(Request $request)
    {
        $validated = $request->validate([
            // users
            'name' => 'required|string|max:50',
            'last_name' => 'required|string|max:50',
            'national_code' => 'required|string|size:10|unique:users,national_code',
            'phone' => 'required|string|size:11|unique:users,phone',
            'username' => 'required|string|max:255|unique:users,username|alpha_dash',
            'password' => 'required|string|min:6|confirmed',

            // user_infos
            'birth_date' => 'required|string|max:10',
            'province' => 'required|string',
            'city' => 'required|string',
            'education_status' => 'required|string',
            'field_of_study' => 'required|string|max:50',
            'requested_field' => 'required|string',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'last_name' => $validated['last_name'],
            'national_code' => $validated['national_code'],
            'phone' => $validated['phone'],
            'username' => $validated['username'],
            'password' => $validated['password'],
            'role' => 'applicant',
        ]);

        $user->info()->create([
            'birth_date' => $validated['birth_date'],
            'province' => $validated['province'],
            'city' => $validated['city'],
            'education_status' => $validated['education_status'],
            'field_of_study' => $validated['field_of_study'],
            'requested_field' => $validated['requested_field'],
        ]);

        Auth::login($user);

        return redirect()->route('dashboard');
    }

    public function showLogin()
    {
        return view('auth.login');
    }

    public function dashboard()
    {
        return view('dashboard');
    }

    public function adminDashboard()
    {
        if (Auth::user()->role !== 'admin') {
            abort(403, 'دسترسی غیرمجاز');
        }

        return view('admin.dashboard');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'username' => ['required', 'string'],
            'password' => ['required', 'string'],
        ]);

        if (Auth::attempt($credentials, $request->boolean('remember'))) {
            $request->session()->regenerate();

            if (Auth::user()->role === 'admin') {
                return redirect()->route('admin.dashboard');
            }

            return redirect()->route('dashboard');
        }

        return back()->withErrors([
            'username' => 'نام کاربری یا رمز عبور اشتباه است.',
        ])->onlyInput('username');
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login');
    }
}
