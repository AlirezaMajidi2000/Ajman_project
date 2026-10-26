"use strict";

const applicationsBody = document.getElementById("applicationsBody");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalTitle = document.getElementById("modalTitle");
const modalContent = document.getElementById("modalContent");
const closeBtn = document.getElementById("closeModalBtn");
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");

let applications = [];

// --- بارگذاری داده‌ها ---
async function loadApplications() {
    try {
        const res = await fetch('/admin/applications/json');
        applications = await res.json();
        renderTable();
    } catch (err) {
        console.error(err);
    }
}

// --- نمایش جدول ---
function renderTable() {
    const query = (searchInput?.value || '').trim().toLowerCase();
    const status = statusFilter?.value || 'all';

    const filtered = applications.filter(app => {
        const matchSearch = !query ||
            (app.fullName || '').toLowerCase().includes(query) ||
            (app.nationalId || '').includes(query) ||
            (app.phone || '').includes(query);

        const matchStatus = status === 'all' || app.status === status;

        return matchSearch && matchStatus;
    });

    if (filtered.length === 0) {
        applicationsBody.innerHTML = `<tr><td colspan="8" class="text-center">درخواستی یافت نشد</td></tr>`;
    } else {
        applicationsBody.innerHTML = filtered.map((app, i) => `
            <tr>
                <td>${i + 1}</td>
                <td>${app.fullName || '—'}</td>
                <td>${app.nationalId || '—'}</td>
                <td dir="ltr">${app.phone || '—'}</td>
                <td>${app.city || '—'}</td>
                <td>${app.field || '—'}</td>
                <td><span class="status-badge">${statusLabel(app.status)}</span></td>
                <td>
                    <button class="btn btn-sm view-btn" data-id="${app.id}">مشاهده</button>
                    <button class="btn btn-sm schedule-btn" data-id="${app.id}">مصاحبه</button>
                    <button class="btn btn-sm delete-btn" data-id="${app.id}">حذف</button>
                </td>
            </tr>
        `).join('');
    }

    document.getElementById('totalCount').textContent = applications.length;
    document.getElementById('interviewCount').textContent =
        applications.filter(a => a.status === 'invited').length;
    document.getElementById('acceptedCount').textContent =
        applications.filter(a => a.status === 'accepted').length;
    document.getElementById('tableCount').textContent = `${filtered.length} درخواست`;

    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', () => openModal(btn.dataset.id));
    });

    document.querySelectorAll('.schedule-btn').forEach(btn => {
        btn.addEventListener('click', () => openScheduleModal(btn.dataset.id));
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => deleteApplication(btn.dataset.id));
    });
}

// --- برچسب وضعیت ---
function statusLabel(status) {
    return {
        pending: 'در انتظار بررسی',
        invited: 'دعوت به مصاحبه',
        accepted: 'پذیرفته‌شده',
        rejected: 'رد شده',
    }[status] || 'در انتظار بررسی';
}

// --- باز کردن modal ---
async function openModal(id) {
    try {
        const res = await fetch(`/admin/applications/${id}/json`);
        const data = await res.json();

        modalTitle.textContent = `${data.name || ''} ${data.last_name || ''}`;

        const info = data.info || {};
        const pro = data.professional_info || {};
        const docs = data.documents || [];
        const edus = data.educations || [];
        const courses = data.courses || [];
        const langs = data.languages || [];
        const exps = data.experiences || [];
        modalContent.innerHTML = `
            <div class="detail-section">
                <h4>اطلاعات شخصی</h4>
                <p><strong>کد ملی:</strong> ${data.national_code || '—'}</p>
                <p><strong>تلفن:</strong> ${data.phone || '—'}</p>
                <p><strong>استان:</strong> ${info.province || '—'}</p>
                <p><strong>شهر:</strong> ${info.city || '—'}</p>
                <p><strong>تاریخ تولد:</strong> ${info.birth_date || '—'}</p>
                <p><strong>وضعیت تحصیلی:</strong> ${info.education_status || '—'}</p>
                <p><strong>رشته تحصیلی:</strong> ${info.field_of_study || '—'}</p>
                <p><strong>حوزه درخواست:</strong> ${info.requested_field || '—'}</p>
            </div>

            <div class="detail-section">
                <h4>اطلاعات حرفه‌ای</h4>
                <p><strong>نام پدر:</strong> ${pro.father_name || '—'}</p>
                <p><strong>محل تولد:</strong> ${pro.birth_place || '—'}</p>
                <p><strong>شماره شناسنامه:</strong> ${pro.birth_certificate_number || '—'}</p>
                <p><strong>وضعیت تأهل:</strong> ${pro.marital_status || '—'}</p>
                <p><strong>وضعیت سربازی:</strong> ${pro.military_status || '—'}</p>
                <p><strong>آدرس منزل:</strong> ${pro.home_address || '—'}</p>
            </div>

            <div class="detail-section">
                <h4>مدارک</h4>
                ${docs.length > 0
            ? docs.map(d => `<p><strong>${d.type}:</strong> <a href="/storage/${d.file_path}" target="_blank">مشاهده</a></p>`).join('')
            : '<p>مدرکی آپلود نشده است.</p>'}
            </div>

            <div class="detail-section">
                <h4>سوابق تحصیلی</h4>
                ${edus.length > 0
            ? edus.map(e => `<p>${e.degree_title || '—'} — ${e.field_of_study || '—'} — ${e.institution || '—'} — معدل: ${e.gpa || '—'}</p>`).join('')
            : '<p>سابقه تحصیلی ثبت نشده است.</p>'}
            </div>

            <div class="detail-section">
                <h4>دوره‌های آموزشی</h4>
                ${courses.length > 0
            ? courses.map(c => `<p>${c.certificate_title || '—'} — ${c.training_field || '—'} — ${c.institution || '—'}</p>`).join('')
            : '<p>دوره‌ای ثبت نشده است.</p>'}
            </div>

            <div class="detail-section">
                <h4>زبان‌های خارجی</h4>
                ${langs.length > 0
            ? langs.map(l => `<p>${l.language || '—'} — گفت‌وگو: ${l.speaking_level || '—'} — نوشتن: ${l.writing_level || '—'}</p>`).join('')
            : '<p>زبانی ثبت نشده است.</p>'}
            </div>

            <div class="detail-section">
                <h4>تجربه و سابقه</h4>
                ${exps.length > 0
            ? exps.map(x => `<p>${x.job_title || '—'} — ${x.institution || '—'} — حقوق: ${x.salary || '—'}</p>`).join('')
            : '<p>سابقه کاری ثبت نشده است.</p>'}
            </div>
        `;

        modalBackdrop.hidden = false;
    } catch (err) {
        console.error(err);
    }
}

// --- تنظیم مصاحبه ---
async function openScheduleModal(id) {
    const app = applications.find(a => a.id == id);
    if (!app) return;

    modalTitle.textContent = `تنظیم مصاحبه: ${app.fullName}`;

    modalContent.innerHTML = `
        <form id="scheduleForm">
            <div style="margin-bottom: 1rem;">
                <label>وضعیت</label>
                <select name="status" id="statusSelect" style="width:100%; padding:0.5rem;">
                    <option value="pending" ${app.status === 'pending' ? 'selected' : ''}>در انتظار</option>
                    <option value="invited" ${app.status === 'invited' ? 'selected' : ''}>دعوت به مصاحبه</option>
                    <option value="accepted" ${app.status === 'accepted' ? 'selected' : ''}>قبول</option>
                    <option value="rejected" ${app.status === 'rejected' ? 'selected' : ''}>رد</option>
                </select>
            </div>
            <div style="margin-bottom: 1rem;" id="interviewDateField">
                <label>تاریخ مصاحبه</label>
                <input type="text" name="interview_date" value="${app.interviewDate || ''}" placeholder="1405/08/02" style="width:100%; padding:0.5rem;">
            </div>
            <button type="submit" class="btn btn-primary">ذخیره</button>
        </form>
    `;

    modalBackdrop.hidden = false;

    const statusSelect = document.getElementById('statusSelect');
    const dateField = document.getElementById('interviewDateField');

    // نمایش/مخفی کردن فیلد تاریخ بر اساس وضعیت
    function toggleDateField() {
        if (statusSelect.value === 'invited') {
            dateField.style.display = 'block';
        } else {
            dateField.style.display = 'none';
        }
    }

    toggleDateField();
    statusSelect.addEventListener('change', toggleDateField);

    document.getElementById('scheduleForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);

        const res = await fetch(`/admin/applications/${id}/schedule`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
            },
            body: JSON.stringify({
                interview_date: data.get('interview_date') || null,
                status: data.get('status'),
            }),
        });

        if (res.ok) {
            modalBackdrop.hidden = true;
            await loadApplications();
        } else {
            const err = await res.json();
            alert(err.errors?.interview_date?.[0] || 'خطا در ذخیره');
        }
    });
}
// --- حذف درخواست ---
async function deleteApplication(id) {
    if (!confirm('آیا از حذف مطمئن هستید؟')) return;

    const res = await fetch(`/admin/applications/${id}`, {
        method: 'DELETE',
        headers: {
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
        },
    });

    if (res.ok) {
        await loadApplications();
    }
}

// --- بستن modal ---
closeBtn.addEventListener('click', () => modalBackdrop.hidden = true);
modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) modalBackdrop.hidden = true;
});

// --- جستجو و فیلتر ---
searchInput?.addEventListener('input', renderTable);
statusFilter?.addEventListener('change', renderTable);

// --- شروع ---
loadApplications();
