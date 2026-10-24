<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>داشبورد ادمین</title>
</head>
<body>
<h1>داشبورد ادمین</h1>
<p>سلام <strong>{{ auth()->user()->name }}</strong></p>
<p>این صفحه فقط برای ادمین‌هاست.</p>

<form action="{{ route('logout') }}" method="POST">
    @csrf
    <button type="submit">خروج</button>
</form>
</body>
</html>
