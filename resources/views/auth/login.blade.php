
<!DOCTYPE html>
<html lang="fa-IR" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>ورود به حساب کاربری | آژمان</title>

    <link rel="stylesheet" href="assets/css/login.css">

    <link rel="stylesheet" href="assets/icon/FontAwesome.Pro.6.5.2/css/all.css">

    <link rel="icon" type="image/png" href="assets/images/logo.jpg"/>

</head>

<body class="font_vazir">

    <main class="login_page">

        <section class="login_card">

            <header class="login_header">
                <div class="login_logo"></div>

                <h1 class="login_title">شتابدهنده آژمان</h1>

                <p class="login_subtitle">
                    برای ورود به حساب کاربری خود اطلاعات زیر را وارد کنید.
                </p>
            </header>

            <form class="login_form" id="loginForm" novalidate>

                <div class="login_group">
                    <label for="username">نام کاربری</label>

                    <div class="login_input_box">
                        <i class="fa-regular fa-user"></i>

                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="نام کاربری خود را وارد کنید"
                            autocomplete="username"
                        >
                    </div>

                    <small class="username_msg d-none"></small>
                </div>

                <div class="login_group">
                    <label for="password">رمز عبور</label>

                    <div class="login_input_box">
                        <i class="fa-regular fa-lock"></i>

                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="رمز عبور خود را وارد کنید"
                            autocomplete="current-password"
                        >

                        <button
                            type="button"
                            class="toggle_password"
                            id="togglePassword"
                            aria-label="نمایش رمز عبور"
                        >
                            <i class="fa-regular fa-eye"></i>
                        </button>
                    </div>

                    <small class="password_msg d-none"></small>
                </div>

                <div class="login_message d-none"
                    id="loginMessage"
                    role="alert"></div>

                <button type="submit" class="login_button">
                    <span>ورود به حساب</span>
                    <i class="fa-solid fa-arrow-left"></i>
                </button>

            </form>

            <footer class="login_footer">
                <span>سامانهٔ کارآموزی</span>
                <span class="footer_dot"></span>
                <span>آژمان</span>
            </footer>

        </section>

        <p class="copyright">
            © تمامی حقوق متعلق به شتابدهنده آژمان است.
        </p>

    </main>

    <script src="assets/js/login.js"></script>

</body>
</html>
