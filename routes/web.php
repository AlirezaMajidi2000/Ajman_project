<?php

use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\ApplicationController as AdminApplicationController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('index');
})->name('home');

Route::middleware('guest')->group(function () {
    Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
    Route::post('/register', [AuthController::class, 'register'])->name('register.store');
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login'])->name('login.store');
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [AuthController::class, 'dashboard'])->name('dashboard');
    Route::post('/application', [ApplicationController::class, 'store'])->name('application.store');
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    Route::middleware('role:admin')->group(function () {
        Route::get('/admin/dashboard', [AdminDashboardController::class, 'index'])->name('admin.dashboard');

        // ← این باید قبل از {user} باشه
        Route::get('/admin/applications/json', [AdminApplicationController::class, 'indexJson'])->name('admin.applications.json');

        Route::get('/admin/applications/{user}/json', [AdminApplicationController::class, 'showJson'])->name('admin.applications.showJson');
//        Route::get('/admin/applications/{user}', [AdminApplicationController::class, 'show'])->name('admin.applications.show');
        Route::post('/admin/applications/{user}/schedule', [AdminApplicationController::class, 'schedule'])->name('admin.applications.schedule');
        Route::delete('/admin/applications/{user}', [AdminApplicationController::class, 'destroy'])->name('admin.applications.destroy');
    });
});
