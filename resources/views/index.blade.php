<!DOCTYPE html>
<html lang="fa-IR" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>سامانه کارآموزی شرکت آژمان</title>

    <meta
        name="description"
        content="سامانه کارآموزی شرکت آژمان؛ ورود کاربران و ثبت‌نام متقاضیان کارآموزی."
    >

    <meta name="robots" content="index, follow">

    <link rel="stylesheet" href="{{ asset('assets/css/style.css') }}">

    <link
        rel="icon"
        type="image/jpeg"
        href="{{ asset('assets/images/logo.jpg') }}"
    >

    <script src="{{ asset('assets/js/app.js') }}" defer></script>
</head>

<body>
<header class="header font_vazir">
    <nav class="header_box" aria-label="دسترسی کاربران">
        <a href="{{ route('login') }}" class="btn_enter">
            ورود
        </a>

        <a href="{{ route('register') }}" class="btn_start">
            ثبت‌نام
        </a>
    </nav>
</header>
</body>
</html>
