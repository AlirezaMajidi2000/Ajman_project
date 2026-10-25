let name = document.querySelector('.name')
let lastNmae = document.querySelector('.lastname')
let fatherName = document.querySelector('.fathername')
let birthDate = document.querySelector('.birthdate')
let birthPlace = document.querySelector('.birthplace')
let birthCertificateNumber = document.querySelector('.birthcertificatenumber')
let id = document.querySelector('.id')
let birthCertificateDate = document.querySelector('.birthcertificatedate')
let birthCertificate = document.querySelector('.birthcertificate')
let maritalStatus = document.querySelector('.maritalstatus')
let military = document.querySelector('.military')
let workPlace = document.querySelector('.workplace')
let home = document.querySelector('.home')
let phone = document.querySelector('.phone')
let descriptin = document.querySelector('.description')

let profileContainer = document.getElementById("profileContainer");
let profileTrigger = document.getElementById("profileTrigger");
let profileMenu = document.getElementById("profileMenu");

let searchToggle = document.getElementById("searchToggle");
let searchBox = document.getElementById("searchBox");
let searchInput = document.getElementById("searchInput");
let searchForm = document.getElementById("searchForm");

let notificationBtn = document.getElementById("notificationBtn");
let notificationDot = document.getElementById("notificationDot");

let mobileMenuToggle = document.getElementById("mobileMenuToggle");
let mainNav = document.getElementById("mainNav");

let logoutBtn = document.getElementById("logoutBtn");

let formA02 = document.querySelector('#formA02')
let btnFormA02 = document.querySelector('.btn_registration')

let Card = document.querySelector('#interviewCard')

let notCard = document.querySelector('#not_interview_card')
let btnNotCard = document.querySelector('.btn_notcard')


// پیام های ارور و موفقیت

let nameMsg = document.querySelector('.name_msg')
let lastNmaeMsg = document.querySelector('.lastname_msg')
let fatherNameMsg = document.querySelector('.fathername_msg')
let birthDateMsg = document.querySelector('.birthdate_msg')
let birthPlaceMsg = document.querySelector('.birthplace_msg')
let birthCertificateNumberMsg = document.querySelector('.birthcertificatenumber_msg')
let idMsg = document.querySelector('.id_msg')
let birthCertificateDateMsg = document.querySelector('.birthcertificatedate_msg')
let birthCertificateMsg = document.querySelector('.birthcertificate_msg')
let maritalStatusMsg = document.querySelector('.maritalstatus_msg')
let militaryMsg = document.querySelector('.military_msg')
let workPlaceMsg = document.querySelector('.workplace_msg')
let homeMsg = document.querySelector('.home_msg')
let phoneMsg = document.querySelector('.phone_msg')
let descriptionMsg = document.querySelector('.description_msg')

// regex

let nameRegex = /^[ آ-یپچژگک‌ی\s]+$/
let phoneRegex = /^09\d{9}$/;
let idRegex = /^\d{10}$/;
let birthCertificateNumberRegex = /^[0-9۰-۹٠-٩آ-ی/]{1,10}$/;
let birthDateRegex = /^[0-9۰-۹٠-٩/]{1,10}$/;
let addressRegex = /^[\p{Script=Arabic}0-9۰-۹٠-٩\s،,./\-]+$/u;


// باز و بسته کردن منوی پروفایل
function toggleProfileMenu() {
    let isOpen = profileTrigger.getAttribute("aria-expanded") === "true";

    profileTrigger.setAttribute("aria-expanded", String(!isOpen));
    profileMenu.hidden = isOpen;
}

function closeProfileMenu() {
    profileTrigger.setAttribute("aria-expanded", "false");
    profileMenu.hidden = true;
}

profileTrigger.addEventListener("click", function () {
    const isOpen = profileTrigger.getAttribute("aria-expanded") === "true";

    if (isOpen) {
        closeProfileMenu();
    } else {
        searchBox.hidden = true;
        searchToggle.setAttribute("aria-expanded", "false");

        toggleProfileMenu();
    }
});


// بستن منو با کلیک بیرون از آن
document.addEventListener("click", function (event) {
    if (!profileContainer.contains(event.target)) {
        closeProfileMenu();
    }

    if (
        !searchBox.contains(event.target) &&
        !searchToggle.contains(event.target)
    ) {
        searchBox.hidden = true;
        searchToggle.setAttribute("aria-expanded", "false");
    }
});


// بستن منو با کلید Escape
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeProfileMenu();

        searchBox.hidden = true;
        searchToggle.setAttribute("aria-expanded", "false");

        mainNav.classList.remove("is-open");
        mobileMenuToggle.setAttribute("aria-expanded", "false");
        mobileMenuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }
});


// باز و بسته کردن جست‌وجو
searchToggle.addEventListener("click", function () {
    let isOpen = !searchBox.hidden;

    closeProfileMenu();

    searchBox.hidden = isOpen;
    searchToggle.setAttribute("aria-expanded", String(!isOpen));

    if (!isOpen) {
        searchInput.focus();
    }
});


// عملکرد آزمایشی جست‌وجو
searchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const query = searchInput.value.trim();

    if (query === "") {
        searchInput.focus();
        return;
    }

    // این قسمت را بعداً به سیستم جست‌وجوی واقعی وصل کن.
    console.log("عبارت جست‌وجو:", query);
});


// نمایش یا مخفی کردن نقطه اعلان
// این تابع را می‌توان بعداً به سیستم اعلان‌های سایت متصل کرد.
function setUnreadNotification(hasUnread) {
    notificationDot.hidden = !hasUnread;

    notificationBtn.setAttribute(
        "aria-label",
        hasUnread ? "اعلان خوانده‌نشده" : "اعلان جدیدی وجود ندارد"
    );
}

// در شروع، یک اعلان خوانده‌نشده نمایش داده می‌شود.
setUnreadNotification(true);


// کلیک روی اعلان‌ها
notificationBtn.addEventListener("click", function () {
    // هنوز صفحه یا پنل اعلان‌ها ساخته نشده است.
    // بعداً می‌توان پنل اعلان‌ها را به این دکمه متصل کرد.
    console.log("بخش اعلان‌ها انتخاب شد.");
});


// باز و بسته کردن منوی موبایل
mobileMenuToggle.addEventListener("click", function () {
    let isOpen = mainNav.classList.toggle("is-open");

    mobileMenuToggle.setAttribute("aria-expanded", String(isOpen));

    mobileMenuToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';

    if (isOpen) {
        closeProfileMenu();
        searchBox.hidden = true;
        searchToggle.setAttribute("aria-expanded", "false");
    }
});


// انتخاب گزینه‌های منو
document.querySelectorAll(".nav-link").forEach(function (link) {
    link.addEventListener("click", function () {
        document.querySelectorAll(".nav-link").forEach(function (item) {
            item.classList.remove("active");
        });

        this.classList.add("active");
    });
});


// // خروج آزمایشی
// logoutBtn.addEventListener("click", function () {
//     let confirmed = confirm("آیا مطمئن هستید که می‌خواهید خارج شوید؟");
//
//     if (!confirmed) {
//         return;
//     }
//
//     // این بخش را به سیستم احراز هویت واقعی سایت وصل کن.
//     alert("عملیات خروج هنوز به سیستم حساب کاربری متصل نشده است.");
// });



// نمایش دادن تاریخ

let dateElement = document.getElementById("application_date");

let today = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
}).format(new Date());

dateElement.textContent = today;
dateElement.classList.add('font_vazir')


// اعتبارسنجی نام

name.addEventListener('input', function (event) {
    event.preventDefault
    let username = name.value.trim();

    if (username.length < 3 || username.length > 50 || !nameRegex.test(username)) {
        nameMsg.classList.remove('d-none' , 'text-green');
        nameMsg.classList.add('d-block', 'text-red');

        nameMsg.textContent =
            'خطا: نام باید حداقل ۳ کاراکتر و حداکثر 50 کاراکتر و شامل حروف فارسی باشد.';
    } else {
        nameMsg.classList.remove('d-none' , 'text-red');
        nameMsg.classList.add('d-block', 'text-green');

        nameMsg.textContent = 'موفق: ورودی مجاز است.';
    }
});

// اعتبارسنجی نام خانوادگی

lastNmae.addEventListener('input', function (event) {
    event.preventDefault
    let userlastname = lastNmae.value.trim();

    if (userlastname.length < 3 || userlastname.length > 50 || !lastNameRegex.test(userlastname)) {
        lastNmaeMsg.classList.remove('d-none' , 'text-green');
        lastNmaeMsg.classList.add('d-block', 'text-red');

        lastNmaeMsg.textContent =
            'خطا: نام خانوادگی باید حداقل ۳ کاراکتر و حداکثر 50 کاراکتر و شامل حروف فارسی باشد.';
    } else {
        lastNmaeMsg.classList.remove('d-none' , 'text-red');
        lastNmaeMsg.classList.add('d-block', 'text-green');

        lastNmaeMsg.textContent = 'موفق: ورودی مجاز است.';
    }
});

// اعتبارسنجی نام پدر

fatherName.addEventListener('input', function (event) {
    event.preventDefault
    let userfathername = fatherName.value.trim();

    if (userfathername.length < 3 || userfathername.length > 50 || !fatherNameRegex.test(userfathername)) {
        fatherNameMsg.classList.remove('d-none' , 'text-green');
        fatherNameMsg.classList.add('d-block', 'text-red');

        fatherNameMsg.textContent =
            'خطا: نام پدر باید حداقل ۳ کاراکتر و حداکثر 50 کاراکتر و شامل حروف فارسی باشد.';
    } else {
        fatherNameMsg.classList.remove('d-none' , 'text-red');
        fatherNameMsg.classList.add('d-block', 'text-green');

        fatherNameMsg.textContent = 'موفق: ورودی مجاز است.';
    }
});

// اعتبارسنجی تاریخ تولد

birthDate.addEventListener('input', function (event) {
    event.preventDefault
    let userbirthdate = birthDate.value.trim();

    if (userbirthdate.length < 8 || userbirthdate.length > 10 || !birthDateRegex.test(userbirthdate)) {
        birthDateMsg.classList.remove('d-none' , 'text-green');
        birthDateMsg.classList.add('d-block', 'text-red');

        birthDateMsg.textContent = 'خطا: تاریخ تولد نامعتبر';
    } else {
        birthDateMsg.classList.remove('d-none' , 'text-red');
        birthDateMsg.classList.add('d-block', 'text-green');

        birthDateMsg.textContent = 'موفق: ورودی مجاز است.';
    }
});

// اعتبارسنجی محل تولد

birthPlace.addEventListener('input', function (event) {
    event.preventDefault
    let userbirtplace = birthPlace.value.trim();

    if (userbirtplace.length < 1 || userbirtplace.length > 50 || !nameRegex.test(userbirtplace)) {
        birthPlaceMsg.classList.remove('d-none' , 'text-green');
        birthPlaceMsg.classList.add('d-block', 'text-red');

        birthPlaceMsg.textContent = 'خطا: محل تولد نامعتبر';
    } else {
        birthPlaceMsg.classList.remove('d-none' , 'text-red');
        birthPlaceMsg.classList.add('d-block', 'text-green');

        birthPlaceMsg.textContent = 'موفق: ورودی مجاز است.';
    }
});

//  اعتبارسنجی شماره شناسنامه

birthCertificateNumber.addEventListener('input', function (event) {
    event.preventDefault
    let userbirthcertificate = birthCertificateNumber.value.trim();

    if (userbirthcertificate.length < 10 || userbirthcertificate.length > 10 || !birthCertificateNumberRegex.test(userbirthcertificate)) {
        birthCertificateNumberMsg.classList.remove('d-none' , 'text-green');
        birthCertificateNumberMsg.classList.add('d-block', 'text-red');

        birthCertificateNumberMsg.textContent ='شماره شناسنامه باید شامل حروف و / و عدد باشد و بزرگتر از 10 کاراکتر نباشد';
    } else {
        birthCertificateNumberMsg.classList.remove('d-none' , 'text-red');
        birthCertificateNumberMsg.classList.add('d-block', 'text-green');

        birthCertificateNumberMsg.textContent = 'موفق: ورودی مجاز است.';
    }
});

// اعتبارسنجی کد ملی

/**
 * نسخه کامل: بر اساس کد ملی، استان و شهر را برمی‌گرداند
 * @param {string} nationalCode - رشته ۱۰ رقمی
 * @returns {Object} { valid, province, city, message, ... }
 */
function detectNationalCodeLocation(nationalCode) {
  // --- ۱. اعتبارسنجی اولیه ---
  if (!nationalCode || typeof nationalCode !== 'string') {
    return { valid: false, message: 'کد ملی باید به صورت رشته وارد شود' };
  }

  const code = nationalCode.trim();

  if (!/^\d{10}$/.test(code)) {
    return { valid: false, message: 'کد ملی باید ۱۰ رقم عددی باشد' };
  }

  if (/^(\d)\1{9}$/.test(code)) {
    return { valid: false, message: 'کد ملی نامعتبر است (ارقام تکراری)' };
  }

  // --- ۲. بررسی ریاضی رقم کنترلی ---
  const check = parseInt(code[9], 10);
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(code[i], 10) * (10 - i);
  }
  const r = sum % 11;
  const expected = r < 2 ? r : 11 - r;

  if (check !== expected) {
    return { valid: false, message: 'کد ملی از نظر ریاضی معتبر نیست' };
  }

  // --- ۳. استخراج سه رقم اول و جستجو در جدول ---
  const prefix = code.substring(0, 3);
  const map = getLocationMap();
  const entry = map[prefix];

  if (!entry) {
    return {
      valid: true,
      prefix,
      province: null,
      city: null,
      message: `پیش‌شماره ${prefix} یافت نشد (احتمالاً خارج از کشور یا کد جدید)`
    };
  }

  return {
    valid: true,
    nationalCode: code,
    prefix,
    province: entry.province,
    city: entry.city,
    message: `${entry.province} - ${entry.city}`
  };
}

/**
 * جدول داده: سه رقم اول -> { استان, شهر }
 * منبع داده‌ها جدول‌های عمومی اینترنتی است (sms-persia، codemelli و ...)
 * نه انتشار رسمی و کامل سازمان ثبت احوال
 */
function getLocationMap() {
  return {
    // ===== تهران =====
    '001': { province: 'تهران', city: 'تهران' },
    '002': { province: 'تهران', city: 'تهران' },
    '003': { province: 'تهران', city: 'تهران' },
    '004': { province: 'تهران', city: 'تهران' },
    '005': { province: 'تهران', city: 'تهران' },
    '006': { province: 'تهران', city: 'تهران' },
    '007': { province: 'تهران', city: 'تهران' },
    '008': { province: 'تهران', city: 'تهران' },
    '009': { province: 'تهران', city: 'تهران' },
    '010': { province: 'تهران', city: 'تهران' },
    '011': { province: 'تهران', city: 'تهران' },
    '012': { province: 'تهران', city: 'تهران' },
    '013': { province: 'تهران', city: 'تهران' },
    '014': { province: 'تهران', city: 'تهران' },
    '015': { province: 'تهران', city: 'تهران' },
    '016': { province: 'تهران', city: 'تهران' },
    '017': { province: 'تهران', city: 'تهران' },
    '018': { province: 'تهران', city: 'تهران' },
    '019': { province: 'تهران', city: 'تهران' },
    '020': { province: 'تهران', city: 'تهران' },
    '021': { province: 'تهران', city: 'تهران' },
    '022': { province: 'تهران', city: 'تهران' },
    '023': { province: 'تهران', city: 'تهران' },
    '024': { province: 'تهران', city: 'تهران' },
    '025': { province: 'تهران', city: 'تهران' },
    '026': { province: 'تهران', city: 'تهران' },
    '027': { province: 'تهران', city: 'تهران' },
    '028': { province: 'تهران', city: 'تهران' },
    '029': { province: 'تهران', city: 'تهران' },
    '030': { province: 'تهران', city: 'تهران' },
    '031': { province: 'تهران', city: 'تهران' },
    '032': { province: 'تهران', city: 'تهران' },
    '033': { province: 'تهران', city: 'تهران' },
    '034': { province: 'تهران', city: 'تهران' },
    '035': { province: 'تهران', city: 'تهران' },
    '036': { province: 'تهران', city: 'تهران' },
    '037': { province: 'تهران', city: 'تهران' },
    '038': { province: 'تهران', city: 'تهران' },
    '039': { province: 'تهران', city: 'تهران' },
    '040': { province: 'تهران', city: 'تهران' },
    '041': { province: 'تهران', city: 'تهران' },
    '042': { province: 'تهران', city: 'تهران' },
    '043': { province: 'تهران', city: 'تهران' },
    '044': { province: 'تهران', city: 'تهران' },
    '045': { province: 'تهران', city: 'تهران' },
    '046': { province: 'تهران', city: 'تهران' },
    '047': { province: 'تهران', city: 'تهران' },
    '048': { province: 'تهران', city: 'تهران' },
    '049': { province: 'تهران', city: 'تهران' },
    '050': { province: 'تهران', city: 'تهران' },

    // ===== خراسان رضوی =====
    '051': { province: 'خراسان رضوی', city: 'مشهد' },
    '052': { province: 'خراسان رضوی', city: 'مشهد' },
    '053': { province: 'خراسان رضوی', city: 'مشهد' },
    '054': { province: 'خراسان رضوی', city: 'مشهد' },
    '055': { province: 'خراسان رضوی', city: 'مشهد' },
    '056': { province: 'خراسان رضوی', city: 'مشهد' },
    '057': { province: 'خراسان رضوی', city: 'مشهد' },
    '058': { province: 'خراسان رضوی', city: 'مشهد' },
    '059': { province: 'خراسان رضوی', city: 'مشهد' },
    '060': { province: 'خراسان رضوی', city: 'مشهد' },

    // ===== خوزستان =====
    '061': { province: 'خوزستان', city: 'اهواز' },
    '062': { province: 'خوزستان', city: 'اهواز' },
    '063': { province: 'خوزستان', city: 'اهواز' },
    '064': { province: 'خوزستان', city: 'اهواز' },
    '065': { province: 'خوزستان', city: 'اهواز' },
    '066': { province: 'خوزستان', city: 'اهواز' },
    '067': { province: 'خوزستان', city: 'اهواز' },
    '068': { province: 'خوزستان', city: 'اهواز' },
    '069': { province: 'خوزستان', city: 'اهواز' },
    '070': { province: 'خوزستان', city: 'اهواز' },

    // ===== فارس =====
    '071': { province: 'فارس', city: 'شیراز' },
    '072': { province: 'فارس', city: 'شیراز' },
    '073': { province: 'فارس', city: 'شیراز' },
    '074': { province: 'فارس', city: 'شیراز' },
    '075': { province: 'فارس', city: 'شیراز' },
    '076': { province: 'فارس', city: 'شیراز' },
    '077': { province: 'فارس', city: 'شیراز' },
    '078': { province: 'فارس', city: 'شیراز' },
    '079': { province: 'فارس', city: 'شیراز' },
    '080': { province: 'فارس', city: 'شیراز' },

    // ===== اصفهان =====
    '081': { province: 'اصفهان', city: 'اصفهان' },
    '082': { province: 'اصفهان', city: 'اصفهان' },
    '083': { province: 'اصفهان', city: 'اصفهان' },
    '084': { province: 'اصفهان', city: 'اصفهان' },
    '085': { province: 'اصفهان', city: 'اصفهان' },
    '086': { province: 'اصفهان', city: 'اصفهان' },
    '087': { province: 'اصفهان', city: 'اصفهان' },
    '088': { province: 'اصفهان', city: 'اصفهان' },
    '089': { province: 'اصفهان', city: 'اصفهان' },
    '090': { province: 'اصفهان', city: 'اصفهان' },

    // ===== همدان =====
    '111': { province: 'همدان', city: 'همدان' },
    '112': { province: 'همدان', city: 'همدان' },
    '113': { province: 'همدان', city: 'همدان' },
    '114': { province: 'همدان', city: 'همدان' },
    '115': { province: 'همدان', city: 'همدان' },
    '116': { province: 'همدان', city: 'همدان' },
    '117': { province: 'همدان', city: 'همدان' },
    '118': { province: 'همدان', city: 'همدان' },
    '119': { province: 'همدان', city: 'همدان' },
    '120': { province: 'همدان', city: 'همدان' },

    // ===== کرمانشاه =====
    '121': { province: 'کرمانشاه', city: 'کرمانشاه' },
    '122': { province: 'کرمانشاه', city: 'کرمانشاه' },
    '123': { province: 'کرمانشاه', city: 'کرمانشاه' },
    '124': { province: 'کرمانشاه', city: 'کرمانشاه' },
    '125': { province: 'کرمانشاه', city: 'کرمانشاه' },
    '126': { province: 'کرمانشاه', city: 'کرمانشاه' },
    '127': { province: 'کرمانشاه', city: 'کرمانشاه' },
    '128': { province: 'کرمانشاه', city: 'کرمانشاه' },
    '129': { province: 'کرمانشاه', city: 'کرمانشاه' },
    '130': { province: 'کرمانشاه', city: 'کرمانشاه' },

    // ===== گیلان =====
    '131': { province: 'گیلان', city: 'رشت' },
    '132': { province: 'گیلان', city: 'رشت' },
    '133': { province: 'گیلان', city: 'رشت' },
    '134': { province: 'گیلان', city: 'رشت' },
    '135': { province: 'گیلان', city: 'رشت' },

    // ===== آذربایجان شرقی =====
    '136': { province: 'آذربایجان شرقی', city: 'تبریز' },
    '137': { province: 'آذربایجان شرقی', city: 'تبریز' },
    '138': { province: 'آذربایجان شرقی', city: 'تبریز' },
    '149': { province: 'آذربایجان شرقی', city: 'اهر' },
    '150': { province: 'آذربایجان شرقی', city: 'اهر' },
    '154': { province: 'آذربایجان شرقی', city: 'مراغه' },
    '155': { province: 'آذربایجان شرقی', city: 'مراغه' },
    '159': { province: 'آذربایجان شرقی', city: 'هشترود' },
    '160': { province: 'آذربایجان شرقی', city: 'هشترود' },
    '164': { province: 'آذربایجان شرقی', city: 'سراب' },
    '165': { province: 'آذربایجان شرقی', city: 'سراب' },
    '168': { province: 'آذربایجان شرقی', city: 'بناب' },
    '169': { province: 'آذربایجان شرقی', city: 'آذرشهر' },
    '170': { province: 'آذربایجان شرقی', city: 'اسکو' },
    '171': { province: 'آذربایجان شرقی', city: 'بستان آباد' },
    '172': { province: 'آذربایجان شرقی', city: 'شبستر' },
    '173': { province: 'آذربایجان شرقی', city: 'هریس' },
    '505': { province: 'آذربایجان شرقی', city: 'جلفا' },
    '506': { province: 'آذربایجان شرقی', city: 'عجب شیر' },
    '519': { province: 'آذربایجان شرقی', city: 'کلیبر' },
    '535': { province: 'آذربایجان شرقی', city: 'ملکان' },
    '540': { province: 'آذربایجان شرقی', city: 'میانه' },
    '545': { province: 'آذربایجان شرقی', city: 'ترکمانچای' },
    '567': { province: 'آذربایجان شرقی', city: 'ورزقان' },
    '604': { province: 'آذربایجان شرقی', city: 'هوراند' },
    '623': { province: 'آذربایجان شرقی', city: 'صوفیان' },
    '636': { province: 'آذربایجان شرقی', city: 'چاروایماق' },

    // ===== مازندران =====
    '141': { province: 'مازندران', city: 'ساری' },
    '142': { province: 'مازندران', city: 'ساری' },
    '143': { province: 'مازندران', city: 'ساری' },
    '144': { province: 'مازندران', city: 'ساری' },
    '145': { province: 'مازندران', city: 'ساری' },
    '146': { province: 'مازندران', city: 'ساری' },
    '147': { province: 'مازندران', city: 'ساری' },
    '148': { province: 'مازندران', city: 'ساری' },
    '205': { province: 'مازندران', city: 'بابل' },
    '206': { province: 'مازندران', city: 'بابل' },
    '208': { province: 'مازندران', city: 'ساری' },
    '209': { province: 'مازندران', city: 'ساری' },
    '213': { province: 'مازندران', city: 'آمل' },
    '214': { province: 'مازندران', city: 'آمل' },
    '215': { province: 'مازندران', city: 'قائمشهر' },
    '216': { province: 'مازندران', city: 'قائمشهر' },
    '217': { province: 'مازندران', city: 'بهشهر' },
    '218': { province: 'مازندران', city: 'بهشهر' },
    '219': { province: 'مازندران', city: 'نوشهر' },
    '220': { province: 'مازندران', city: 'نوشهر' },
    '221': { province: 'مازندران', city: 'تنکابن' },
    '222': { province: 'مازندران', city: 'نور' },
    '225': { province: 'مازندران', city: 'سوادکوه' },
    '227': { province: 'مازندران', city: 'رامسر' },
    '483': { province: 'مازندران', city: 'چالوس' },
    '498': { province: 'مازندران', city: 'بندپی' },
    '499': { province: 'مازندران', city: 'نکاء' },
    '500': { province: 'مازندران', city: 'هراز و محمودآباد' },
    '501': { province: 'مازندران', city: 'هراز و محمودآباد' },
    '568': { province: 'مازندران', city: 'بندپی' },
    '576': { province: 'مازندران', city: 'چهاردانگه' },
    '577': { province: 'مازندران', city: 'شیرگاه' },
    '578': { province: 'مازندران', city: 'دودانگه' },
    '579': { province: 'مازندران', city: 'گلوگاه' },
    '582': { province: 'مازندران', city: 'جویبار' },
    '625': { province: 'مازندران', city: 'چمستان' },
    '626': { province: 'مازندران', city: 'کجور' },
    '627': { province: 'مازندران', city: 'کلاردشت' },
    '711': { province: 'مازندران', city: 'بندپی شرقی' },
    '712': { province: 'مازندران', city: 'عباس آباد' },
    '713': { province: 'مازندران', city: 'میاندورود' },

    // ===== کرمان =====
    '151': { province: 'کرمان', city: 'کرمان' },
    '152': { province: 'کرمان', city: 'کرمان' },
    '153': { province: 'کرمان', city: 'کرمان' },
    '156': { province: 'کرمان', city: 'کرمان' },
    '157': { province: 'کرمان', city: 'کرمان' },
    '158': { province: 'کرمان', city: 'کرمان' },
    '161': { province: 'کرمان', city: 'کرمان' },
    '162': { province: 'کرمان', city: 'کرمان' },
    '163': { province: 'کرمان', city: 'کرمان' },

    // ===== گلستان =====
    '161': { province: 'گلستان', city: 'گرگان' },
    '162': { province: 'گلستان', city: 'گرگان' },
    '163': { province: 'گلستان', city: 'گرگان' },
    '166': { province: 'گلستان', city: 'گرگان' },
    '167': { province: 'گلستان', city: 'گرگان' },
    '202': { province: 'گلستان', city: 'گنبد کاووس' },
    '203': { province: 'گلستان', city: 'گنبد کاووس' },
    '211': { province: 'گلستان', city: 'گرگان' },
    '212': { province: 'گلستان', city: 'گرگان' },
    '223': { province: 'گلستان', city: 'بندرترکمن' },
    '224': { province: 'گلستان', city: 'کردکوی' },
    '226': { province: 'گلستان', city: 'علی آباد' },
    '288': { province: 'گلستان', city: 'مینودشت' },
    '386': { province: 'گلستان', city: 'کلاله' },
    '487': { province: 'گلستان', city: 'رامیان' },
    '497': { province: 'گلستان', city: 'آق قلا' },
    '531': { province: 'گلستان', city: 'مراوه تپه' },
    '628': { province: 'گلستان', city: 'گمیشان' },
    '689': { province: 'گلستان', city: 'بندرگز' },

    // ===== سیستان و بلوچستان =====
    '174': { province: 'سیستان و بلوچستان', city: 'زاهدان' },
    '175': { province: 'سیستان و بلوچستان', city: 'زاهدان' },
    '176': { province: 'سیستان و بلوچستان', city: 'زاهدان' },
    '177': { province: 'سیستان و بلوچستان', city: 'زاهدان' },
    '178': { province: 'سیستان و بلوچستان', city: 'زاهدان' },
    '179': { province: 'سیستان و بلوچستان', city: 'زاهدان' },
    '180': { province: 'سیستان و بلوچستان', city: 'زاهدان' },

    // ===== کردستان =====
    '181': { province: 'کردستان', city: 'سنندج' },
    '182': { province: 'کردستان', city: 'سنندج' },
    '183': { province: 'کردستان', city: 'سنندج' },
    '184': { province: 'کردستان', city: 'سنندج' },
    '185': { province: 'کردستان', city: 'سنندج' },
    '186': { province: 'کردستان', city: 'سنندج' },
    '187': { province: 'کردستان', city: 'سنندج' },
    '188': { province: 'کردستان', city: 'سنندج' },
    '189': { province: 'کردستان', city: 'سنندج' },
    '190': { province: 'کردستان', city: 'سنندج' },
    '372': { province: 'کردستان', city: 'سنندج' },
    '373': { province: 'کردستان', city: 'سنندج' },
    '375': { province: 'کردستان', city: 'سقز' },
    '376': { province: 'کردستان', city: 'سقز' },
    '377': { province: 'کردستان', city: 'بیجار' },
    '378': { province: 'کردستان', city: 'بیجار' },
    '379': { province: 'کردستان', city: 'قروه' },
    '380': { province: 'کردستان', city: 'قروه' },
    '383': { province: 'کردستان', city: 'کامیاران' },
    '384': { province: 'کردستان', city: 'بانه' },
    '385': { province: 'کردستان', city: 'دیواندره' },
    '558': { province: 'کردستان', city: 'دهگلان' },
    '646': { province: 'کردستان', city: 'سروآباد' },

    // ===== لرستان =====
    '191': { province: 'لرستان', city: 'خرم آباد' },
    '192': { province: 'لرستان', city: 'خرم آباد' },
    '193': { province: 'لرستان', city: 'خرم آباد' },
    '194': { province: 'لرستان', city: 'خرم آباد' },
    '195': { province: 'لرستان', city: 'خرم آباد' },
    '196': { province: 'لرستان', city: 'خرم آباد' },
    '197': { province: 'لرستان', city: 'خرم آباد' },
    '198': { province: 'لرستان', city: 'خرم آباد' },
    '199': { province: 'لرستان', city: 'خرم آباد' },
    '200': { province: 'لرستان', city: 'خرم آباد' },
    '406': { province: 'لرستان', city: 'خرم آباد' },
    '407': { province: 'لرستان', city: 'خرم آباد' },
    '412': { province: 'لرستان', city: 'بروجرد' },
    '413': { province: 'لرستان', city: 'بروجرد' },
    '416': { province: 'لرستان', city: 'الیگودرز' },
    '417': { province: 'لرستان', city: 'الیگودرز' },
    '418': { province: 'لرستان', city: 'الشتر' },
    '419': { province: 'لرستان', city: 'کوهدشت' },
    '420': { province: 'لرستان', city: 'نورآباد' },
    '421': { province: 'لرستان', city: 'دورود' },
    '483': { province: 'لرستان', city: 'ازنا' },
    '484': { province: 'لرستان', city: 'ازنا' },
    '528': { province: 'لرستان', city: 'ویسیان' },
    '557': { province: 'لرستان', city: 'اشترینان' },
    '592': { province: 'لرستان', city: 'پاپی' },
    '598': { province: 'لرستان', city: 'رومشکان' },
    '612': { province: 'لرستان', city: 'چغلوندی' },
    '613': { province: 'لرستان', city: 'چگنی' },

    // ===== البرز =====
    '201': { province: 'البرز', city: 'کرج' },
    '204': { province: 'البرز', city: 'کرج' },
    '207': { province: 'البرز', city: 'کرج' },
    '210': { province: 'البرز', city: 'کرج' },

    // ===== هرمزگان =====
    '241': { province: 'هرمزگان', city: 'بندرعباس' },
    '242': { province: 'هرمزگان', city: 'بندرعباس' },
    '243': { province: 'هرمزگان', city: 'بندرعباس' },
    '244': { province: 'هرمزگان', city: 'بندرعباس' },
    '245': { province: 'هرمزگان', city: 'بندرعباس' },
    '246': { province: 'هرمزگان', city: 'بندرعباس' },
    '247': { province: 'هرمزگان', city: 'بندرعباس' },
    '248': { province: 'هرمزگان', city: 'بندرعباس' },
    '249': { province: 'هرمزگان', city: 'بندرعباس' },
    '250': { province: 'هرمزگان', city: 'بندرعباس' },
    '337': { province: 'هرمزگان', city: 'حاجی آباد' },
    '338': { province: 'هرمزگان', city: 'بندرعباس' },
    '339': { province: 'هرمزگان', city: 'بندرعباس' },
    '341': { province: 'هرمزگان', city: 'میناب' },
    '342': { province: 'هرمزگان', city: 'میناب' },
    '343': { province: 'هرمزگان', city: 'بندرلنگه' },
    '344': { province: 'هرمزگان', city: 'بندرلنگه' },
    '345': { province: 'هرمزگان', city: 'قشم' },
    '346': { province: 'هرمزگان', city: 'جاسک' },
    '348': { province: 'هرمزگان', city: 'بستک' },
    '469': { province: 'هرمزگان', city: 'رودان' },
    '470': { province: 'هرمزگان', city: 'گاوبندی' },
    '537': { province: 'هرمزگان', city: 'فین' },
    '554': { province: 'هرمزگان', city: 'خمیر' },
    '586': { province: 'هرمزگان', city: 'بشاگرد' },
    '667': { province: 'هرمزگان', city: 'ابوموسی' },

    // ===== اردبیل =====
    '251': { province: 'اردبیل', city: 'اردبیل' },
    '252': { province: 'اردبیل', city: 'اردبیل' },
    '253': { province: 'اردبیل', city: 'اردبیل' },
    '254': { province: 'اردبیل', city: 'اردبیل' },
    '255': { province: 'اردبیل', city: 'اردبیل' },
    '256': { province: 'اردبیل', city: 'اردبیل' },
    '257': { province: 'اردبیل', city: 'اردبیل' },
    '258': { province: 'اردبیل', city: 'اردبیل' },
    '259': { province: 'اردبیل', city: 'اردبیل' },
    '260': { province: 'اردبیل', city: 'اردبیل' },

    // ===== بوشهر =====
    '261': { province: 'بوشهر', city: 'بوشهر' },
    '262': { province: 'بوشهر', city: 'بوشهر' },
    '263': { province: 'بوشهر', city: 'بوشهر' },
    '264': { province: 'بوشهر', city: 'بوشهر' },
    '265': { province: 'بوشهر', city: 'بوشهر' },
    '266': { province: 'بوشهر', city: 'بوشهر' },
    '267': { province: 'بوشهر', city: 'بوشهر' },
    '268': { province: 'بوشهر', city: 'بوشهر' },
    '269': { province: 'بوشهر', city: 'بوشهر' },
    '270': { province: 'بوشهر', city: 'بوشهر' },

    // ===== آذربایجان غربی =====
    '274': { province: 'آذربایجان غربی', city: 'ارومیه' },
    '275': { province: 'آذربایجان غربی', city: 'ارومیه' },
    '279': { province: 'آذربایجان غربی', city: 'خوی' },
    '280': { province: 'آذربایجان غربی', city: 'خوی' },
    '282': { province: 'آذربایجان غربی', city: 'ماکو' },
    '283': { province: 'آذربایجان غربی', city: 'ماکو' },
    '284': { province: 'آذربایجان غربی', city: 'سلماس' },
    '285': { province: 'آذربایجان غربی', city: 'سلماس' },
    '286': { province: 'آذربایجان غربی', city: 'مهاباد' },
    '287': { province: 'آذربایجان غربی', city: 'مهاباد' },
    '288': { province: 'آذربایجان غربی', city: 'سردشت' },
    '289': { province: 'آذربایجان غربی', city: 'پیرانشهر' },
    '290': { province: 'آذربایجان غربی', city: 'نقده' },
    '291': { province: 'آذربایجان غربی', city: 'سیه چشمه' },
    '292': { province: 'آذربایجان غربی', city: 'بوکان' },
    '293': { province: 'آذربایجان غربی', city: 'شاهین دژ' },
    '294': { province: 'آذربایجان غربی', city: 'تکاب' },
    '295': { province: 'آذربایجان غربی', city: 'اشنویه' },
    '296': { province: 'آذربایجان غربی', city: 'میاندوآب' },
    '297': { province: 'آذربایجان غربی', city: 'میاندوآب' },
    '492': { province: 'آذربایجان غربی', city: 'پلدشت' },
    '493': { province: 'آذربایجان غربی', city: 'چایپاره' },
    '637': { province: 'آذربایجان غربی', city: 'انزل' },
    '638': { province: 'آذربایجان غربی', city: 'سیلوانه' },
    '640': { province: 'آذربایجان غربی', city: 'شوط' },
    '675': { province: 'آذربایجان غربی', city: 'کشاورز' },
    '677': { province: 'آذربایجان غربی', city: 'تخت سلیمان' },

    // ===== یزد =====
    '271': { province: 'یزد', city: 'یزد' },
    '272': { province: 'یزد', city: 'یزد' },
    '273': { province: 'یزد', city: 'یزد' },
    '276': { province: 'یزد', city: 'یزد' },
    '277': { province: 'یزد', city: 'یزد' },
    '278': { province: 'یزد', city: 'یزد' },
    '442': { province: 'یزد', city: 'یزد' },
    '443': { province: 'یزد', city: 'یزد' },
    '444': { province: 'یزد', city: 'اردکان' },
    '445': { province: 'یزد', city: 'تفت' },
    '446': { province: 'یزد', city: 'مهریز' },
    '447': { province: 'یزد', city: 'بافق' },
    '448': { province: 'یزد', city: 'میبد' },
    '503': { province: 'یزد', city: 'ابرکوه' },
    '543': { province: 'یزد', city: 'هرات و مروست' },
    '551': { province: 'یزد', city: 'اشکذر' },
    '552': { province: 'یزد', city: 'نیر' },
    '561': { province: 'یزد', city: 'بهاباد' },
    '718': { province: 'یزد', city: 'دستگردان' },

    // ===== زنجان =====
    '281': { province: 'زنجان', city: 'زنجان' },

    // ===== سمنان =====
    '298': { province: 'سمنان', city: 'سمنان' },
    '299': { province: 'سمنان', city: 'سمنان' },
    '300': { province: 'سمنان', city: 'سمنان' },

    // ===== چهارمحال و بختیاری =====
    '301': { province: 'چهارمحال و بختیاری', city: 'شهرکرد' },
    '302': { province: 'چهارمحال و بختیاری', city: 'شهرکرد' },
    '303': { province: 'چهارمحال و بختیاری', city: 'شهرکرد' },
    '304': { province: 'چهارمحال و بختیاری', city: 'شهرکرد' },
    '305': { province: 'چهارمحال و بختیاری', city: 'شهرکرد' },
    '306': { province: 'چهارمحال و بختیاری', city: 'شهرکرد' },
    '307': { province: 'چهارمحال و بختیاری', city: 'شهرکرد' },
    '308': { province: 'چهارمحال و بختیاری', city: 'شهرکرد' },
    '309': { province: 'چهارمحال و بختیاری', city: 'شهرکرد' },
    '310': { province: 'چهارمحال و بختیاری', city: 'شهرکرد' },
    '467': { province: 'چهارمحال و بختیاری', city: 'بروجن' },

    // ===== خراسان شمالی =====
    '311': { province: 'خراسان شمالی', city: 'بجنورد' },
    '312': { province: 'خراسان شمالی', city: 'بجنورد' },
    '313': { province: 'خراسان شمالی', city: 'بجنورد' },
    '314': { province: 'خراسان شمالی', city: 'بجنورد' },
    '315': { province: 'خراسان شمالی', city: 'بجنورد' },
    '316': { province: 'خراسان شمالی', city: 'بجنورد' },
    '317': { province: 'خراسان شمالی', city: 'بجنورد' },
    '318': { province: 'خراسان شمالی', city: 'بجنورد' },
    '319': { province: 'خراسان شمالی', city: 'بجنورد' },
    '320': { province: 'خراسان شمالی', city: 'بجنورد' },

    // ===== خراسان جنوبی =====
    '321': { province: 'خراسان جنوبی', city: 'بیرجند' },
    '322': { province: 'خراسان جنوبی', city: 'بیرجند' },
    '323': { province: 'خراسان جنوبی', city: 'بیرجند' },
    '324': { province: 'خراسان جنوبی', city: 'بیرجند' },
    '325': { province: 'خراسان جنوبی', city: 'بیرجند' },
    '326': { province: 'خراسان جنوبی', city: 'بیرجند' },
    '327': { province: 'خراسان جنوبی', city: 'بیرجند' },
    '328': { province: 'خراسان جنوبی', city: 'بیرجند' },
    '329': { province: 'خراسان جنوبی', city: 'بیرجند' },
    '330': { province: 'خراسان جنوبی', city: 'بیرجند' },

    // ===== کهگیلویه و بویراحمد =====
    '331': { province: 'کهگیلویه و بویراحمد', city: 'یاسوج' },
    '332': { province: 'کهگیلویه و بویراحمد', city: 'یاسوج' },
    '333': { province: 'کهگیلویه و بویراحمد', city: 'یاسوج' },
    '334': { province: 'کهگیلویه و بویراحمد', city: 'یاسوج' },
    '335': { province: 'کهگیلویه و بویراحمد', city: 'یاسوج' },
    '336': { province: 'کهگیلویه و بویراحمد', city: 'یاسوج' },
    '337': { province: 'کهگیلویه و بویراحمد', city: 'یاسوج' },
    '338': { province: 'کهگیلویه و بویراحمد', city: 'یاسوج' },
    '339': { province: 'کهگیلویه و بویراحمد', city: 'یاسوج' },
    '340': { province: 'کهگیلویه و بویراحمد', city: 'یاسوج' },

    // ===== ایلام =====
    '341': { province: 'ایلام', city: 'ایلام' },
    '342': { province: 'ایلام', city: 'ایلام' },
    '343': { province: 'ایلام', city: 'ایلام' },
    '344': { province: 'ایلام', city: 'ایلام' },
    '345': { province: 'ایلام', city: 'ایلام' },
    '346': { province: 'ایلام', city: 'ایلام' },
    '347': { province: 'ایلام', city: 'ایلام' },
    '348': { province: 'ایلام', city: 'ایلام' },
    '349': { province: 'ایلام', city: 'ایلام' },
    '350': { province: 'ایلام', city: 'ایلام' },

    // ===== ایرانیان خارج از کشور =====
    '351': { province: 'خارج از کشور', city: 'ایرانیان خارج از کشور' },
    '352': { province: 'خارج از کشور', city: 'ایرانیان خارج از کشور' },
    '353': { province: 'خارج از کشور', city: 'ایرانیان خارج از کشور' },
    '354': { province: 'خارج از کشور', city: 'ایرانیان خارج از کشور' },
    '355': { province: 'خارج از کشور', city: 'ایرانیان خارج از کشور' },
    '356': { province: 'خارج از کشور', city: 'ایرانیان خارج از کشور' },
    '357': { province: 'خارج از کشور', city: 'ایرانیان خارج از کشور' },
    '358': { province: 'خارج از کشور', city: 'ایرانیان خارج از کشور' },
    '359': { province: 'خارج از کشور', city: 'ایرانیان خارج از کشور' },
    '360': { province: 'خارج از کشور', city: 'ایرانیان خارج از کشور' },
    '361': { province: 'خارج از کشور', city: 'ایرانیان خارج از کشور' },
    '362': { province: 'خارج از کشور', city: 'ایرانیان خارج از کشور' },
    '363': { province: 'خارج از کشور', city: 'ایرانیان خارج از کشور' },
    '364': { province: 'خارج از کشور', city: 'ایرانیان خارج از کشور' },
    '365': { province: 'خارج از کشور', city: 'ایرانیان خارج از کشور' },
    '366': { province: 'خارج از کشور', city: 'ایرانیان خارج از کشور' },
    '367': { province: 'خارج از کشور', city: 'ایرانیان خارج از کشور' },
    '368': { province: 'خارج از کشور', city: 'ایرانیان خارج از کشور' },
    '369': { province: 'خارج از کشور', city: 'ایرانیان خارج از کشور' },
    '370': { province: 'خارج از کشور', city: 'ایرانیان خارج از کشور' },
    '371': { province: 'خارج از کشور', city: 'ایرانیان خارج از کشور' },
    '374': { province: 'خارج از کشور', city: 'ایرانیان خارج از کشور' },
    '381': { province: 'خارج از کشور', city: 'ایرانیان خارج از کشور' },
    '382': { province: 'خارج از کشور', city: 'ایرانیان خارج از کشور' },
    '388': { province: 'خارج از کشور', city: 'ایرانیان خارج از کشور' },
    '389': { province: 'خارج از کشور', city: 'ایرانیان خارج از کشور' },
    '390': { province: 'خارج از کشور', city: 'ایرانیان خارج از کشور' },
    '391': { province: 'خارج از کشور', city: 'ایرانیان خارج از کشور' },
    '392': { province: 'خارج از کشور', city: 'ایرانیان خارج از کشور' },
    '393': { province: 'خارج از کشور', city: 'ایرانیان خارج از کشور' },
    '394': { province: 'خارج از کشور', city: 'ایرانیان خارج از کشور' },
    '395': { province: 'خارج از کشور', city: 'ایرانیان خارج از کشور' },
    '396': { province: 'خارج از کشور', city: 'ایرانیان خارج از کشور' },
    '397': { province: 'خارج از کشور', city: 'ایرانیان خارج از کشور' },
    '398': { province: 'خارج از کشور', city: 'ایرانیان خارج از کشور' },
    '399': { province: 'خارج از کشور', city: 'ایرانیان خارج از کشور' }
  };
}




const nationalCodeInput = document.querySelector(".nationalcode");
const locationBox = document.getElementById("nationalCodeLocation");
const locationText = document.getElementById("nationalCodeLocationText");

nationalCodeInput.addEventListener("input", function () {
    const code = this.value.trim();

    // تا وقتی کد کامل نشده، نتیجه‌ای نشان نده
    if (code.length !== 10) {
        idMsg.classList.remove('d-none' , 'text-green');
        idMsg.classList.add('d-block', 'text-red');
        idMsg.textContent ='کد ملی باید دقیقاً ۱۰ رقم انگلیسی باشد.';
        return;
    }

    const result = detectNationalCodeLocation(code);

    // اگر کد ملی از نظر ریاضی معتبر نیست
    if (!result.valid) {
        idMsg.classList.remove('d-none' , 'text-green');
        idMsg.classList.add('d-block', 'text-red');
        idMsg.textContent ='کد ملی نامعتبر';
        return;
    }

    else{
        idMsg.classList.remove('d-none' , 'text-red');
        idMsg.classList.add('d-block', 'text-green');
        idMsg.textContent ='موفق: ورودی مجاز است';
    }
});

// اعتبارسنجی تاریخ صدور شناسنامه

birthCertificateDate.addEventListener('input', function (event) {
    event.preventDefault
    let userbirthdate = birthCertificateDate.value.trim();

    if (userbirthdate.length < 8 || userbirthdate.length > 10 || !birthDateRegex.test(userbirthdate)) {
        birthCertificateDateMsg.classList.remove('d-none' , 'text-green');
        birthCertificateDateMsg.classList.add('d-block', 'text-red');

        birthCertificateDateMsg.textContent = 'خطا: تاریخ صدور شناسنامه نامعتبر';
    } else {
        birthCertificateDateMsg.classList.remove('d-none' , 'text-red');
        birthCertificateDateMsg.classList.add('d-block', 'text-green');

        birthCertificateDateMsg.textContent = 'موفق: ورودی مجاز است.';
    }
});

// اعتبارسنجی محل تولد

birthCertificate.addEventListener('input', function (event) {
    event.preventDefault
    let userbirtplace = birthCertificate.value.trim();

    if (userbirtplace.length < 1 || userbirtplace.length > 50 || !nameRegex.test(userbirtplace)) {
        birthCertificateMsg.classList.remove('d-none' , 'text-green');
        birthCertificateMsg.classList.add('d-block', 'text-red');

        birthCertificateMsg.textContent = 'خطا: محل صدور شناسنامه نامعتبر';
    } else {
        birthCertificateMsg.classList.remove('d-none' , 'text-red');
        birthCertificateMsg.classList.add('d-block', 'text-green');

        birthCertificateMsg.textContent = 'موفق: ورودی مجاز است.';
    }
});

// اعتبارسنجی وضعیت تاهل

maritalStatus.addEventListener('input', function (event) {
    event.preventDefault
    let userbirtplace = maritalStatus.value.trim();

    if (userbirtplace.length < 1 || userbirtplace.length > 20 || !nameRegex.test(userbirtplace)) {
        maritalStatusMsg.classList.remove('d-none' , 'text-green');
        maritalStatusMsg.classList.add('d-block', 'text-red');

        maritalStatusMsg.textContent = 'خطا: وضعیت تاهل نامعتبر';
    } else {
        maritalStatusMsg.classList.remove('d-none' , 'text-red');
        maritalStatusMsg.classList.add('d-block', 'text-green');

        maritalStatusMsg.textContent = 'موفق: ورودی مجاز است.';
    }
});

// اعتبارسنجی علت معافیت

military.addEventListener('input', function (event) {
    event.preventDefault
    let username = military.value.trim();

    if (username.length < 3 || username.length > 100 || !nameRegex.test(username)) {
        militaryMsg.classList.remove('d-none' , 'text-green');
        militaryMsg.classList.add('d-block', 'text-red');

        militaryMsg.textContent =
            'خطا: تعداد کاراکتر حداقل 3 و حداکثر 100';
    } else {
        militaryMsg.classList.remove('d-none' , 'text-red');
        militaryMsg.classList.add('d-block', 'text-green');

        militaryMsg.textContent = 'موفق: ورودی مجاز است.';
    }
});

// اعتبارسنجی آدرس محل کار

workPlace.addEventListener('input', function (event) {
    event.preventDefault
    let useraddress = workPlace.value.trim();

    if (useraddress.length < 5 || useraddress.length > 200 || !addressRegex.test(useraddress)) {
        workPlaceMsg.classList.remove('d-none' , 'text-green');
        workPlaceMsg.classList.add('d-block', 'text-red');

        workPlaceMsg.textContent ='آدرس باید بین ۵ تا ۲۰۰ کاراکتر و فارسی باشد و قالب معتبری داشته باشد.';
    } else {
        workPlaceMsg.classList.remove('d-none' , 'text-red');
        workPlaceMsg.classList.add('d-block', 'text-green');

        workPlaceMsg.textContent = 'موفق: ورودی مجاز است.';
    }
});

// اعتبارسنجی آدرس منزل

home.addEventListener('input', function (event) {
    event.preventDefault
    let useraddress = home.value.trim();

    if (useraddress.length < 5 || useraddress.length > 200 || !addressRegex.test(useraddress)) {
        homeMsg.classList.remove('d-none' , 'text-green');
        homeMsg.classList.add('d-block', 'text-red');

        homeMsg.textContent ='آدرس باید بین ۵ تا ۲۰۰ کاراکتر و فارسی باشد و قالب معتبری داشته باشد.';
    } else {
        homeMsg.classList.remove('d-none' , 'text-red');
        homeMsg.classList.add('d-block', 'text-green');

        homeMsg.textContent = 'موفق: ورودی مجاز است.';
    }
});

// اعتبارسنجی شماره تماس

phone.addEventListener('input', function (event) {
    event.preventDefault
    let userphone = phone.value.trim();

    if (userphone.length < 11 || userphone.length > 11 || !phoneRegex.test(userphone)) {
        phoneMsg.classList.remove('d-none' , 'text-green');
        phoneMsg.classList.add('d-block', 'text-red');

        phoneMsg.textContent =
            'شماره تماس باید با 09 شروع شود و دقیقاً ۱۱ رقم باشد.';
    } else {
        phoneMsg.classList.remove('d-none' , 'text-red');
        phoneMsg.classList.add('d-block', 'text-green');

        phoneMsg.textContent = 'موفق: ورودی مجاز است.';
    }
});


/* =========================================
   مدیریت پویای چهار جدول سوابق
   افزودن، ویرایش، ذخیره و حذف
========================================= */

(function initializeDynamicTables() {
    const tableConfigs = {
        education: {
            title: 'سابقه تحصیلی'
        },
        courses: {
            title: 'دوره آموزشی'
        },
        languages: {
            title: 'زبان خارجی'
        },
        experience: {
            title: 'سابقه کاری'
        }
    };

    const persianDigits = '۰۱۲۳۴۵۶۷۸۹';

    // تبدیل اعداد انگلیسی به فارسی
    function toPersianNumber(number) {
        return String(number).replace(/\d/g, digit => {
            return persianDigits[Number(digit)];
        });
    }

    // ساخت دکمه
    function createButton(text, className, action) {
        const button = document.createElement('button');

        button.type = 'button';
        button.className = `dynamic-row-btn ${className}`;
        button.textContent = text;
        button.dataset.action = action;

        return button;
    }

    // ساخت ستون عملیات برای هر ردیف
    function addActionCell(row) {
        const cell = document.createElement('td');
        cell.className = 'dynamic-actions-cell';

        const actions = document.createElement('div');
        actions.className = 'dynamic-row-actions';

        const editButton = createButton(
            'ویرایش',
            'dynamic-edit-btn',
            'edit'
        );

        const deleteButton = createButton(
            'حذف',
            'dynamic-delete-btn',
            'delete'
        );

        actions.append(editButton, deleteButton);
        cell.append(actions);
        row.append(cell);
    }

    // فعال یا غیرفعال کردن ویرایش ردیف
    function setRowEditing(row, editing) {
        row.querySelectorAll('input').forEach(input => {
            input.readOnly = !editing;
        });

        const editButton = row.querySelector(
            '[data-action="edit"], [data-action="save"]'
        );

        if (!editButton) return;

        if (editing) {
            editButton.dataset.action = 'save';
            editButton.textContent = 'ذخیره';

            editButton.classList.remove('dynamic-edit-btn');
            editButton.classList.add('dynamic-save-btn');
        } else {
            editButton.dataset.action = 'edit';
            editButton.textContent = 'ویرایش';

            editButton.classList.remove('dynamic-save-btn');
            editButton.classList.add('dynamic-edit-btn');
        }
    }

    // مرتب کردن شماره ردیف‌ها
    function renumberRows(table) {
        const rows = Array.from(table.tBodies[0].rows);

        rows.forEach((row, index) => {
            const numberCell = row.querySelector('.row_number');

            if (numberCell) {
                numberCell.textContent = toPersianNumber(index + 1);
            }

            row.querySelectorAll('input').forEach((input, inputIndex) => {
                const header = table.tHead.rows[0].cells[inputIndex + 1];

                if (header) {
                    input.setAttribute(
                        'aria-label',
                        `${header.textContent.trim()} ردیف ${toPersianNumber(index + 1)}`
                    );
                }
            });
        });
    }

    // ساخت پیام اعتبارسنجی برای هر input
    function ensureValidationMessage(input) {
        let message = input.parentElement.querySelector('.inputtable_msg');

        if (!message) {
            message = document.createElement('small');
            message.classList.add('inputtable_msg');
            input.after(message);
        }

        return message;
    }

    // اعتبارسنجی حروف و اعداد
    function validateTableInput(input) {
        const message = ensureValidationMessage(input);
        const value = input.value;

        // حروف فارسی و عربی، حروف انگلیسی و اعداد فارسی و انگلیسی
        const allowedCharacters =
            /^[a-zA-Z\u0621-\u063A\u0641-\u064A\u067E\u0686\u0698\u06A9\u06AF\u06BE\u06CC0-9۰-۹]+$/;

        let error = '';

        if (value.length < 2) {
            error = 'خطا: حداقل ۲ کاراکتر وارد کنید.';
        } else if (value.length > 100) {
            error = 'خطا: حداکثر ۱۰۰ کاراکتر مجاز است.';
        } else if (!allowedCharacters.test(value)) {
            error = 'خطا: فقط حروف فارسی، حروف انگلیسی و اعداد فارسی یا انگلیسی مجاز هستند.';
        }

        message.classList.remove(
            'd-none',
            'd-block',
            'text-red',
            'text-green'
        );

        if (error) {
            message.classList.add('d-block', 'text-red');
            message.textContent = error;
            input.setAttribute('aria-invalid', 'true');

            return false;
        }

        message.classList.add('d-block', 'text-green');
        message.textContent = 'موفق: ورودی مجاز است.';
        input.setAttribute('aria-invalid', 'false');

        return true;
    }

    // ساخت ردیف جدید
    function createRow(table) {
        const row = document.createElement('tr');

        const numberCell = document.createElement('td');
        numberCell.className = 'row_number';
        row.append(numberCell);

        // ستون اول شماره و ستون آخر عملیات است.
        const headers = Array.from(
            table.tHead.rows[0].cells
        ).slice(1, -1);

        headers.forEach(header => {
            const cell = document.createElement('td');
            const input = document.createElement('input');

            input.type = 'text';
            input.autocomplete = 'off';
            input.readOnly = false;

            // نام کلاس بدون نقطه
            input.classList.add('table_input');
            const columnNames = {
                education: ['degree_title', 'field_of_study', 'institution', 'gpa', 'academic_year'],
                courses: ['certificate_title', 'training_field', 'institution', 'from_date', 'to_date'],
                languages: ['language', 'speaking_level', 'writing_level'],
                experience: ['from_date', 'to_date', 'institution', 'job_title', 'salary', 'leave_reason'],
            };

            const tableName = table.dataset.dynamicTable;
            const rowIndex = table.tBodies[0].rows.length - 1;
            const colIndex = headers.indexOf(header);

            if (columnNames[tableName] && columnNames[tableName][colIndex]) {
                input.name = `${tableName}[${rowIndex}][${columnNames[tableName][colIndex]}]`;
            }
            input.setAttribute(
                'aria-label',
                `${header.textContent.trim()} ردیف جدید`
            );

            cell.append(input);

            // پیام داخل همان سلول و زیر input
            ensureValidationMessage(input);

            row.append(cell);
        });

        addActionCell(row);

        return row;
    }

    // راه‌اندازی هر چهار جدول
    document.querySelectorAll(
        'table[data-dynamic-table]'
    ).forEach(table => {
        const config = tableConfigs[table.dataset.dynamicTable];

        if (!config || !table.tHead || !table.tBodies.length) {
            return;
        }

        const wrapper = table.closest('.table_wrapper');

        if (!wrapper) return;

        // افزودن عنوان ستون عملیات
        const actionHeading = document.createElement('th');
        actionHeading.className = 'dynamic-actions-heading';
        actionHeading.textContent = 'عملیات';

        table.tHead.rows[0].append(actionHeading);

        // دکمه افزودن ردیف
        const addButton = document.createElement('button');

        addButton.type = 'button';
        addButton.className = 'dynamic-add-btn';
        addButton.textContent = `+ افزودن ${config.title}`;

        wrapper.parentNode.insertBefore(addButton, wrapper);

        // آماده‌سازی ردیف‌های اولیه جدول
        Array.from(table.tBodies[0].rows).forEach(row => {
            row.querySelectorAll('input').forEach(input => {
                input.readOnly = true;

                // ایجاد پیام برای inputهای موجود
                ensureValidationMessage(input);
            });

            addActionCell(row);
        });

        // افزودن ردیف جدید
        addButton.addEventListener('click', function () {
            const row = createRow(table);

            table.tBodies[0].append(row);

            renumberRows(table);

            const firstInput = row.querySelector('input');

            if (firstInput) {
                firstInput.focus();
            }
        });

        // اعتبارسنجی هنگام کلیک روی input
        table.addEventListener('focusin', function (event) {
            const input = event.target.closest('input');

            if (!input || !table.contains(input)) return;

            validateTableInput(input);
        });

        // اعتبارسنجی لحظه‌ای هنگام تایپ
        table.addEventListener('input', function (event) {
            const input = event.target.closest('input');

            if (!input || !table.contains(input)) return;

            validateTableInput(input);
        });

        // مدیریت ویرایش، ذخیره و حذف
        table.addEventListener('click', function (event) {
            const button = event.target.closest('button[data-action]');

            if (!button || !table.contains(button)) return;

            const row = button.closest('tr');

            if (!row) return;

            const action = button.dataset.action;

            if (action === 'edit') {
                setRowEditing(row, true);

                const firstInput = row.querySelector('input');

                if (firstInput) {
                    firstInput.focus();
                }
            }

            else if (action === 'save') {
                const inputs = Array.from(row.querySelectorAll('input'));

                // بررسی تمام inputهای ردیف پیش از ذخیره
                let isValid = true;
                let firstInvalidInput = null;

                inputs.forEach(input => {
                    if (!validateTableInput(input)) {
                        isValid = false;

                        if (!firstInvalidInput) {
                            firstInvalidInput = input;
                        }
                    }
                });

                // جلوگیری از ذخیره ردیف نامعتبر
                if (!isValid) {
                    if (firstInvalidInput) {
                        firstInvalidInput.focus();
                    }

                    return;
                }

                setRowEditing(row, false);
                renumberRows(table);
            }

            else if (action === 'delete') {
                const confirmed = confirm(
                    'آیا از حذف این ردیف مطمئن هستید؟'
                );

                if (!confirmed) return;

                row.remove();
                renumberRows(table);
            }
        });

        renumberRows(table);
    });
})();

// اعتبارسنجی توضیحات

descriptin.addEventListener('input', function (event) {
    event.preventDefault
    let username = descriptin.value.trim();

    if (username.length < 3 || username.length > 1000 || !nameRegex.test(username)) {
        descriptionMsg.classList.remove('d-none' , 'text-green');
        descriptionMsg.classList.add('d-block', 'text-red');

        descriptionMsg.textContent =
            'خطا: توضیحات باید حداقل ۳ کاراکتر و حداکثر 1000 کاراکتر و شامل حروف فارسی باشد.';
    } else {
        descriptionMsg.classList.remove('d-none' , 'text-red');
        descriptionMsg.classList.add('d-block', 'text-green');

        descriptionMsg.textContent = 'موفق: ورودی مجاز است.';
    }
});


// نمایش نام فایل انتخاب‌شده
document.querySelectorAll('.upload_box').forEach(uploadBox => {
    const fileInput = uploadBox.querySelector('.user_image');
    const fileName = uploadBox.querySelector('.file_name');

    if (!fileInput || !fileName) return;

    // ذخیره متن اولیه
    const initialText = fileName.textContent;

    fileInput.addEventListener('change', function () {
        const file = this.files[0];

        if (file) {
            fileName.textContent = file.name;
            fileName.title = file.name;
        } else {
            fileName.textContent = initialText;
            fileName.removeAttribute('title');
        }
    });
});

// نمایش فرم کاراموزی

btnFormA02.addEventListener('click' , function(){
    formA02.classList.remove('d-none')
    formA02.classList.add('d-block')
    notCard.classList.remove('d-block')
    notCard.classList.add('d-none')
    Card.classList.remove('d-block')
    Card.classList.add('d-none')
})

// نمایش فرم کارآموزی

// دعوت به مصاحبه


const interviewStatus = document.getElementById('interviewStatus');
const interviewFeedback = document.getElementById('interviewFeedback');

const confirmInterview = document.getElementById('confirmInterview');

function updateInterviewStatus(status, message, feedbackClass) {
    interviewStatus.classList.remove(
        'status-scheduled',
        'status-confirmed',
        'status-reschedule'
    );

    interviewFeedback.classList.remove(
        'feedback-success',
        'feedback-warning'
    );

    interviewStatus.textContent = status.text;
    interviewStatus.classList.add(status.className);

    interviewFeedback.textContent = message;
    interviewFeedback.classList.add(feedbackClass);
    interviewFeedback.hidden = false;
}

confirmInterview.addEventListener('click', function () {
    updateInterviewStatus(
        {
            text: 'حضور تأیید شد',
            className: 'status-confirmed'
        },
        'حضور شما برای مصاحبه تأیید شد.',
        'feedback-success'
    );

    confirmInterview.disabled = true;
});

// دعوت به مصاحبه

// هنوز به مصاحبه دعوت نشده

btnNotCard.addEventListener('click' , function(){
    notCard.classList.remove('d-none')
    notCard.classList.add('d-block')

    formA02.classList.remove('d-block')
    formA02.classList.add('d-none')
})

// هنوز به مصاحبه دعوت نشده

// به مصاحبه دعوت شده

btnNotCard.addEventListener('click' , function(){
    Card.classList.remove('d-none')
    Card.classList.add('d-block')

    formA02.classList.remove('d-block')
    formA02.classList.add('d-none')
})
