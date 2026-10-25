<!DOCTYPE html>
<html lang="fa-IR" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>فرم ثبت‌نام اولیه | آژمان</title>
    <meta name="description" content="فرم ثبت‌نام اولیه کارآموزی شرکت آژمان. اطلاعات خود را برای درخواست کارآموزی تکمیل کنید.">

    <link rel="stylesheet" href="{{ asset('assets/css/formA01style.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/icon/FontAwesome.Pro.6.5.2/css/all.css') }}">
    <link rel="icon" href="{{ asset('assets/images/logo.jpg') }}" type="image/jpeg">
</head>

<body class="font_vazir">

<header class="register_title_box">
    <h1 class="register_title">فرم ثبت‌نام اولیه</h1>
</header>

<main>
    <form action="{{ route('register.store') }}" method="POST" accept-charset="UTF-8">
        @csrf

        <div class="items_box">

            <!-- اطلاعات شخصی -->
            <div class="personal_box">

                <div class="personal_box_left">
                    <table class="personal_table">
                        <tbody>
                        <tr>
                            <td>
                                <div class="input_group">
                                    <label for="firstName">نام</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="name"
                                        value="{{ old('first_name') }}"
                                        placeholder="نام خود را وارد کنید"
                                        class="username"
                                        required
                                        maxlength="50"
                                        autocomplete="given-name"
                                    >
                                    <small class="name_msg d-none"></small>
                                </div>
                            </td>

                            <td>
                                <div class="input_group2">
                                    <div class="label_box">
                                        <label class="userlastnamelabel" for="lastName">
                                            نام خانوادگی
                                        </label>
                                    </div>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="last_name"
                                        value="{{ old('last_name') }}"
                                        placeholder="نام خانوادگی خود را وارد کنید"
                                        class="userlastname"
                                        required
                                        maxlength="50"
                                        autocomplete="family-name"
                                    >
                                    <small class="lastname_msg d-none"></small>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div class="personal_box_right">
                    <table class="personal_table">
                        <tbody>
                        <tr>
                            <td>
                                <div class="input_group">
                                    <label for="nationalCode">کد ملی</label>
                                    <input
                                        type="text"
                                        id="nationalCode"
                                        name="national_code"
                                        value="{{ old('national_code') }}"
                                        placeholder="کد ملی خود را وارد کنید"
                                        class="userid"
                                        inputmode="numeric"
                                        maxlength="10"
                                        autocomplete="off"
                                        required
                                    >
                                    <small class="id_msg d-none"></small>

                                    <div id="nationalCodeLocation" class="d-none">
                                        <p id="nationalCodeLocationText"></p>
                                    </div>
                                </div>
                            </td>

                            <td>
                                <div class="input_group2">
                                    <div class="label_box">
                                        <label for="userPhone" class="userphonelabel">
                                            شماره تماس
                                        </label>
                                    </div>
                                    <input
                                        type="text"
                                        id="userPhone"
                                        name="phone"
                                        value="{{ old('phone') }}"
                                        placeholder="09000000000"
                                        class="userphone"
                                        inputmode="numeric"
                                        maxlength="11"
                                        autocomplete="tel"
                                        required
                                    >
                                    <small class="phone_msg d-none"></small>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

            </div>

            <!-- تاریخ تولد و استان و شهرستان -->
            <div class="midle_box">

                <div class="date-picker" id="datePicker">
                    <label for="birthDate">تاریخ تولد</label>

                    <div class="date-input">
                        <input
                            type="text"
                            id="birthDate"
                            name="birth_date"
                            value="{{ old('birth_date') }}"
                            placeholder="انتخاب تاریخ تولد"
                            autocomplete="bday"
                            required
                            maxlength="10"
                        >

                        <button
                            type="button"
                            id="calendarBtn"
                            aria-label="باز کردن تقویم"
                            aria-controls="calendar"
                        >
                            <i class="fa-thin fa-calendar-days" aria-hidden="true"></i>
                        </button>
                    </div>

                    <div class="calendar" id="calendar">
                        <div class="calendar-header">
                            <button type="button" id="prevMonth" aria-label="ماه قبل">
                                <i class="fa-regular fa-circle-chevron-right" aria-hidden="true"></i>
                            </button>

                            <button
                                type="button"
                                id="monthYear"
                                class="month-year-btn"
                                aria-label="انتخاب ماه و سال"
                            ></button>

                            <button type="button" id="nextMonth" aria-label="ماه بعد">
                                <i class="fa-regular fa-circle-chevron-left" aria-hidden="true"></i>
                            </button>
                        </div>

                        <div class="calendar-grid" id="calendarGrid"></div>
                    </div>
                </div>

                <div class="location_section" dir="rtl">
                    <table class="location_table2">
                        <tbody>
                        <tr>
                            <td>
                                <div class="location_fields">
                                    <div class="form_group">
                                        <label for="province">استان</label>

                                        <select id="province" name="province" required>
                                            <option value="">
                                                در حال بارگذاری استان‌ها...
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </td>

                            <td>
                                <div class="location_fields">
                                    <div class="form_group">
                                        <label for="city">شهرستان</label>

                                        <select id="city" name="city" required disabled>
                                            <option value="">
                                                ابتدا استان را انتخاب کنید
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

            </div>

            <!-- وضعیت تحصیلی و رشته -->
            <div class="items_box2">

                <div class="items_box4">
                    <table class="education_table">
                        <tbody>
                        <tr>
                            <td>
                                <div class="form_group2">
                                    <label for="education_status">وضعیت تحصیلی</label>

                                    <select
                                        id="education_status"
                                        name="education_status"
                                        class="education_status"
                                        required
                                    >
                                        <option value="">وضعیت تحصیلی را انتخاب کنید</option>
                                        <option value="bachelor_student" {{ old('education_status') == 'bachelor_student' ? 'selected' : '' }}>دانشجوی کارشناسی</option>
                                        <option value="bachelor_graduate" {{ old('education_status') == 'bachelor_graduate' ? 'selected' : '' }}>فارغ‌التحصیل کارشناسی</option>
                                        <option value="master_student" {{ old('education_status') == 'master_student' ? 'selected' : '' }}>دانشجوی ارشد</option>
                                        <option value="master_graduate" {{ old('education_status') == 'master_graduate' ? 'selected' : '' }}>فارغ‌التحصیل ارشد</option>
                                        <option value="phd_student" {{ old('education_status') == 'phd_student' ? 'selected' : '' }}>دانشجوی دکترا</option>
                                        <option value="phd_graduate" {{ old('education_status') == 'phd_graduate' ? 'selected' : '' }}>فارغ‌التحصیل دکترا</option>
                                    </select>
                                </div>
                            </td>

                            <td>
                                <div class="form_group2">
                                    <label for="userFieldOfStudy">رشته تحصیلی</label>

                                    <input
                                        type="text"
                                        id="userFieldOfStudy"
                                        name="field_of_study"
                                        value="{{ old('field_of_study') }}"
                                        placeholder="رشته تحصیلی"
                                        class="userfieldofstudy"
                                        required
                                        maxlength="50"
                                    >

                                    <small class="fieldofstudy_msg d-none"></small>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <!-- حوزه مورد درخواست -->
                <div>
                    <div class="form_group3">
                        <label for="requested_field">حوزه مورد درخواست</label>

                        <select id="requested_field" name="requested_field" required>
                            <option value="">حوزه مورد درخواست را انتخاب کنید</option>
                            <option value="administrative" {{ old('requested_field') == 'administrative' ? 'selected' : '' }}>امور اداری و دفتری</option>
                            <option value="ideation" {{ old('requested_field') == 'ideation' ? 'selected' : '' }}>ایده‌پردازی و خلاقیت</option>
                            <option value="graphic_designer" {{ old('requested_field') == 'graphic_designer' ? 'selected' : '' }}>طراح گرافیک</option>
                            <option value="programmer" {{ old('requested_field') == 'programmer' ? 'selected' : '' }}>برنامه‌نویس</option>
                        </select>

                        <small class="name_msg d-none"></small>
                    </div>
                </div>

            </div>

            <!-- نام کاربری و رمز عبور -->
            <div class="login_fields_box" dir="rtl">

                <div class="login_field_group">
                    <label for="login_username">نام کاربری</label>

                    <div class="login_input_wrapper">
                        <i class="fa-regular fa-user login_field_icon" aria-hidden="true"></i>

                        <input
                            type="text"
                            id="login_username"
                            name="username"
                            value="{{ old('username') }}"
                            placeholder="نام کاربری خود را وارد کنید"
                            autocomplete="username"
                            required
                        >
                    </div>

                    <small class="username_msg d-none"></small>
                </div>

                <div class="login_field_group">
                    <label for="login_password">رمز عبور</label>

                    <div class="login_input_wrapper">
                        <i class="fa-regular fa-lock login_field_icon" aria-hidden="true"></i>

                        <input
                            type="password"
                            id="login_password"
                            name="password"
                            placeholder="رمز عبور خود را وارد کنید"
                            autocomplete="new-password"
                            required
                        >

                        <button
                            type="button"
                            class="login_password_toggle"
                            id="loginPasswordToggle"
                            aria-label="نمایش رمز عبور"
                            aria-controls="login_password"
                        >
                            <i class="fa-regular fa-eye" aria-hidden="true"></i>
                        </button>
                    </div>

                    <small class="password_msg d-none"></small>
                </div>

                {{-- تکرار رمز عبور (برای confirmed) --}}
                <div class="login_field_group">
                    <label for="login_password_confirmation">تکرار رمز عبور</label>

                    <div class="login_input_wrapper">
                        <i class="fa-regular fa-lock login_field_icon" aria-hidden="true"></i>

                        <input
                            type="password"
                            id="login_password_confirmation"
                            name="password_confirmation"
                            placeholder="تکرار رمز عبور"
                            autocomplete="new-password"
                            required
                        >
                    </div>
                </div>

            </div>

        </div>

        {{-- نمایش خطاها --}}
        @if($errors->any())
            <div style="color: red; margin: 1rem 0;">
                <ul>
                    @foreach($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <div class="btn_box">
            <button type="submit" class="btn_submit">ارسال</button>
        </div>

    </form>
</main>

<script src="{{ asset('assets/js/formA01.js') }}" defer></script>

</body>
</html>
