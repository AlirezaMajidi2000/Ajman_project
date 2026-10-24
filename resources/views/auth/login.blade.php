<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>ورود</title>
</head>
<body>
<h1>ورود</h1>

@if($errors->any())
    <ul style="color: red;">
        @foreach($errors->all() as $error)
            <li>{{ $error }}</li>
        @endforeach
    </ul>
@endif

<form action="{{ route('login.store') }}" method="POST">
    @csrf

    <div>
        <label>ایمیل</label>
        <input type="email" name="email" value="{{ old('email') }}" required>
    </div>

    <div>
        <label>رمز عبور</label>
        <input type="password" name="password" required>
    </div>

    <div>
        <input type="checkbox" name="remember" id="remember">
        <label for="remember">مرا به خاطر بسپار</label>
    </div>

    <button type="submit">ورود</button>
</form>

<p>حساب نداری؟ <a href="{{ route('register') }}">ثبت‌نام</a></p>
</body>
</html>
