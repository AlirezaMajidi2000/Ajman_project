let loginForm = document.getElementById("loginForm");

let usernameInput = document.getElementById("username");
let passwordInput = document.getElementById("password");


let usernameMsg = document.querySelector(".username_msg");
let passwordMsg = document.querySelector(".password_msg");

let loginMessage = document.getElementById("loginMessage");
let togglePassword = document.getElementById("togglePassword");

let nameRegex = /^[A-Za-z0-9._]{3,30}$/;
let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/;


// نمایش یا مخفی کردن رمز عبور
togglePassword.addEventListener("click", function () {
    let isPassword = passwordInput.type === "password";

    passwordInput.type = isPassword ? "text" : "password";

    this.innerHTML = isPassword
        ? '<i class="fa-regular fa-eye-slash"></i>'
        : '<i class="fa-regular fa-eye"></i>';

    this.setAttribute(
        "aria-label",
        isPassword ? "مخفی کردن رمز عبور" : "نمایش رمز عبور"
    );
});


// نمایش خطای یک فیلد
function showFieldError(element, message) {
    element.textContent = message;
    element.classList.remove("d-none", "text-green");
    element.classList.add("d-block", "text-red");
}


// نمایش موفقیت یک فیلد
function showFieldSuccess(element) {
    element.textContent = "موفق: ورودی مجاز است.";
    element.classList.remove("d-none", "text-red");
    element.classList.add("d-block", "text-green");
}


// پاک کردن پیام یک فیلد
function clearFieldError(element) {
    element.textContent = "";
    element.classList.add("d-none");
    element.classList.remove("d-block", "text-red", "text-green");
}


// پاک کردن پیام کلی
function clearLoginMessage() {
    loginMessage.textContent = "";
    loginMessage.classList.add("d-none");
    loginMessage.classList.remove("error", "success");
}


// اعتبارسنجی نام کاربری
function validateUsername() {
    let username = usernameInput.value.trim();

    if (username === "") {
        showFieldError(usernameMsg, "نام کاربری را وارد کنید.");
        return false;
    }

    if (!nameRegex.test(username)) {
        showFieldError(
            usernameMsg,
            "نام کاربری باید ۳ تا ۳۰ کاراکتر و شامل حروف انگلیسی، اعداد، نقطه یا زیرخط باشد."
        );
        return false;
    }

    showFieldSuccess(usernameMsg);
    return true;
}


// اعتبارسنجی رمز عبور
function validatePassword() {
    let password = passwordInput.value;

    if (password.trim() === "") {
        showFieldError(passwordMsg, "رمز عبور را وارد کنید.");
        return false;
    }

    if (!passwordRegex.test(password)) {
        showFieldError(
            passwordMsg,
            "رمز عبور باید حداقل ۸ کاراکتر و شامل حرف کوچک، حرف بزرگ، عدد و کاراکتر خاص باشد."
        );
        return false;
    }

    showFieldSuccess(passwordMsg);
    return true;
}


// اعتبارسنجی هنگام تایپ نام کاربری
usernameInput.addEventListener("input", function () {
    validateUsername();
    clearLoginMessage();
});


// اعتبارسنجی هنگام تایپ رمز عبور
passwordInput.addEventListener("input", function () {
    validatePassword();
    clearLoginMessage();
});


// اعتبارسنجی هنگام ارسال فرم
loginForm.addEventListener("submit", function (event) {
    // event.preventDefault();

    clearLoginMessage();

    let isUsernameValid = validateUsername();
    let isPasswordValid = validatePassword();

    if (!isUsernameValid || !isPasswordValid) {
        return;
    }

    // ورود آزمایشی
    loginMessage.textContent = "ورود موفق بود؛ در حال انتقال...";
    loginMessage.classList.remove("d-none", "error");
    loginMessage.classList.add("success");

    setTimeout(function () {
        window.location.href = "formA01.html";
    }, 700);
});
