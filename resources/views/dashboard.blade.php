<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>داشبورد</title>
</head>
<body>
<h1>داشبورد</h1>
<p>سلام <strong>{{ auth()->user()->name }}</strong></p>
<p>نقش: {{ auth()->user()->role }}</p>

<form action="{{ route('logout') }}" method="POST">
    @csrf
    <button type="submit">خروج</button>
</form>
</body>
</html>
