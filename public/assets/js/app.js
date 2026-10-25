
"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector(".header");
    const btnStart = document.querySelector(".btn_start");
    const btnEnter = document.querySelector(".btn_enter");

    // اگر عناصر صفحه وجود نداشتند، اجرای کد متوقف شود.
    if (!header || !btnStart || !btnEnter) {
        return;
    }

    // هدایت کاربر به صفحه ثبت‌نام
    btnStart.addEventListener("click", function (event) {
        event.preventDefault();

        header.classList.add("hide");

        setTimeout(function () {
            window.location.href = btnStart.href;
        }, 700);
    });

    // هدایت کاربر به صفحه ورود
    btnEnter.addEventListener("click", function (event) {
        event.preventDefault();

        header.classList.add("hide");

        setTimeout(function () {
            window.location.href = btnEnter.href;
        }, 700);
    });
});
