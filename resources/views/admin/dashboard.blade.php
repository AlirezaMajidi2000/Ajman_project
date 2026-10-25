<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>پنل مدیریت کارآموزی | آژمان</title>

    <link rel="stylesheet" href="{{ asset('assets/css/admin.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/icon/FontAwesome.Pro.6.5.2/css/all.css') }}">
    <link rel="icon" type="image/png" href="{{ asset('assets/images/logo.jpg') }}"/>
</head>

<body>

<header class="header">
    <div class="brand">
        <div class="brand-icon"></div>
        <div>
            <h2>آژمان</h2>
            <span>سامانه مدیریت کارآموزی</span>
        </div>
    </div>

    <div class="header-title">
        <span>مدیریت سامانه</span>
        <h1>درخواست‌های کارآموزی</h1>
    </div>

    <div class="header-actions">
        <div class="admin-profile">
            <div class="admin-avatar">
                <i class="fa-regular fa-user"></i>
            </div>
            <div>
                <strong>{{ auth()->user()->name }} {{ auth()->user()->last_name }}</strong>
                <span>مدیر کل</span>
            </div>
        </div>

        <form action="{{ route('logout') }}" method="POST">
            @csrf
            <button type="submit" class="btn btn-secondary">خروج</button>
        </form>
    </div>
</header>

<main class="container">

    <section class="page-heading">
        <div>
            <p class="breadcrumb">داشبورد / کارآموزی</p>
            <h2>مدیریت درخواست‌ها</h2>
            <p class="description">
                درخواست‌های کارآموزی را بررسی و مراحل مصاحبه را مدیریت کنید.
            </p>
        </div>
    </section>

    <section class="statistics">
        <article class="stat-card">
            <div class="stat-icon blue">
                <i class="fa-regular fa-folder-open"></i>
            </div>
            <div>
                <span>کل درخواست‌ها</span>
                <strong id="totalCount">۰</strong>
            </div>
        </article>

        <article class="stat-card">
            <div class="stat-icon orange">
                <i class="fa-regular fa-clock"></i>
            </div>
            <div>
                <span>در انتظار مصاحبه</span>
                <strong id="interviewCount">۰</strong>
            </div>
        </article>

        <article class="stat-card">
            <div class="stat-icon green">
                <i class="fa-solid fa-user-check"></i>
            </div>
            <div>
                <span>پذیرفته‌شده</span>
                <strong id="acceptedCount">۰</strong>
            </div>
        </article>
    </section>

    <section class="table-card">
        <div class="table-toolbar">
            <div class="table-title">
                <h3>فهرست متقاضیان</h3>
                <span id="tableCount">۰ درخواست</span>
            </div>

            <div class="table-controls">
                <label class="search-box">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <input type="search" id="searchInput" placeholder="جست‌وجوی نام، کد ملی یا تلفن...">
                </label>

                <select id="statusFilter">
                    <option value="all">همه وضعیت‌ها</option>
                    <option value="pending">در انتظار بررسی</option>
                    <option value="invited">دعوت به مصاحبه</option>
                    <option value="accepted">پذیرفته‌شده</option>
                    <option value="rejected">رد شده</option>
                </select>
            </div>
        </div>

        <div class="table-wrapper">
            <table>
                <thead>
                <tr>
                    <th>ردیف</th>
                    <th>نام و نام خانوادگی</th>
                    <th>کد ملی</th>
                    <th>شماره تماس</th>
                    <th>شهر</th>
                    <th>حوزه فعالیت</th>
                    <th>وضعیت</th>
                    <th>عملیات</th>
                </tr>
                </thead>
                <tbody id="applicationsBody"></tbody>
            </table>
        </div>
    </section>

</main>

<footer class="footer">
    <span>© آژمان</span>
    <span>پنل مدیریت کارآموزی</span>
</footer>

{{-- modal --}}
<div class="modal-backdrop" id="modalBackdrop" hidden>
    <section class="modal" role="dialog">
        <div class="modal-header">
            <h3 id="modalTitle">جزئیات درخواست</h3>
            <button class="close-btn" id="closeModalBtn">✕</button>
        </div>
        <div class="modal-content" id="modalContent"></div>
    </section>
</div>

<script src="{{ asset('assets/js/admin.js') }}"></script>

</body>
</html>
