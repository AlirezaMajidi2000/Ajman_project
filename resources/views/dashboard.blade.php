<!doctype html>
<html lang="fa-ir" dir="rtl">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>پنل کاربری | آژمان</title>

    <link rel="stylesheet" href="{{ asset('assets/css/forma02style.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/icon/fontawesome.pro.6.5.2/css/all.css') }}">
    <link rel="icon" type="image/png" href="{{ asset('assets/images/logo.jpg') }}"/>
</head>

<header class="font_vazir">
    <div class="my_container">
        <div class="title_box">
            <div class="site-header">

                <div class="header-top">

                    <a href="{{ route('dashboard') }}" class="brand">
                        <span class="brand-logo"></span>
                        <span class="brand-info"></span>
                    </a>

                    <div class="header-actions">

                        <div class="date_box">
                            <label for="application_date">تاریخ:</label>
                            <span id="application_date"></span>
                        </div>

                        <button
                                type="button"
                                class="header-icon-btn"
                                id="searchtoggle"
                                aria-label="باز کردن جست‌وجو"
                                aria-expanded="false"
                                aria-controls="searchbox"
                        >
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </button>

                        <button
                                type="button"
                                class="header-icon-btn notification-btn"
                                id="notificationbtn"
                                aria-label="اعلان جدید"
                                title="اعلان‌ها"
                        >
                            <i class="fa-regular fa-bell"></i>
                            <span class="notification-dot" id="notificationdot" aria-hidden="true"></span>
                        </button>

                        <div class="profile-container" id="profilecontainer">

                            <button
                                    type="button"
                                    class="profile-trigger"
                                    id="profiletrigger"
                                    aria-expanded="false"
                                    aria-controls="profilemenu"
                            >
                                <span class="profile-avatar">
                                    <i class="fa-regular fa-user"></i>
                                </span>

                                <span class="profile-name">{{ auth()->user()->username }}</span>

                                <i class="fa-solid fa-chevron-down profile-chevron"></i>
                            </button>

                            <div class="profile-menu" id="profilemenu" hidden>
                                <div class="profile-menu-header">
                                    <span class="profile-menu-avatar">
                                        <i class="fa-regular fa-user"></i>
                                    </span>

                                    <div class="profile-menu-user">
                                        <strong>{{ auth()->user()->username }}</strong>
                                        <span>{{ auth()->user()->role === 'admin' ? 'مدیر' : 'کارآموز' }}</span>
                                    </div>
                                </div>

                                <div class="profile-menu-divider"></div>

                                <a href="#" class="profile-menu-item">
                                    <i class="fa-regular fa-user"></i>
                                    <span>پروفایل من</span>
                                    <i class="fa-solid fa-chevron-left item-arrow"></i>
                                </a>

                                <a href="#" class="profile-menu-item">
                                    <i class="fa-solid fa-gear"></i>
                                    <span>تنظیمات حساب</span>
                                    <i class="fa-solid fa-chevron-left item-arrow"></i>
                                </a>

                                <div class="profile-menu-divider"></div>

                                <form action="{{ route('logout') }}" method="post">
                                    @csrf
                                    <button type="submit" class="profile-menu-item logout-item">
                                        <i class="fa-solid fa-right-from-bracket"></i>
                                        <span>خروج از حساب</span>
                                    </button>
                                </form>
                            </div>

                        </div>

                        <button
                                type="button"
                                class="mobile-menu-toggle"
                                id="mobilemenutoggle"
                                aria-label="باز کردن منوی سایت"
                                aria-expanded="false"
                                aria-controls="mainnav"
                        >
                            <i class="fa-solid fa-bars"></i>
                        </button>

                    </div>
                </div>

                <div class="search-box" id="searchbox" hidden>
                    <form class="search-form" id="searchform">
                        <i class="fa-solid fa-magnifying-glass"></i>
                        <input
                                type="search"
                                id="searchinput"
                                placeholder="چه چیزی جست‌وجو می‌کنید؟"
                                aria-label="عبارت جست‌وجو"
                        >
                        <button type="submit">جست‌وجو</button>
                    </form>
                </div>

                <nav class="main-nav" id="mainnav" aria-label="منوی اصلی">
                    <a href="{{ route('dashboard') }}" class="nav-link active">خانه</a>
                    <a href="#not_interview_card" class="nav-link btn_notcard">زمان مصاحبه</a>
                    <a href="#forma02" class="nav-link btn_registration">فرم جذب نیروی کارآموز</a>
                    <a href="#" class="nav-link">خدمات</a>
                    <a href="#" class="nav-link">درباره ما</a>
                    <a href="#" class="nav-link">تماس با ما</a>
                </nav>

            </div>
        </div>
    </div>
</header>

<body class="font_vazir">
<div class="my_container">

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

    @if(session('success'))
        <div style="color: green; margin: 1rem 0;">{{ session('success') }}</div>
    @endif

    <!-- start forma02 -->
    <div id="forma02" class="d-none">
        <div class="page_title">
            <h1>فرم جذب نیروی کارآموز</h1>
            <p>لطفاً اطلاعات خود را با دقت تکمیل کنید.</p>
        </div>

        <form id="application_form" action="{{ route('application.store') }}" method="post" enctype="multipart/form-data">
            @csrf

            <!-- مشخصات متقاضی -->
            <section class="form_section">
                <div class="line_box">
                    <span>مشخصات متقاضی</span>
                </div>

                <div class="table_wrapper">
                    <table class="profile_table">
                        <tbody>
                        <tr>
                            <th><label for="app_name">نام</label></th>
                            <td>
                                <input type="text" id="app_name" name="first_name"
                                       value="{{ old('first_name') }}"
                                       placeholder="نام" class="name" maxlength="50" required>
                                <small class="name_msg d-none"></small>
                            </td>

                            <th><label for="app_lastname">نام خانوادگی</label></th>
                            <td>
                                <input type="text" id="app_lastname" name="last_name"
                                       value="{{ old('last_name') }}"
                                       placeholder="نام خانوادگی" class="lastname" maxlength="50" required>
                                <small class="lastname_msg d-none"></small>
                            </td>
                        </tr>

                        <tr>
                            <th><label for="app_fathername">نام پدر</label></th>
                            <td>
                                <input type="text" id="app_fathername" name="father_name"
                                       value="{{ old('father_name') }}"
                                       placeholder="نام پدر" class="fathername" maxlength="50" required>
                                <small class="fathername_msg d-none"></small>
                            </td>

                            <th><label for="app_birthdate">تاریخ تولد</label></th>
                            <td>
                                <input type="text" id="app_birthdate" name="birth_date"
                                       value="{{ old('birth_date') }}"
                                       placeholder="تاریخ تولد" class="birthdate" maxlength="10" required>
                                <small class="birthdate_msg d-none"></small>
                            </td>
                        </tr>

                        <tr>
                            <th><label for="app_birthplace">محل تولد</label></th>
                            <td>
                                <input type="text" id="app_birthplace" name="birth_place"
                                       value="{{ old('birth_place') }}"
                                       placeholder="محل تولد" class="birthplace" maxlength="50" required>
                                <small class="birthplace_msg d-none"></small>
                            </td>

                            <th><label for="app_certificate_no">شماره شناسنامه</label></th>
                            <td>
                                <input type="text" id="app_certificate_no" name="birth_certificate_number"
                                       value="{{ old('birth_certificate_number') }}"
                                       placeholder="شماره شناسنامه"
                                       class="birthcertificatenumber" maxlength="40" required>
                                <small class="birthcertificatenumber_msg d-none"></small>
                            </td>
                        </tr>

                        <tr>
                            <th><label for="app_national_id">کد ملی</label></th>
                            <td>
                                <input type="text" id="app_national_id" name="national_code"
                                       value="{{ old('national_code') }}"
                                       placeholder="کد ملی" class="id nationalcode" maxlength="10" required>
                                <small class="id_msg d-none"></small>
                            </td>

                            <th><label for="app_certificate_date">تاریخ صدور شناسنامه</label></th>
                            <td>
                                <input type="text" id="app_certificate_date" name="birth_certificate_issue_date"
                                       value="{{ old('birth_certificate_issue_date') }}"
                                       placeholder="تاریخ صدور شناسنامه"
                                       class="birthcertificatedate" required maxlength="20">
                                <small class="birthcertificatedate_msg d-none"></small>
                            </td>
                        </tr>

                        <tr>
                            <th><label for="app_certificate_place">محل صدور شناسنامه</label></th>
                            <td>
                                <input type="text" id="app_certificate_place" name="birth_certificate_issue_place"
                                       value="{{ old('birth_certificate_issue_place') }}"
                                       placeholder="محل صدور شناسنامه"
                                       class="birthcertificate" required maxlength="40">
                                <small class="birthcertificate_msg d-none"></small>
                            </td>

                            <th><label for="app_marital">وضعیت تأهل</label></th>
                            <td>
                                <input type="text" id="app_marital" name="marital_status"
                                       value="{{ old('marital_status') }}"
                                       placeholder="وضعیت تأهل" class="maritalstatus" maxlength="10" required>
                                <small class="maritalstatus_msg d-none"></small>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <!-- وضعیت سربازی -->
            <section class="form_section">
                <div class="line_box">
                    <span>وضعیت خدمت سربازی</span>
                </div>

                <div class="table_wrapper">
                    <table class="service_table">
                        <tbody>
                        <tr>
                            <th>وضعیت خدمت</th>
                            <td>
                                <div class="radio_group">
                                    <label>
                                        <input type="radio" name="military_status" value="مشمول" {{ old('military_status') == 'مشمول' ? 'checked' : '' }} required>
                                        مشمول
                                    </label>
                                    <label>
                                        <input type="radio" name="military_status" value="معاف موقت" {{ old('military_status') == 'معاف موقت' ? 'checked' : '' }}>
                                        معاف موقت
                                    </label>
                                    <label>
                                        <input type="radio" name="military_status" value="معاف دائم" {{ old('military_status') == 'معاف دائم' ? 'checked' : '' }}>
                                        معاف دائم
                                    </label>
                                    <label>
                                        <input type="radio" name="military_status" value="انجام شده" {{ old('military_status') == 'انجام شده' ? 'checked' : '' }}>
                                        انجام شده
                                    </label>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div class="table_wrapper">
                    <table class="contact_table">
                        <tbody>
                        <tr>
                            <th><label for="app_military">علت معافیت</label></th>
                            <td>
                                <input type="text" id="app_military" name="military_exemption_reason"
                                       value="{{ old('military_exemption_reason') }}"
                                       placeholder="علت معافیت" class="military" maxlength="100">
                                <small class="military_msg d-none"></small>
                            </td>

                            <th><label for="app_workplace">آدرس محل کار</label></th>
                            <td>
                                <input type="text" id="app_workplace" name="work_address"
                                       value="{{ old('work_address') }}"
                                       placeholder="آدرس محل کار" class="workplace" maxlength="100">
                                <small class="workplace_msg d-none"></small>
                            </td>
                        </tr>

                        <tr>
                            <th><label for="app_home">آدرس منزل</label></th>
                            <td>
                                <input type="text" id="app_home" name="home_address"
                                       value="{{ old('home_address') }}"
                                       placeholder="آدرس منزل" class="home" required maxlength="100">
                                <small class="home_msg d-none"></small>
                            </td>

                            <th><label for="app_phone">تلفن همراه</label></th>
                            <td>
                                <input type="text" id="app_phone" name="phone"
                                       value="{{ old('phone') }}"
                                       placeholder="تلفن همراه" class="phone" maxlength="11" required>
                                <small class="phone_msg d-none"></small>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <!-- سوابق تحصیلی -->
            <section class="form_section">
                <div class="line_box">
                    <span>سوابق تحصیلی <small>(از آخرین مدرک شروع شود)</small></span>
                </div>

                <div class="table_wrapper">
                    <table class="education_box" data-dynamic-table="education">
                        <thead>
                        <tr class="education_title_box">
                            <th>ردیف</th>
                            <th>عنوان مدرک تحصیلی</th>
                            <th>رشته تحصیلی</th>
                            <th>نام محل تحصیل</th>
                            <th>معدل</th>
                            <th>سال تحصیلی</th>
                        </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </section>

            <!-- دوره های تخصصی -->
            <section class="form_section">
                <div class="line_box">
                    <span>دوره‌های آموزشی تخصصی</span>
                </div>

                <div class="table_wrapper">
                    <table class="education_box" data-dynamic-table="courses">
                        <thead>
                        <tr class="education_title_box">
                            <th>ردیف</th>
                            <th>عنوان گواهینامه</th>
                            <th>رشته آموزشی</th>
                            <th>نام مؤسسه آموزشی</th>
                            <th>از تاریخ</th>
                            <th>تا تاریخ</th>
                        </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </section>

            <!-- زبان های خارجی -->
            <section class="form_section">
                <div class="line_box">
                    <span>آشنایی با زبان‌های خارجی</span>
                </div>

                <div class="table_wrapper">
                    <table class="education_box language_table" data-dynamic-table="languages">
                        <thead>
                        <tr class="education_title_box">
                            <th>ردیف</th>
                            <th>زبان</th>
                            <th>گفت‌وگو و شنیدار</th>
                            <th>خواندن و نوشتن</th>
                        </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </section>

            <!-- تجربه و سابقه -->
            <section class="form_section">
                <div class="line_box">
                    <span>تجربه و سابقه <small>(از آخرین سابقه شروع شود)</small></span>
                </div>

                <div class="table_wrapper">
                    <table class="education_box experience_table" data-dynamic-table="experience">
                        <thead>
                        <tr class="education_title_box">
                            <th>ردیف</th>
                            <th>از تاریخ</th>
                            <th>تا تاریخ</th>
                            <th>نام مؤسسه</th>
                            <th>عنوان شغلی</th>
                            <th>جمع کل حقوق و مزایا</th>
                            <th>دلیل پایان خدمت</th>
                        </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </section>

            <!-- توضیحات -->
            <section class="form_section">
                <div class="line_box">
                    <span>توضیحات</span>
                </div>

                <div class="description_box">
                    <label for="description">توضیحات تکمیلی (اختیاری)</label>
                    <textarea name="description" id="description" class="description"
                              rows="5" placeholder="اگر توضیحی دارید، اینجا بنویسید..." maxlength="1000">{{ old('description') }}</textarea>
                    <small class="description_msg"></small>
                </div>
            </section>

            <!-- آپلود عکس -->
            <section class="upload_items_box">
                <div class="upload_form_section">
                    <div class="line_box">
                        <span>عکس پرسنلی</span>
                    </div>

                    <div class="upload_box">
                        <input type="file" id="user_image" name="photo" class="user_image"
                               accept="image/jpeg,image/png,image/webp">

                        <label for="user_image" class="upload_label">
                                <span class="upload_icon">
                                    <i class="fa-solid fa-camera"></i>
                                </span>
                            <span class="upload_title">عکس پرسنلی خود را انتخاب کنید</span>
                            <span class="upload_hint">فرمت مجاز: jpg، png و webp</span>
                            <span class="upload_button">انتخاب عکس</span>
                        </label>

                        <span class="file_name">هنوز عکسی انتخاب نشده است</span>
                    </div>
                </div>

                <div class="upload_form_section">
                    <div class="line_box">
                        <span>عکس کارت ملی</span>
                    </div>

                    <div class="upload_box">
                        <input type="file" id="user_image_id" name="national_card" class="user_image"
                               accept="image/jpeg,image/png,image/webp">

                        <label for="user_image_id" class="upload_label">
                                <span class="upload_icon">
                                    <i class="fa-solid fa-camera"></i>
                                </span>
                            <span class="upload_title">عکس کارت ملی خود را انتخاب کنید</span>
                            <span class="upload_hint">فرمت مجاز: jpg، png و webp</span>
                            <span class="upload_button">انتخاب عکس</span>
                        </label>

                        <span class="file_name">هنوز عکسی انتخاب نشده است</span>
                    </div>
                </div>

                <div class="upload_form_section">
                    <div class="line_box">
                        <span>عکس شناسنامه</span>
                    </div>

                    <div class="upload_box">
                        <input type="file" id="user_image_certificate" name="birth_certificate" class="user_image"
                               accept="image/jpeg,image/png,image/webp">

                        <label for="user_image_certificate" class="upload_label">
                                <span class="upload_icon">
                                    <i class="fa-solid fa-camera"></i>
                                </span>
                            <span class="upload_title">عکس شناسنامه خود را انتخاب کنید</span>
                            <span class="upload_hint">فرمت مجاز: jpg، png و webp</span>
                            <span class="upload_button">انتخاب عکس</span>
                        </label>

                        <span class="file_name">هنوز عکسی انتخاب نشده است</span>
                    </div>
                </div>

                <div class="upload_form_section">
                    <div class="line_box">
                        <span>عکس مدرک تحصیلی</span>
                    </div>

                    <div class="upload_box">
                        <input type="file" id="user_image_edu" name="education_certificate" class="user_image"
                               accept="image/jpeg,image/png,image/webp">

                        <label for="user_image_edu" class="upload_label">
                                <span class="upload_icon">
                                    <i class="fa-solid fa-camera"></i>
                                </span>
                            <span class="upload_title">عکس مدرک تحصیلی خود را انتخاب کنید</span>
                            <span class="upload_hint">فرمت مجاز: jpg، png و webp</span>
                            <span class="upload_button">انتخاب عکس</span>
                        </label>

                        <span class="file_name">هنوز عکسی انتخاب نشده است</span>
                    </div>
                </div>

                <div class="upload_form_section">
                    <div class="line_box">
                        <span>فایل رزومه</span>
                    </div>

                    <div class="upload_box">
                        <input type="file" id="user_file" name="resume" class="user_image"
                               accept=".pdf,application/pdf">

                        <label for="user_file" class="upload_label">
                                <span class="upload_icon">
                                    <i class="fa-regular fa-file"></i>
                                </span>
                            <span class="upload_title">رزومه خود را انتخاب کنید</span>
                            <span class="upload_hint">فرمت مجاز: pdf</span>
                            <span class="upload_button">انتخاب فایل</span>
                        </label>

                        <span class="file_name">هنوز فایلی انتخاب نشده است</span>
                    </div>
                </div>
            </section>

            <div class="form_footer">
                <button type="submit" class="submit_button">ثبت اطلاعات</button>
            </div>

        </form>
    </div>
    <!-- end forma02 -->

    <!-- کارتی که هنوز زمان مصاحبه تعیین نشده -->
    <section class="interview-card pending-interview d-none" id="not_interview_card">
        <div class="interview-header">
            <div class="interview-icon">
                <i class="fa-regular fa-calendar-clock"></i>
            </div>

            <div class="interview-heading">
                <h2>وضعیت مصاحبه</h2>
                <p>فرآیند بررسی درخواست همکاری</p>
            </div>

            <span class="interview-status status-pending">
                    در انتظار تعیین زمان
                </span>
        </div>

        <div class="interview-divider"></div>

        <div class="interview-notice">
            <h3>هنوز زمان مصاحبه مشخص نشده است</h3>
            <p>
                درخواست شما در حال بررسی است. پس از تعیین تاریخ و ساعت
                مصاحبه توسط مدیر سایت، اطلاعات مربوطه در همین بخش نمایش
                داده خواهد شد.
            </p>
        </div>

        <div class="interview-details">
            <div class="interview-detail">
                <i class="fa-regular fa-calendar"></i>
                <div>
                    <strong>تاریخ مصاحبه</strong>
                    <span>هنوز تعیین نشده</span>
                </div>
            </div>

            <div class="interview-detail">
                <i class="fa-regular fa-clock"></i>
                <div>
                    <strong>ساعت مصاحبه</strong>
                    <span>هنوز تعیین نشده</span>
                </div>
            </div>

            <div class="interview-detail">
                <i class="fa-solid fa-location-dot"></i>
                <div>
                    <strong>محل برگزاری</strong>
                    <span>دفتر شرکت</span>
                </div>
            </div>
        </div>

        <div class="interview-divider"></div>

        <div class="interview-footer">
            <i class="fa-solid fa-circle-info"></i>
            <p>در حال حاضر نیازی به انجام اقدام خاصی نیست.</p>
        </div>
    </section>

    <!-- کارت دعوت به مصاحبه -->
    <section class="interview-card d-none" id="interviewcard" dir="rtl">
        <div class="interview-header">
            <div class="interview-icon">
                <i class="fa-regular fa-calendar-check"></i>
            </div>

            <div class="interview-heading">
                <h2>دعوت به مصاحبه</h2>
                <p>وضعیت درخواست استخدام شما</p>
            </div>

            <span class="interview-status status-scheduled" id="interviewstatus">
                    دعوت شده‌اید
                </span>
        </div>

        <div class="interview-divider"></div>

        <div class="interview-info">
            <div class="interview-info-item">
                <div class="info-icon">
                    <i class="fa-regular fa-calendar-days"></i>
                </div>
                <div class="info-content">
                    <span>تاریخ مصاحبه</span>
                    <strong id="interviewdate">—</strong>
                </div>
            </div>

            <div class="interview-info-item">
                <div class="info-icon">
                    <i class="fa-regular fa-clock"></i>
                </div>
                <div class="info-content">
                    <span>ساعت مصاحبه</span>
                    <strong id="interviewtime">—</strong>
                </div>
            </div>

            <div class="interview-info-item">
                <div class="info-icon">
                    <i class="fa-solid fa-location-dot"></i>
                </div>
                <div class="info-content">
                    <span>محل برگزاری</span>
                    <strong>دفتر شرکت</strong>
                </div>
            </div>
        </div>

        <div class="interview-message">
            <div class="message-title">
                <i class="fa-regular fa-message"></i>
                <strong>پیام مدیر</strong>
            </div>
            <p>
                لطفاً در تاریخ و ساعت تعیین‌شده در دفتر شرکت حضور داشته باشید.
            </p>
        </div>

        <div class="interview-feedback"
             id="interviewfeedback"
             role="status"
             aria-live="polite"
             hidden>
        </div>

        <div class="interview-actions">
            <button type="button"
                    class="interview-btn confirm-btn"
                    id="confirminterview">
                <i class="fa-solid fa-check"></i>
                تأیید حضور
            </button>
        </div>
    </section>
    <!-- کارت دعوت به مصاحبه -->

</div>
//
<script  src="{{ asset('assets/js/forma02.js') }}"></script>
</body>
 </html>
