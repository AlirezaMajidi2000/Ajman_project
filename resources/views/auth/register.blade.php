<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>ثبت‌نام</title>
</head>
<body>
<h1>ثبت‌نام</h1>

@if($errors->any())
    <ul style="color: red;">
        @foreach($errors->all() as $error)
            <li>{{ $error }}</li>
        @endforeach
    </ul>
@endif

<form action="{{ route('register.store') }}" method="POST">
    @csrf

    <div>
        <label>نام و نام خانوادگی</label>
        <input type="text" name="name" value="{{ old('name') }}" required>
    </div>

    <div>
        <label>ایمیل</label>
        <input type="email" name="email" value="{{ old('email') }}" required>
    </div>

    <div>
        <label>رمز عبور</label>
        <input type="password" name="password" required>
    </div>

    <div>
        <label>تکرار رمز عبور</label>
        <input type="password" name="password_confirmation" required>
    </div>

    <button type="submit">ثبت‌نام</button>
</form>

<p>قبلاً ثبت‌نام کردی؟ <a href="{{ route('login') }}">ورود</a></p>
</body>
</html>
