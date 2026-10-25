let userName = document.querySelector('.username')
let userLastName = document.querySelector('.userlastname')
let userPhone = document.querySelector('.userphone')
let userId = document.querySelector('.userid')
let userFieldOfStudy = document.querySelector('.userfieldofstudy')
let usernameInput = document.getElementById("login_username");
let passwordInput = document.getElementById("login_password");


//پیام
let nameMsg = document.querySelector('.name_msg')
let lastNameMsg = document.querySelector('.lastname_msg')
let phoneMsg = document.querySelector('.phone_msg')
let idMsg = document.querySelector('.id_msg')
let fieldOfStudyMsg = document.querySelector('.fieldofstudy_msg')
let loginMessage = document.getElementById("loginMessage");
let togglePassword = document.getElementById("loginPasswordToggle");
let usernameMsg = document.querySelector(".username_msg");
let passwordMsg = document.querySelector(".password_msg");

//regex
let nameRegex = /^[ آ-یپچژگک‌ی\s]+$/
let lastNameRegex = /^[آ-ی پچژگکی\s]+$/
let phoneRegex = /^09\d{9}$/;
let idRegex = /^\d{10}$/;
let userFieldOfStudyRegex = /^[ آ-یپچژگک‌ی\s]+$/
let name2Regex = /^[A-Za-z0-9._-]{3,30}$/;
let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/;

// اعتبارسنجی نام

userName.addEventListener('input', function (event) {
    event.preventDefault
    let username = userName.value.trim();

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

userLastName.addEventListener('input', function (event) {
    event.preventDefault
    let userlastname = userLastName.value.trim();

    if (userlastname.length < 3 || userlastname.length > 50 || !lastNameRegex.test(userlastname)) {
        lastNameMsg.classList.remove('d-none' , 'text-green');
        lastNameMsg.classList.add('d-block', 'text-red');

        lastNameMsg.textContent =
            'خطا: نام خانوادگی باید حداقل ۳ کاراکتر و حداکثر 50 کاراکتر و شامل حروف فارسی باشد.';
    } else {
        lastNameMsg.classList.remove('d-none' , 'text-red');
        lastNameMsg.classList.add('d-block', 'text-green');

        lastNameMsg.textContent = 'موفق: ورودی مجاز است.';
    }
});

// اعتبارسنجی شماره تماس

userPhone.addEventListener('input', function (event) {
    event.preventDefault
    let userphone = userPhone.value.trim();

    if (userphone.length < 11 || userphone.length > 11 || !phoneRegex.test(userphone)) {
        phoneMsg.classList.remove('d-none' , 'text-green');
        phoneMsg.classList.add('d-block', 'text-red');

        phoneMsg.textContent ='شماره تماس باید با 09 شروع شود و دقیقاً ۱۱ رقم باشد.';
    } else {
        phoneMsg.classList.remove('d-none' , 'text-red');
        phoneMsg.classList.add('d-block', 'text-green');

        phoneMsg.textContent = 'موفق: ورودی مجاز است.';
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




const nationalCodeInput = document.getElementById("nationalCode");
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

// اعتبارسنجی رشته تحصیلی

userFieldOfStudy.addEventListener('input', function (event) {
    event.preventDefault
    let userfieldofstudy = userFieldOfStudy.value.trim();

    if (userfieldofstudy.length < 2 || userfieldofstudy.length > 100 || !userFieldOfStudyRegex.test(userfieldofstudy)) {
        fieldOfStudyMsg.classList.remove('d-none' , 'text-green');
        fieldOfStudyMsg.classList.add('d-block', 'text-red');

        fieldOfStudyMsg.textContent ='خطا: رشته تحصیلی نامعتبر';
    } else {
        fieldOfStudyMsg.classList.remove('d-none' , 'text-red');
        fieldOfStudyMsg.classList.add('d-block', 'text-green');

        fieldOfStudyMsg.textContent = 'موفق: ورودی مجاز است.';
    }
});

// تقویم

const input = document.getElementById("birthDate");
const calendar = document.getElementById("calendar");
const calendarBtn = document.getElementById("calendarBtn");
const monthYear = document.getElementById("monthYear");
const grid = document.getElementById("calendarGrid");
const prevBtn = document.getElementById("prevMonth");
const nextBtn = document.getElementById("nextMonth");

const months = [
    "فروردین", "اردیبهشت", "خرداد",
    "تیر", "مرداد", "شهریور",
    "مهر", "آبان", "آذر",
    "دی", "بهمن", "اسفند"
];

const weekdays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

const fa = value =>
    String(value).replace(/\d/g, d => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);

const div = (a, b) => Math.floor(a / b);
const mod = (a, b) => a - Math.floor(a / b) * b;

// نقاط شکست الگوریتم تقویم جلالی
const breaks = [
    -61, 9, 38, 199, 426, 686, 756, 818,
    1111, 1181, 1210, 1635, 2060, 2097,
    2192, 2262, 2324, 2394, 2456, 3178
];

// محاسبه اطلاعات سال شمسی
function jalCal(jy) {
    if (
        jy < breaks[0] ||
        jy >= breaks[breaks.length - 1]
    ) {
        throw new Error("سال خارج از محدوده الگوریتم است.");
    }

    const gy = jy + 621;
    let leapJ = -14;
    let jp = breaks[0];
    let jm;
    let jump;

    for (let i = 1; i < breaks.length; i++) {
        jm = breaks[i];
        jump = jm - jp;

        if (jy < jm) break;

        leapJ += div(jump, 33) * 8
            + div(mod(jump, 33), 4);

        jp = jm;
    }

    const n = jy - jp;

    leapJ += div(n, 33) * 8
        + div(mod(n, 33) + 3, 4);

    if (mod(jump, 33) === 4 && jump - n === 4) {
        leapJ++;
    }

    const leapG = div(gy, 4)
        - div((div(gy, 100) + 1) * 3, 4)
        - 150;

    const march = 20 + leapJ - leapG;

    let leap = mod(mod(n + 1, 33) - 1, 4);

    if (leap === -1) {
        leap = 4;
    }

    return { gy, march, leap };
}

// زمان شروع سال شمسی
function yearStart(jy) {
    const { gy, march } = jalCal(jy);
    return Date.UTC(gy, 2, march);
}

// تبدیل تاریخ میلادی به شمسی
function toJalali(date) {
    const gy = date.getFullYear();

    const timestamp = Date.UTC(
        gy,
        date.getMonth(),
        date.getDate()
    );

    let jy = gy - 621;

    if (timestamp < yearStart(jy)) {
        jy--;
    }

    const dayOfYear = Math.floor(
        (timestamp - yearStart(jy)) / 86400000
    );

    let jm;
    let jd;

    if (dayOfYear < 186) {
        jm = div(dayOfYear, 31) + 1;
        jd = mod(dayOfYear, 31) + 1;
    } else {
        const remaining = dayOfYear - 186;
        jm = div(remaining, 30) + 7;
        jd = mod(remaining, 30) + 1;
    }

    return { jy, jm, jd };
}

// تعداد روزهای ماه
function monthLength(jy, jm) {
    if (jm <= 6) return 31;
    if (jm <= 11) return 30;

    return (
        yearStart(jy + 1) - yearStart(jy)
    ) / 86400000 - 336;
}

// روز هفته اولین روز ماه؛ شنبه = صفر
function firstWeekday(jy, jm) {
    const offset = jm <= 6
        ? (jm - 1) * 31
        : 186 + (jm - 7) * 30;

    const date = new Date(
        yearStart(jy) + offset * 86400000
    );

    return (date.getUTCDay() + 1) % 7;
}

// مقایسه دو تاریخ شمسی
function compareDates(a, b) {
    if (a.jy !== b.jy) return a.jy - b.jy;
    if (a.jm !== b.jm) return a.jm - b.jm;
    return a.jd - b.jd;
}

const today = toJalali(new Date());

let year = today.jy;
let month = today.jm;
let selectedDate = null;
let choosingYearMonth = false;

// باز و بسته کردن تقویم
function toggleCalendar() {
    const isOpen = calendar.classList.contains("show");

    calendar.classList.toggle("show", !isOpen);

    if (!isOpen) {
        choosingYearMonth = false;
        renderCalendar();
    }
}

input.addEventListener("click", toggleCalendar);
calendarBtn.addEventListener("click", toggleCalendar);

// ساخت عنوان تقویم
function renderCalendar() {
    monthYear.textContent =
        `${months[month - 1]} ${fa(year)}`;

    grid.innerHTML = "";

    if (choosingYearMonth) {
        renderYearMonthSelector();
        return;
    }

    // نام روزهای هفته
    weekdays.forEach(day => {
        const cell = document.createElement("div");
        cell.className = "weekday";
        cell.textContent = day;
        grid.appendChild(cell);
    });

    const offset = firstWeekday(year, month);
    const totalDays = monthLength(year, month);

    // خانه‌های خالی پیش از روز اول
    for (let i = 0; i < offset; i++) {
        grid.appendChild(document.createElement("div"));
    }

    // روزهای ماه
    for (let day = 1; day <= totalDays; day++) {
        const cell = document.createElement("div");

        cell.className = "day";
        cell.textContent = fa(day);

        const date = {
            jy: year,
            jm: month,
            jd: day
        };

        const isFuture = compareDates(date, today) > 0;

        if (isFuture) {
            cell.classList.add("disabled");
        } else {
            cell.addEventListener("click", () => {
                selectDate(date);
            });
        }

        if (
            selectedDate &&
            selectedDate.jy === year &&
            selectedDate.jm === month &&
            selectedDate.jd === day
        ) {
            cell.classList.add("selected");
        }

        if (compareDates(date, today) === 0) {
            cell.classList.add("today");
        }

        grid.appendChild(cell);
    }
}

// انتخاب مستقیم سال و ماه
function renderYearMonthSelector() {
    const selectors = document.createElement("div");

    selectors.className = "calendar-selectors";
    selectors.style.gridColumn = "1 / -1";

    const monthSelect = document.createElement("select");
    const yearSelect = document.createElement("select");
    const confirmBtn = document.createElement("button");

    // فهرست ماه‌ها
    months.forEach((name, index) => {
        const option = document.createElement("option");

        option.value = index + 1;
        option.textContent = name;
        option.selected = index + 1 === month;

        monthSelect.appendChild(option);
    });

    // فهرست ۱۰۰ سال اخیر تا سال جاری
    for (let y = today.jy; y >= today.jy - 100; y--) {
        const option = document.createElement("option");

        option.value = y;
        option.textContent = fa(y);
        option.selected = y === year;

        yearSelect.appendChild(option);
    }

    confirmBtn.type = "button";
    confirmBtn.textContent = "تأیید";

    confirmBtn.addEventListener("click", () => {
        const newYear = Number(yearSelect.value);
        const newMonth = Number(monthSelect.value);

        // اگر روز انتخاب‌شده در ماه جدید وجود ندارد،
        // آن را به آخرین روز ماه محدود می‌کنیم.
        if (selectedDate) {
            selectedDate = null;
        }

        year = newYear;
        month = newMonth;

        choosingYearMonth = false;
        renderCalendar();
    });

    selectors.append(
        monthSelect,
        yearSelect,
        confirmBtn
    );

    grid.appendChild(selectors);
}

// کلیک روی عنوان ماه و سال
monthYear.addEventListener("click", () => {
    choosingYearMonth = !choosingYearMonth;
    renderCalendar();
});

// انتخاب روز
function selectDate(date) {
    selectedDate = date;

    const formattedMonth = String(date.jm).padStart(2, "0");
    const formattedDay = String(date.jd).padStart(2, "0");

    input.value = fa(
        `${date.jy}/${formattedMonth}/${formattedDay}`
    );

    calendar.classList.remove("show");
    choosingYearMonth = false;
}

// ماه قبل
prevBtn.addEventListener("click", () => {
    month--;

    if (month < 1) {
        month = 12;
        year--;
    }

    renderCalendar();
});

// ماه بعد
nextBtn.addEventListener("click", () => {
    month++;

    if (month > 12) {
        month = 1;
        year++;
    }

    renderCalendar();
});

// بستن با کلیک بیرون تقویم
document.addEventListener("click", event => {
    if (!event.target.closest("#datePicker")) {
        calendar.classList.remove("show");
        choosingYearMonth = false;
    }
});

// بستن با Escape
document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        calendar.classList.remove("show");
        choosingYearMonth = false;
    }
});


// تقویم


// استان و شهرستان

const provinceSelect = document.getElementById("province");
const citySelect = document.getElementById("city");


// بارگذاری اطلاعات استان‌ها و شهرستان‌ها

const provinces = [
  {
    "id": 100,
    "name": "مرکزی",
    "slug": "مرکزی",
    "tel_prefix": "086"
  },
  {
    "id": 101,
    "name": "گیلان",
    "slug": "گیلان",
    "tel_prefix": "013"
  },
  {
    "id": 102,
    "name": "مازندران",
    "slug": "مازندران",
    "tel_prefix": "011"
  },
  {
    "id": 103,
    "name": "آذربایجان شرقی",
    "slug": "آذربایجان-شرقی",
    "tel_prefix": "041"
  },
  {
    "id": 104,
    "name": "آذربایجان غربی",
    "slug": "آذربایجان-غربی",
    "tel_prefix": "044"
  },
  {
    "id": 105,
    "name": "کرمانشاه",
    "slug": "کرمانشاه",
    "tel_prefix": "083"
  },
  {
    "id": 106,
    "name": "خوزستان",
    "slug": "خوزستان",
    "tel_prefix": "061"
  },
  {
    "id": 107,
    "name": "فارس",
    "slug": "فارس",
    "tel_prefix": "071"
  },
  {
    "id": 108,
    "name": "کرمان",
    "slug": "کرمان",
    "tel_prefix": "034"
  },
  {
    "id": 109,
    "name": "خراسان رضوی",
    "slug": "خراسان-رضوی",
    "tel_prefix": "051"
  },
  {
    "id": 110,
    "name": "اصفهان",
    "slug": "اصفهان",
    "tel_prefix": "031"
  },
  {
    "id": 111,
    "name": "سیستان و بلوچستان",
    "slug": "سیستان-و-بلوچستان",
    "tel_prefix": "054"
  },
  {
    "id": 112,
    "name": "کردستان",
    "slug": "کردستان",
    "tel_prefix": "087"
  },
  {
    "id": 113,
    "name": "همدان",
    "slug": "همدان",
    "tel_prefix": "081"
  },
  {
    "id": 114,
    "name": "چهارمحال و بختیاری",
    "slug": "چهارمحال-و-بختیاری",
    "tel_prefix": "038"
  },
  {
    "id": 115,
    "name": "لرستان",
    "slug": "لرستان",
    "tel_prefix": "066"
  },
  {
    "id": 116,
    "name": "ایلام",
    "slug": "ایلام",
    "tel_prefix": "084"
  },
  {
    "id": 117,
    "name": "کهگیلویه و بویراحمد",
    "slug": "کهگیلویه-و-بویراحمد",
    "tel_prefix": "074"
  },
  {
    "id": 118,
    "name": "بوشهر",
    "slug": "بوشهر",
    "tel_prefix": "077"
  },
  {
    "id": 119,
    "name": "زنجان",
    "slug": "زنجان",
    "tel_prefix": "024"
  },
  {
    "id": 120,
    "name": "سمنان",
    "slug": "سمنان",
    "tel_prefix": "023"
  },
  {
    "id": 121,
    "name": "یزد",
    "slug": "یزد",
    "tel_prefix": "035"
  },
  {
    "id": 122,
    "name": "هرمزگان",
    "slug": "هرمزگان",
    "tel_prefix": "076"
  },
  {
    "id": 123,
    "name": "تهران",
    "slug": "تهران",
    "tel_prefix": "021"
  },
  {
    "id": 124,
    "name": "اردبیل",
    "slug": "اردبیل",
    "tel_prefix": "045"
  },
  {
    "id": 125,
    "name": "قم",
    "slug": "قم",
    "tel_prefix": "025"
  },
  {
    "id": 126,
    "name": "قزوین",
    "slug": "قزوین",
    "tel_prefix": "028"
  },
  {
    "id": 127,
    "name": "گلستان",
    "slug": "گلستان",
    "tel_prefix": "017"
  },
  {
    "id": 128,
    "name": "خراسان شمالی",
    "slug": "خراسان-شمالی",
    "tel_prefix": "058"
  },
  {
    "id": 129,
    "name": "خراسان جنوبی",
    "slug": "خراسان-جنوبی",
    "tel_prefix": "056"
  },
  {
    "id": 130,
    "name": "البرز",
    "slug": "البرز",
    "tel_prefix": "026"
  }
]

const counties = [
  {
    "id": 1000001,
    "name": "اراک",
    "slug": "اراک",
    "province_id": 100
  },
  {
    "id": 1000002,
    "name": "آشتیان",
    "slug": "آشتیان",
    "province_id": 100
  },
  {
    "id": 1000003,
    "name": "تفرش",
    "slug": "تفرش",
    "province_id": 100
  },
  {
    "id": 1000004,
    "name": "خمین",
    "slug": "خمین",
    "province_id": 100
  },
  {
    "id": 1000005,
    "name": "دلیجان",
    "slug": "دلیجان",
    "province_id": 100
  },
  {
    "id": 1000006,
    "name": "ساوه",
    "slug": "ساوه",
    "province_id": 100
  },
  {
    "id": 1000007,
    "name": "شازند",
    "slug": "شازند",
    "province_id": 100
  },
  {
    "id": 1000009,
    "name": "محلات",
    "slug": "محلات",
    "province_id": 100
  },
  {
    "id": 1010001,
    "name": "آستارا",
    "slug": "آستارا",
    "province_id": 101
  },
  {
    "id": 1010002,
    "name": "آستانه اشرفیه",
    "slug": "آستانه-اشرفیه",
    "province_id": 101
  },
  {
    "id": 1010003,
    "name": "بندرانزلی",
    "slug": "بندرانزلی",
    "province_id": 101
  },
  {
    "id": 1010004,
    "name": "طوالش",
    "slug": "طوالش",
    "province_id": 101
  },
  {
    "id": 1010005,
    "name": "رشت",
    "slug": "رشت",
    "province_id": 101
  },
  {
    "id": 1010006,
    "name": "رودبار",
    "slug": "رودبار",
    "province_id": 101
  },
  {
    "id": 1010007,
    "name": "رودسر",
    "slug": "رودسر",
    "province_id": 101
  },
  {
    "id": 1010008,
    "name": "صومعه سرا",
    "slug": "صومعه-سرا",
    "province_id": 101
  },
  {
    "id": 1010009,
    "name": "فومن",
    "slug": "فومن",
    "province_id": 101
  },
  {
    "id": 1020001,
    "name": "آمل",
    "slug": "آمل",
    "province_id": 102
  },
  {
    "id": 1020002,
    "name": "بابل",
    "slug": "بابل",
    "province_id": 102
  },
  {
    "id": 1020004,
    "name": "بهشهر",
    "slug": "بهشهر",
    "province_id": 102
  },
  {
    "id": 1020005,
    "name": "تنکابن",
    "slug": "تنکابن",
    "province_id": 102
  },
  {
    "id": 1020006,
    "name": "رامسر",
    "slug": "رامسر",
    "province_id": 102
  },
  {
    "id": 1020007,
    "name": "ساری",
    "slug": "ساری",
    "province_id": 102
  },
  {
    "id": 1020008,
    "name": "سوادکوه",
    "slug": "سوادکوه",
    "province_id": 102
  },
  {
    "id": 1030002,
    "name": "اهر",
    "slug": "اهر",
    "province_id": 103
  },
  {
    "id": 1030003,
    "name": "تبریز",
    "slug": "تبریز",
    "province_id": 103
  },
  {
    "id": 1030005,
    "name": "سراب",
    "slug": "سراب",
    "province_id": 103
  },
  {
    "id": 1030006,
    "name": "مراغه",
    "slug": "مراغه",
    "province_id": 103
  },
  {
    "id": 1030007,
    "name": "مرند",
    "slug": "مرند",
    "province_id": 103
  },
  {
    "id": 1040001,
    "name": "ارومیه",
    "slug": "ارومیه",
    "province_id": 104
  },
  {
    "id": 1040002,
    "name": "پیرانشهر",
    "slug": "پیرانشهر",
    "province_id": 104
  },
  {
    "id": 1040003,
    "name": "خوی",
    "slug": "خوی",
    "province_id": 104
  },
  {
    "id": 1040004,
    "name": "سردشت",
    "slug": "سردشت",
    "province_id": 104
  },
  {
    "id": 1040005,
    "name": "سلماس",
    "slug": "سلماس",
    "province_id": 104
  },
  {
    "id": 1040006,
    "name": "ماکو",
    "slug": "ماکو",
    "province_id": 104
  },
  {
    "id": 1040007,
    "name": "مهاباد",
    "slug": "مهاباد",
    "province_id": 104
  },
  {
    "id": 1040008,
    "name": "میاندوآب",
    "slug": "میاندوآب",
    "province_id": 104
  },
  {
    "id": 1040009,
    "name": "نقده",
    "slug": "نقده",
    "province_id": 104
  },
  {
    "id": 1050001,
    "name": "اسلام آبادغرب",
    "slug": "اسلام-آبادغرب",
    "province_id": 105
  },
  {
    "id": 1050002,
    "name": "کرمانشاه",
    "slug": "کرمانشاه",
    "province_id": 105
  },
  {
    "id": 1050003,
    "name": "پاوه",
    "slug": "پاوه",
    "province_id": 105
  },
  {
    "id": 1050004,
    "name": "سرپل ذهاب",
    "slug": "سرپل-ذهاب",
    "province_id": 105
  },
  {
    "id": 1050005,
    "name": "سنقر",
    "slug": "سنقر",
    "province_id": 105
  },
  {
    "id": 1050006,
    "name": "قصرشیرین",
    "slug": "قصرشیرین",
    "province_id": 105
  },
  {
    "id": 1050007,
    "name": "کنگاور",
    "slug": "کنگاور",
    "province_id": 105
  },
  {
    "id": 1050008,
    "name": "گیلانغرب",
    "slug": "گیلانغرب",
    "province_id": 105
  },
  {
    "id": 1050009,
    "name": "جوانرود",
    "slug": "جوانرود",
    "province_id": 105
  },
  {
    "id": 1060001,
    "name": "آبادان",
    "slug": "آبادان",
    "province_id": 106
  },
  {
    "id": 1060002,
    "name": "اندیمشک",
    "slug": "اندیمشک",
    "province_id": 106
  },
  {
    "id": 1060003,
    "name": "اهواز",
    "slug": "اهواز",
    "province_id": 106
  },
  {
    "id": 1060004,
    "name": "ایذه",
    "slug": "ایذه",
    "province_id": 106
  },
  {
    "id": 1060005,
    "name": "بندر ماهشهر",
    "slug": "بندرماهشهر",
    "province_id": 106
  },
  {
    "id": 1060006,
    "name": "بهبهان",
    "slug": "بهبهان",
    "province_id": 106
  },
  {
    "id": 1060007,
    "name": "خرمشهر",
    "slug": "خرمشهر",
    "province_id": 106
  },
  {
    "id": 1060008,
    "name": "دزفول",
    "slug": "دزفول",
    "province_id": 106
  },
  {
    "id": 1060009,
    "name": "دشت آزادگان",
    "slug": "دشت-آزادگان",
    "province_id": 106
  },
  {
    "id": 1070001,
    "name": "آباده",
    "slug": "آباده",
    "province_id": 107
  },
  {
    "id": 1070002,
    "name": "استهبان",
    "slug": "استهبان",
    "province_id": 107
  },
  {
    "id": 1070003,
    "name": "اقلید",
    "slug": "اقلید",
    "province_id": 107
  },
  {
    "id": 1070004,
    "name": "جهرم",
    "slug": "جهرم",
    "province_id": 107
  },
  {
    "id": 1070005,
    "name": "داراب",
    "slug": "داراب",
    "province_id": 107
  },
  {
    "id": 1070006,
    "name": "سپیدان",
    "slug": "سپیدان",
    "province_id": 107
  },
  {
    "id": 1070007,
    "name": "شیراز",
    "slug": "شیراز",
    "province_id": 107
  },
  {
    "id": 1070008,
    "name": "فسا",
    "slug": "فسا",
    "province_id": 107
  },
  {
    "id": 1070009,
    "name": "فیروزآباد",
    "slug": "فیروزآباد",
    "province_id": 107
  },
  {
    "id": 1080001,
    "name": "بافت",
    "slug": "بافت",
    "province_id": 108
  },
  {
    "id": 1080002,
    "name": "بم",
    "slug": "بم",
    "province_id": 108
  },
  {
    "id": 1080003,
    "name": "جیرفت",
    "slug": "جیرفت",
    "province_id": 108
  },
  {
    "id": 1080004,
    "name": "رفسنجان",
    "slug": "رفسنجان",
    "province_id": 108
  },
  {
    "id": 1080005,
    "name": "زرند",
    "slug": "زرند",
    "province_id": 108
  },
  {
    "id": 1080006,
    "name": "سیرجان",
    "slug": "سیرجان",
    "province_id": 108
  },
  {
    "id": 1080007,
    "name": "شهربابک",
    "slug": "شهربابک",
    "province_id": 108
  },
  {
    "id": 1080008,
    "name": "کرمان",
    "slug": "کرمان",
    "province_id": 108
  },
  {
    "id": 1080009,
    "name": "کهنوج",
    "slug": "کهنوج",
    "province_id": 108
  },
  {
    "id": 1090004,
    "name": "تایباد",
    "slug": "تایباد",
    "province_id": 109
  },
  {
    "id": 1090005,
    "name": "تربت حیدریه",
    "slug": "تربت-حیدریه",
    "province_id": 109
  },
  {
    "id": 1090006,
    "name": "تربت جام",
    "slug": "تربت-جام",
    "province_id": 109
  },
  {
    "id": 1090007,
    "name": "درگز",
    "slug": "درگز",
    "province_id": 109
  },
  {
    "id": 1090008,
    "name": "سبزوار",
    "slug": "سبزوار",
    "province_id": 109
  },
  {
    "id": 1100001,
    "name": "اردستان",
    "slug": "اردستان",
    "province_id": 110
  },
  {
    "id": 1100002,
    "name": "اصفهان",
    "slug": "اصفهان",
    "province_id": 110
  },
  {
    "id": 1100003,
    "name": "خمینی شهر",
    "slug": "خمینی-شهر",
    "province_id": 110
  },
  {
    "id": 1100004,
    "name": "خوانسار",
    "slug": "خوانسار",
    "province_id": 110
  },
  {
    "id": 1100005,
    "name": "سمیرم",
    "slug": "سمیرم",
    "province_id": 110
  },
  {
    "id": 1100006,
    "name": "فریدن",
    "slug": "فریدن",
    "province_id": 110
  },
  {
    "id": 1100007,
    "name": "فریدونشهر",
    "slug": "فریدونشهر",
    "province_id": 110
  },
  {
    "id": 1100008,
    "name": "فلاورجان",
    "slug": "فلاورجان",
    "province_id": 110
  },
  {
    "id": 1100009,
    "name": "شهرضا",
    "slug": "شهرضا",
    "province_id": 110
  },
  {
    "id": 1110001,
    "name": "ایرانشهر",
    "slug": "ایرانشهر",
    "province_id": 111
  },
  {
    "id": 1110002,
    "name": "چاه بهار",
    "slug": "چاه-بهار",
    "province_id": 111
  },
  {
    "id": 1110003,
    "name": "خاش",
    "slug": "خاش",
    "province_id": 111
  },
  {
    "id": 1110004,
    "name": "زابل",
    "slug": "زابل",
    "province_id": 111
  },
  {
    "id": 1110005,
    "name": "زاهدان",
    "slug": "زاهدان",
    "province_id": 111
  },
  {
    "id": 1110006,
    "name": "سراوان",
    "slug": "سراوان",
    "province_id": 111
  },
  {
    "id": 1110007,
    "name": "نیک شهر",
    "slug": "نیک-شهر",
    "province_id": 111
  },
  {
    "id": 1110008,
    "name": "راسک",
    "slug": "راسک",
    "province_id": 111
  },
  {
    "id": 1110009,
    "name": "کنارک",
    "slug": "کنارک",
    "province_id": 111
  },
  {
    "id": 1120001,
    "name": "بانه",
    "slug": "بانه",
    "province_id": 112
  },
  {
    "id": 1120002,
    "name": "بیجار",
    "slug": "بیجار",
    "province_id": 112
  },
  {
    "id": 1120003,
    "name": "سقز",
    "slug": "سقز",
    "province_id": 112
  },
  {
    "id": 1120004,
    "name": "سنندج",
    "slug": "سنندج",
    "province_id": 112
  },
  {
    "id": 1120005,
    "name": "قروه",
    "slug": "قروه",
    "province_id": 112
  },
  {
    "id": 1120006,
    "name": "مریوان",
    "slug": "مریوان",
    "province_id": 112
  },
  {
    "id": 1120007,
    "name": "دیواندره",
    "slug": "دیواندره",
    "province_id": 112
  },
  {
    "id": 1120008,
    "name": "کامیاران",
    "slug": "کامیاران",
    "province_id": 112
  },
  {
    "id": 1120009,
    "name": "سروآباد",
    "slug": "سروآباد",
    "province_id": 112
  },
  {
    "id": 1130001,
    "name": "تویسرکان",
    "slug": "تویسرکان",
    "province_id": 113
  },
  {
    "id": 1130002,
    "name": "ملایر",
    "slug": "ملایر",
    "province_id": 113
  },
  {
    "id": 1130003,
    "name": "نهاوند",
    "slug": "نهاوند",
    "province_id": 113
  },
  {
    "id": 1130004,
    "name": "همدان",
    "slug": "همدان",
    "province_id": 113
  },
  {
    "id": 1130005,
    "name": "کبودرآهنگ",
    "slug": "کبودرآهنگ",
    "province_id": 113
  },
  {
    "id": 1130006,
    "name": "اسدآباد",
    "slug": "اسدآباد",
    "province_id": 113
  },
  {
    "id": 1130007,
    "name": "بهار",
    "slug": "بهار",
    "province_id": 113
  },
  {
    "id": 1130008,
    "name": "رزن",
    "slug": "رزن",
    "province_id": 113
  },
  {
    "id": 1130009,
    "name": "فامنین",
    "slug": "فامنین",
    "province_id": 113
  },
  {
    "id": 1140001,
    "name": "بروجن",
    "slug": "بروجن",
    "province_id": 114
  },
  {
    "id": 1140002,
    "name": "شهرکرد",
    "slug": "شهرکرد",
    "province_id": 114
  },
  {
    "id": 1140003,
    "name": "فارسان",
    "slug": "فارسان",
    "province_id": 114
  },
  {
    "id": 1140004,
    "name": "لردگان",
    "slug": "لردگان",
    "province_id": 114
  },
  {
    "id": 1140005,
    "name": "اردل",
    "slug": "اردل",
    "province_id": 114
  },
  {
    "id": 1140006,
    "name": "کوهرنگ",
    "slug": "کوهرنگ",
    "province_id": 114
  },
  {
    "id": 1140007,
    "name": "کیار",
    "slug": "کیار",
    "province_id": 114
  },
  {
    "id": 1140008,
    "name": "سامان",
    "slug": "سامان",
    "province_id": 114
  },
  {
    "id": 1140009,
    "name": "بن",
    "slug": "بن",
    "province_id": 114
  },
  {
    "id": 1150001,
    "name": "الیگودرز",
    "slug": "الیگودرز",
    "province_id": 115
  },
  {
    "id": 1150002,
    "name": "بروجرد",
    "slug": "بروجرد",
    "province_id": 115
  },
  {
    "id": 1150003,
    "name": "خرم آباد",
    "slug": "خرم-آباد",
    "province_id": 115
  },
  {
    "id": 1150004,
    "name": "دلفان",
    "slug": "دلفان",
    "province_id": 115
  },
  {
    "id": 1150005,
    "name": "دورود",
    "slug": "دورود",
    "province_id": 115
  },
  {
    "id": 1150006,
    "name": "کوهدشت",
    "slug": "کوهدشت",
    "province_id": 115
  },
  {
    "id": 1150007,
    "name": "ازنا",
    "slug": "ازنا",
    "province_id": 115
  },
  {
    "id": 1150008,
    "name": "پلدختر",
    "slug": "پلدختر",
    "province_id": 115
  },
  {
    "id": 1150009,
    "name": "سلسله",
    "slug": "سلسله",
    "province_id": 115
  },
  {
    "id": 1160001,
    "name": "ایلام",
    "slug": "ایلام",
    "province_id": 116
  },
  {
    "id": 1160002,
    "name": "دره شهر",
    "slug": "دره-شهر",
    "province_id": 116
  },
  {
    "id": 1160003,
    "name": "دهلران",
    "slug": "دهلران",
    "province_id": 116
  },
  {
    "id": 1160004,
    "name": "چرداول",
    "slug": "چرداول",
    "province_id": 116
  },
  {
    "id": 1160005,
    "name": "مهران",
    "slug": "مهران",
    "province_id": 116
  },
  {
    "id": 1160006,
    "name": "آبدانان",
    "slug": "آبدانان",
    "province_id": 116
  },
  {
    "id": 1160007,
    "name": "ایوان",
    "slug": "ایوان",
    "province_id": 116
  },
  {
    "id": 1160008,
    "name": "ملکشاهی",
    "slug": "ملکشاهی",
    "province_id": 116
  },
  {
    "id": 1160009,
    "name": "سیروان",
    "slug": "سیروان",
    "province_id": 116
  },
  {
    "id": 1170001,
    "name": "بویراحمد",
    "slug": "بویراحمد",
    "province_id": 117
  },
  {
    "id": 1170002,
    "name": "کهگیلویه",
    "slug": "کهگیلویه",
    "province_id": 117
  },
  {
    "id": 1170003,
    "name": "گچساران",
    "slug": "گچساران",
    "province_id": 117
  },
  {
    "id": 1170004,
    "name": "دنا",
    "slug": "دنا",
    "province_id": 117
  },
  {
    "id": 1170005,
    "name": "بهمیی",
    "slug": "بهمیی",
    "province_id": 117
  },
  {
    "id": 1170006,
    "name": "چرام",
    "slug": "چرام",
    "province_id": 117
  },
  {
    "id": 1170007,
    "name": "باشت",
    "slug": "باشت",
    "province_id": 117
  },
  {
    "id": 1170008,
    "name": "لنده",
    "slug": "لنده",
    "province_id": 117
  },
  {
    "id": 1170009,
    "name": "مارگون",
    "slug": "مارگون",
    "province_id": 117
  },
  {
    "id": 1180001,
    "name": "بوشهر",
    "slug": "بوشهر",
    "province_id": 118
  },
  {
    "id": 1180002,
    "name": "تنگستان",
    "slug": "تنگستان",
    "province_id": 118
  },
  {
    "id": 1180003,
    "name": "دشتستان",
    "slug": "دشتستان",
    "province_id": 118
  },
  {
    "id": 1180004,
    "name": "دشتی",
    "slug": "دشتی",
    "province_id": 118
  },
  {
    "id": 1180005,
    "name": "دیر",
    "slug": "دیر",
    "province_id": 118
  },
  {
    "id": 1180006,
    "name": "کنگان",
    "slug": "کنگان",
    "province_id": 118
  },
  {
    "id": 1180007,
    "name": "گناوه",
    "slug": "گناوه",
    "province_id": 118
  },
  {
    "id": 1180008,
    "name": "دیلم",
    "slug": "دیلم",
    "province_id": 118
  },
  {
    "id": 1180009,
    "name": "جم",
    "slug": "جم",
    "province_id": 118
  },
  {
    "id": 1190001,
    "name": "ابهر",
    "slug": "ابهر",
    "province_id": 119
  },
  {
    "id": 1190003,
    "name": "خدابنده",
    "slug": "خدابنده",
    "province_id": 119
  },
  {
    "id": 1190004,
    "name": "زنجان",
    "slug": "زنجان",
    "province_id": 119
  },
  {
    "id": 1190006,
    "name": "ایجرود",
    "slug": "ایجرود",
    "province_id": 119
  },
  {
    "id": 1190007,
    "name": "خرمدره",
    "slug": "خرمدره",
    "province_id": 119
  },
  {
    "id": 1190008,
    "name": "طارم",
    "slug": "طارم",
    "province_id": 119
  },
  {
    "id": 1190009,
    "name": "ماهنشان",
    "slug": "ماهنشان",
    "province_id": 119
  },
  {
    "id": 1200001,
    "name": "دامغان",
    "slug": "دامغان",
    "province_id": 120
  },
  {
    "id": 1200002,
    "name": "سمنان",
    "slug": "سمنان",
    "province_id": 120
  },
  {
    "id": 1200003,
    "name": "شاهرود",
    "slug": "شاهرود",
    "province_id": 120
  },
  {
    "id": 1200004,
    "name": "گرمسار",
    "slug": "گرمسار",
    "province_id": 120
  },
  {
    "id": 1200005,
    "name": "مهدی شهر",
    "slug": "مهدی-شهر",
    "province_id": 120
  },
  {
    "id": 1200006,
    "name": "آرادان",
    "slug": "آرادان",
    "province_id": 120
  },
  {
    "id": 1200007,
    "name": "میامی",
    "slug": "میامی",
    "province_id": 120
  },
  {
    "id": 1200008,
    "name": "سرخه",
    "slug": "سرخه",
    "province_id": 120
  },
  {
    "id": 1210001,
    "name": "اردکان",
    "slug": "اردکان",
    "province_id": 121
  },
  {
    "id": 1210002,
    "name": "بافق",
    "slug": "بافق",
    "province_id": 121
  },
  {
    "id": 1210003,
    "name": "تفت",
    "slug": "تفت",
    "province_id": 121
  },
  {
    "id": 1210004,
    "name": "مهریز",
    "slug": "مهریز",
    "province_id": 121
  },
  {
    "id": 1210005,
    "name": "یزد",
    "slug": "یزد",
    "province_id": 121
  },
  {
    "id": 1210006,
    "name": "میبد",
    "slug": "میبد",
    "province_id": 121
  },
  {
    "id": 1210007,
    "name": "ابرکوه",
    "slug": "ابرکوه",
    "province_id": 121
  },
  {
    "id": 1210008,
    "name": "اشکذر",
    "slug": "اشکذر",
    "province_id": 121
  },
  {
    "id": 1210009,
    "name": "خاتم",
    "slug": "خاتم",
    "province_id": 121
  },
  {
    "id": 1220001,
    "name": "ابوموسی",
    "slug": "ابوموسی",
    "province_id": 122
  },
  {
    "id": 1220002,
    "name": "بندر عباس",
    "slug": "بندر-عباس",
    "province_id": 122
  },
  {
    "id": 1220003,
    "name": "بندر لنگه",
    "slug": "بندر-لنگه",
    "province_id": 122
  },
  {
    "id": 1220004,
    "name": "قشم",
    "slug": "قشم",
    "province_id": 122
  },
  {
    "id": 1220005,
    "name": "میناب",
    "slug": "میناب",
    "province_id": 122
  },
  {
    "id": 1220006,
    "name": "جاسک",
    "slug": "جاسک",
    "province_id": 122
  },
  {
    "id": 1220007,
    "name": "رودان",
    "slug": "رودان",
    "province_id": 122
  },
  {
    "id": 1220008,
    "name": "حاجی آباد",
    "slug": "حاجی-آباد",
    "province_id": 122
  },
  {
    "id": 1220009,
    "name": "بستک",
    "slug": "بستک",
    "province_id": 122
  },
  {
    "id": 1230001,
    "name": "تهران",
    "slug": "تهران",
    "province_id": 123
  },
  {
    "id": 1230002,
    "name": "دماوند",
    "slug": "دماوند",
    "province_id": 123
  },
  {
    "id": 1230003,
    "name": "ری",
    "slug": "ری",
    "province_id": 123
  },
  {
    "id": 1230004,
    "name": "شمیرانات",
    "slug": "شمیرانات",
    "province_id": 123
  },
  {
    "id": 1230006,
    "name": "ورامین",
    "slug": "ورامین",
    "province_id": 123
  },
  {
    "id": 1230009,
    "name": "شهریار",
    "slug": "شهریار",
    "province_id": 123
  },
  {
    "id": 1240001,
    "name": "اردبیل",
    "slug": "اردبیل",
    "province_id": 124
  },
  {
    "id": 1240002,
    "name": "بیله سوار",
    "slug": "بیله-سوار",
    "province_id": 124
  },
  {
    "id": 1240003,
    "name": "خلخال",
    "slug": "خلخال",
    "province_id": 124
  },
  {
    "id": 1240004,
    "name": "مشگین شهر",
    "slug": "مشگین-شهر",
    "province_id": 124
  },
  {
    "id": 1240005,
    "name": "گرمی",
    "slug": "گرمی",
    "province_id": 124
  },
  {
    "id": 1240006,
    "name": "پارس آباد",
    "slug": "پارس-آباد",
    "province_id": 124
  },
  {
    "id": 1240007,
    "name": "کوثر",
    "slug": "کوثر",
    "province_id": 124
  },
  {
    "id": 1240008,
    "name": "نمین",
    "slug": "نمین",
    "province_id": 124
  },
  {
    "id": 1240009,
    "name": "نیر",
    "slug": "نیر",
    "province_id": 124
  },
  {
    "id": 1250001,
    "name": "قم",
    "slug": "قم",
    "province_id": 125
  },
  {
    "id": 1250002,
    "name": "جعفرآباد",
    "slug": "جعفرآباد",
    "province_id": 125
  },
  {
    "id": 1250003,
    "name": "کهک",
    "slug": "کهک",
    "province_id": 125
  },
  {
    "id": 1260001,
    "name": "بویین زهرا",
    "slug": "بویین-زهرا",
    "province_id": 126
  },
  {
    "id": 1260002,
    "name": "تاکستان",
    "slug": "تاکستان",
    "province_id": 126
  },
  {
    "id": 1260003,
    "name": "قزوین",
    "slug": "قزوین",
    "province_id": 126
  },
  {
    "id": 1260004,
    "name": "آبیک",
    "slug": "آبیک",
    "province_id": 126
  },
  {
    "id": 1260005,
    "name": "البرز",
    "slug": "البرز",
    "province_id": 126
  },
  {
    "id": 1260006,
    "name": "آوج",
    "slug": "آوج",
    "province_id": 126
  },
  {
    "id": 1270001,
    "name": "بندرگز",
    "slug": "بندرگز",
    "province_id": 127
  },
  {
    "id": 1270002,
    "name": "ترکمن",
    "slug": "ترکمن",
    "province_id": 127
  },
  {
    "id": 1270003,
    "name": "علی آباد کتول",
    "slug": "علی-آباد-کتول",
    "province_id": 127
  },
  {
    "id": 1270004,
    "name": "کردکوی",
    "slug": "کردکوی",
    "province_id": 127
  },
  {
    "id": 1270005,
    "name": "گرگان",
    "slug": "گرگان",
    "province_id": 127
  },
  {
    "id": 1270006,
    "name": "گنبدکاووس",
    "slug": "گنبدکاووس",
    "province_id": 127
  },
  {
    "id": 1270007,
    "name": "مینودشت",
    "slug": "مینودشت",
    "province_id": 127
  },
  {
    "id": 1270008,
    "name": "آق قلا",
    "slug": "آق-قلا",
    "province_id": 127
  },
  {
    "id": 1270009,
    "name": "کلاله",
    "slug": "کلاله",
    "province_id": 127
  },
  {
    "id": 1280001,
    "name": "اسفراین",
    "slug": "اسفراین",
    "province_id": 128
  },
  {
    "id": 1280002,
    "name": "بجنورد",
    "slug": "بجنورد",
    "province_id": 128
  },
  {
    "id": 1280003,
    "name": "جاجرم",
    "slug": "جاجرم",
    "province_id": 128
  },
  {
    "id": 1280004,
    "name": "شیروان",
    "slug": "شیروان",
    "province_id": 128
  },
  {
    "id": 1280005,
    "name": "فاروج",
    "slug": "فاروج",
    "province_id": 128
  },
  {
    "id": 1280006,
    "name": "سملقان",
    "slug": "سملقان",
    "province_id": 128
  },
  {
    "id": 1280007,
    "name": "گرمه",
    "slug": "گرمه",
    "province_id": 128
  },
  {
    "id": 1280008,
    "name": "راز و جرگلان",
    "slug": "راز-و-جرگلان",
    "province_id": 128
  },
  {
    "id": 1280009,
    "name": "بام و صفی آباد",
    "slug": "بام-و-صفی-آباد",
    "province_id": 128
  },
  {
    "id": 1290001,
    "name": "بیرجند",
    "slug": "بیرجند",
    "province_id": 129
  },
  {
    "id": 1290002,
    "name": "درمیان",
    "slug": "درمیان",
    "province_id": 129
  },
  {
    "id": 1290003,
    "name": "سربیشه",
    "slug": "سربیشه",
    "province_id": 129
  },
  {
    "id": 1290004,
    "name": "قاینات",
    "slug": "قاینات",
    "province_id": 129
  },
  {
    "id": 1290005,
    "name": "نهبندان",
    "slug": "نهبندان",
    "province_id": 129
  },
  {
    "id": 1290006,
    "name": "سرایان",
    "slug": "سرایان",
    "province_id": 129
  },
  {
    "id": 1290007,
    "name": "فردوس",
    "slug": "فردوس",
    "province_id": 129
  },
  {
    "id": 1290008,
    "name": "بشرویه",
    "slug": "بشرویه",
    "province_id": 129
  },
  {
    "id": 1290009,
    "name": "زیرکوه",
    "slug": "زیرکوه",
    "province_id": 129
  },
  {
    "id": 1300001,
    "name": "کرج",
    "slug": "کرج",
    "province_id": 130
  },
  {
    "id": 1300002,
    "name": "ساوجبلاغ",
    "slug": "ساوجبلاغ",
    "province_id": 130
  },
  {
    "id": 1300003,
    "name": "نظرآباد",
    "slug": "نظرآباد",
    "province_id": 130
  },
  {
    "id": 1300004,
    "name": "طالقان",
    "slug": "طالقان",
    "province_id": 130
  },
  {
    "id": 1300005,
    "name": "اشتهارد",
    "slug": "اشتهارد",
    "province_id": 130
  },
  {
    "id": 1300006,
    "name": "فردیس",
    "slug": "فردیس",
    "province_id": 130
  },
  {
    "id": 1300007,
    "name": "چهارباغ",
    "slug": "چهارباغ",
    "province_id": 130
  },
  {
    "id": 10000010,
    "name": "زرندیه",
    "slug": "زرندیه",
    "province_id": 100
  },
  {
    "id": 10000011,
    "name": "کمیجان",
    "slug": "کمیجان",
    "province_id": 100
  },
  {
    "id": 10000012,
    "name": "خنداب",
    "slug": "خنداب",
    "province_id": 100
  },
  {
    "id": 10000013,
    "name": "فراهان",
    "slug": "فراهان",
    "province_id": 100
  },
  {
    "id": 10100010,
    "name": "لنگرود",
    "slug": "لنگرود",
    "province_id": 101
  },
  {
    "id": 10100011,
    "name": "لاهیجان",
    "slug": "لاهیجان",
    "province_id": 101
  },
  {
    "id": 10100012,
    "name": "شفت",
    "slug": "شفت",
    "province_id": 101
  },
  {
    "id": 10100013,
    "name": "املش",
    "slug": "املش",
    "province_id": 101
  },
  {
    "id": 10100014,
    "name": "رضوانشهر",
    "slug": "رضوانشهر",
    "province_id": 101
  },
  {
    "id": 10100015,
    "name": "سیاهکل",
    "slug": "سیاهکل",
    "province_id": 101
  },
  {
    "id": 10100016,
    "name": "ماسال",
    "slug": "ماسال",
    "province_id": 101
  },
  {
    "id": 10100017,
    "name": "خمام",
    "slug": "خمام",
    "province_id": 101
  },
  {
    "id": 10200010,
    "name": "قایم شهر",
    "slug": "قایم-شهر",
    "province_id": 102
  },
  {
    "id": 10200014,
    "name": "نور",
    "slug": "نور",
    "province_id": 102
  },
  {
    "id": 10200015,
    "name": "نوشهر",
    "slug": "نوشهر",
    "province_id": 102
  },
  {
    "id": 10200016,
    "name": "بابلسر",
    "slug": "بابلسر",
    "province_id": 102
  },
  {
    "id": 10200018,
    "name": "محمودآباد",
    "slug": "محمودآباد",
    "province_id": 102
  },
  {
    "id": 10200019,
    "name": "نکا",
    "slug": "نکا",
    "province_id": 102
  },
  {
    "id": 10200020,
    "name": "چالوس",
    "slug": "چالوس",
    "province_id": 102
  },
  {
    "id": 10200021,
    "name": "جویبار",
    "slug": "جویبار",
    "province_id": 102
  },
  {
    "id": 10200022,
    "name": "گلوگاه",
    "slug": "گلوگاه",
    "province_id": 102
  },
  {
    "id": 10200023,
    "name": "فریدونکنار",
    "slug": "فریدونکنار",
    "province_id": 102
  },
  {
    "id": 10200024,
    "name": "عباس آباد",
    "slug": "عباس-آباد",
    "province_id": 102
  },
  {
    "id": 10200025,
    "name": "میاندورود",
    "slug": "میاندورود",
    "province_id": 102
  },
  {
    "id": 10200026,
    "name": "سیمرغ",
    "slug": "سیمرغ",
    "province_id": 102
  },
  {
    "id": 10200027,
    "name": "سوادکوه شمالی",
    "slug": "سوادکوه-شمالی",
    "province_id": 102
  },
  {
    "id": 10200028,
    "name": "کلاردشت",
    "slug": "کلاردشت",
    "province_id": 102
  },
  {
    "id": 10300010,
    "name": "میانه",
    "slug": "میانه",
    "province_id": 103
  },
  {
    "id": 10300011,
    "name": "هشترود",
    "slug": "هشترود",
    "province_id": 103
  },
  {
    "id": 10300012,
    "name": "بناب",
    "slug": "بناب",
    "province_id": 103
  },
  {
    "id": 10300013,
    "name": "بستان آباد",
    "slug": "بستان-آباد",
    "province_id": 103
  },
  {
    "id": 10300014,
    "name": "شبستر",
    "slug": "شبستر",
    "province_id": 103
  },
  {
    "id": 10300015,
    "name": "کلیبر",
    "slug": "کلیبر",
    "province_id": 103
  },
  {
    "id": 10300016,
    "name": "هریس",
    "slug": "هریس",
    "province_id": 103
  },
  {
    "id": 10300019,
    "name": "جلفا",
    "slug": "جلفا",
    "province_id": 103
  },
  {
    "id": 10300020,
    "name": "ملکان",
    "slug": "ملکان",
    "province_id": 103
  },
  {
    "id": 10300021,
    "name": "آذرشهر",
    "slug": "آذرشهر",
    "province_id": 103
  },
  {
    "id": 10300022,
    "name": "اسکو",
    "slug": "اسکو",
    "province_id": 103
  },
  {
    "id": 10300023,
    "name": "چاراویماق",
    "slug": "چاراویماق",
    "province_id": 103
  },
  {
    "id": 10300024,
    "name": "ورزقان",
    "slug": "ورزقان",
    "province_id": 103
  },
  {
    "id": 10300025,
    "name": "عجب شیر",
    "slug": "عجب-شیر",
    "province_id": 103
  },
  {
    "id": 10300026,
    "name": "خدا آفرین",
    "slug": "خداآفرین",
    "province_id": 103
  },
  {
    "id": 10300027,
    "name": "هوراند",
    "slug": "هوراند",
    "province_id": 103
  },
  {
    "id": 10300028,
    "name": "لیلان",
    "slug": "لیلان",
    "province_id": 103
  },
  {
    "id": 10300029,
    "name": "ترکمانچای",
    "slug": "ترکمانچای",
    "province_id": 103
  },
  {
    "id": 10400010,
    "name": "بوکان",
    "slug": "بوکان",
    "province_id": 104
  },
  {
    "id": 10400011,
    "name": "شاهین دژ",
    "slug": "شاهین-دژ",
    "province_id": 104
  },
  {
    "id": 10400012,
    "name": "تکاب",
    "slug": "تکاب",
    "province_id": 104
  },
  {
    "id": 10400013,
    "name": "اشنویه",
    "slug": "اشنویه",
    "province_id": 104
  },
  {
    "id": 10400014,
    "name": "چالدران",
    "slug": "چالدران",
    "province_id": 104
  },
  {
    "id": 10400015,
    "name": "پلدشت",
    "slug": "پلدشت",
    "province_id": 104
  },
  {
    "id": 10400016,
    "name": "چایپاره",
    "slug": "چایپاره",
    "province_id": 104
  },
  {
    "id": 10400017,
    "name": "شوط",
    "slug": "شوط",
    "province_id": 104
  },
  {
    "id": 10400018,
    "name": "چهاربرج",
    "slug": "چهاربرج",
    "province_id": 104
  },
  {
    "id": 10400019,
    "name": "باروق",
    "slug": "باروق",
    "province_id": 104
  },
  {
    "id": 10400020,
    "name": "میرآباد",
    "slug": "میرآباد",
    "province_id": 104
  },
  {
    "id": 10500010,
    "name": "صحنه",
    "slug": "صحنه",
    "province_id": 105
  },
  {
    "id": 10500011,
    "name": "هرسین",
    "slug": "هرسین",
    "province_id": 105
  },
  {
    "id": 10500012,
    "name": "ثلاث باباجانی",
    "slug": "ثلاث-باباجانی",
    "province_id": 105
  },
  {
    "id": 10500013,
    "name": "دالاهو",
    "slug": "دالاهو",
    "province_id": 105
  },
  {
    "id": 10500014,
    "name": "روانسر",
    "slug": "روانسر",
    "province_id": 105
  },
  {
    "id": 10600010,
    "name": "رامهرمز",
    "slug": "رامهرمز",
    "province_id": 106
  },
  {
    "id": 10600011,
    "name": "شادگان",
    "slug": "شادگان",
    "province_id": 106
  },
  {
    "id": 10600012,
    "name": "شوشتر",
    "slug": "شوشتر",
    "province_id": 106
  },
  {
    "id": 10600013,
    "name": "مسجدسلیمان",
    "slug": "مسجدسلیمان",
    "province_id": 106
  },
  {
    "id": 10600014,
    "name": "شوش",
    "slug": "شوش",
    "province_id": 106
  },
  {
    "id": 10600015,
    "name": "باغ ملک",
    "slug": "باغ-ملک",
    "province_id": 106
  },
  {
    "id": 10600016,
    "name": "امیدیه",
    "slug": "امیدیه",
    "province_id": 106
  },
  {
    "id": 10600017,
    "name": "لالی",
    "slug": "لالی",
    "province_id": 106
  },
  {
    "id": 10600018,
    "name": "هندیجان",
    "slug": "هندیجان",
    "province_id": 106
  },
  {
    "id": 10600019,
    "name": "رامشیر",
    "slug": "رامشیر",
    "province_id": 106
  },
  {
    "id": 10600020,
    "name": "گتوند",
    "slug": "گتوند",
    "province_id": 106
  },
  {
    "id": 10600021,
    "name": "اندیکا",
    "slug": "اندیکا",
    "province_id": 106
  },
  {
    "id": 10600022,
    "name": "هفتکل",
    "slug": "هفتکل",
    "province_id": 106
  },
  {
    "id": 10600023,
    "name": "هویزه",
    "slug": "هویزه",
    "province_id": 106
  },
  {
    "id": 10600024,
    "name": "باوی",
    "slug": "باوی",
    "province_id": 106
  },
  {
    "id": 10600025,
    "name": "حمیدیه",
    "slug": "حمیدیه",
    "province_id": 106
  },
  {
    "id": 10600026,
    "name": "آغاجاری",
    "slug": "آغاجاری",
    "province_id": 106
  },
  {
    "id": 10600027,
    "name": "کارون",
    "slug": "کارون",
    "province_id": 106
  },
  {
    "id": 10600028,
    "name": "کرخه",
    "slug": "کرخه",
    "province_id": 106
  },
  {
    "id": 10600029,
    "name": "دزپارت",
    "slug": "دزپارت",
    "province_id": 106
  },
  {
    "id": 10600030,
    "name": "صیدون",
    "slug": "صیدون",
    "province_id": 106
  },
  {
    "id": 10700010,
    "name": "کازرون",
    "slug": "کازرون",
    "province_id": 107
  },
  {
    "id": 10700011,
    "name": "لارستان",
    "slug": "لارستان",
    "province_id": 107
  },
  {
    "id": 10700012,
    "name": "مرودشت",
    "slug": "مرودشت",
    "province_id": 107
  },
  {
    "id": 10700013,
    "name": "ممسنی",
    "slug": "ممسنی",
    "province_id": 107
  },
  {
    "id": 10700014,
    "name": "نی ریز",
    "slug": "نی-ریز",
    "province_id": 107
  },
  {
    "id": 10700015,
    "name": "لامرد",
    "slug": "لامرد",
    "province_id": 107
  },
  {
    "id": 10700016,
    "name": "بوانات",
    "slug": "بوانات",
    "province_id": 107
  },
  {
    "id": 10700017,
    "name": "ارسنجان",
    "slug": "ارسنجان",
    "province_id": 107
  },
  {
    "id": 10700018,
    "name": "خرم بید",
    "slug": "خرم-بید",
    "province_id": 107
  },
  {
    "id": 10700019,
    "name": "زرین دشت",
    "slug": "زرین-دشت",
    "province_id": 107
  },
  {
    "id": 10700020,
    "name": "قیرو کارزین",
    "slug": "قیروکارزین",
    "province_id": 107
  },
  {
    "id": 10700021,
    "name": "مهر",
    "slug": "مهر",
    "province_id": 107
  },
  {
    "id": 10700022,
    "name": "فراشبند",
    "slug": "فراشبند",
    "province_id": 107
  },
  {
    "id": 10700023,
    "name": "پاسارگاد",
    "slug": "پاسارگاد",
    "province_id": 107
  },
  {
    "id": 10700024,
    "name": "خنج",
    "slug": "خنج",
    "province_id": 107
  },
  {
    "id": 10700025,
    "name": "سروستان",
    "slug": "سروستان",
    "province_id": 107
  },
  {
    "id": 10700026,
    "name": "رستم",
    "slug": "رستم",
    "province_id": 107
  },
  {
    "id": 10700027,
    "name": "گراش",
    "slug": "گراش",
    "province_id": 107
  },
  {
    "id": 10700028,
    "name": "کوار",
    "slug": "کوار",
    "province_id": 107
  },
  {
    "id": 10700029,
    "name": "خرامه",
    "slug": "خرامه",
    "province_id": 107
  },
  {
    "id": 10700030,
    "name": "زرقان",
    "slug": "زرقان",
    "province_id": 107
  },
  {
    "id": 10700031,
    "name": "بیضاء",
    "slug": "بیضا",
    "province_id": 107
  },
  {
    "id": 10700032,
    "name": "سرچهان",
    "slug": "سرچهان",
    "province_id": 107
  },
  {
    "id": 10700033,
    "name": "کوه چنار",
    "slug": "کوه-چنار",
    "province_id": 107
  },
  {
    "id": 10700034,
    "name": "خفر",
    "slug": "خفر",
    "province_id": 107
  },
  {
    "id": 10700035,
    "name": "بختگان",
    "slug": "بختگان",
    "province_id": 107
  },
  {
    "id": 10700036,
    "name": "اوز",
    "slug": "اوز",
    "province_id": 107
  },
  {
    "id": 10700037,
    "name": "جویم",
    "slug": "جویم",
    "province_id": 107
  },
  {
    "id": 10800010,
    "name": "بردسیر",
    "slug": "بردسیر",
    "province_id": 108
  },
  {
    "id": 10800011,
    "name": "راور",
    "slug": "راور",
    "province_id": 108
  },
  {
    "id": 10800012,
    "name": "عنبرآباد",
    "slug": "عنبرآباد",
    "province_id": 108
  },
  {
    "id": 10800013,
    "name": "منوجان",
    "slug": "منوجان",
    "province_id": 108
  },
  {
    "id": 10800014,
    "name": "کوهبنان",
    "slug": "کوهبنان",
    "province_id": 108
  },
  {
    "id": 10800015,
    "name": "رودبارجنوب",
    "slug": "رودبارجنوب",
    "province_id": 108
  },
  {
    "id": 10800016,
    "name": "قلعه گنج",
    "slug": "قلعه-گنج",
    "province_id": 108
  },
  {
    "id": 10800017,
    "name": "ریگان",
    "slug": "ریگان",
    "province_id": 108
  },
  {
    "id": 10800018,
    "name": "رابر",
    "slug": "رابر",
    "province_id": 108
  },
  {
    "id": 10800019,
    "name": "فهرج",
    "slug": "فهرج",
    "province_id": 108
  },
  {
    "id": 10800020,
    "name": "انار",
    "slug": "انار",
    "province_id": 108
  },
  {
    "id": 10800021,
    "name": "نرماشیر",
    "slug": "نرماشیر",
    "province_id": 108
  },
  {
    "id": 10800022,
    "name": "فاریاب",
    "slug": "فاریاب",
    "province_id": 108
  },
  {
    "id": 10800023,
    "name": "ارزوییه",
    "slug": "ارزوییه",
    "province_id": 108
  },
  {
    "id": 10800024,
    "name": "گنبکی",
    "slug": "گنبکی",
    "province_id": 108
  },
  {
    "id": 10800025,
    "name": "جازموریان",
    "slug": "جازموریان",
    "province_id": 108
  },
  {
    "id": 10900013,
    "name": "قوچان",
    "slug": "قوچان",
    "province_id": 109
  },
  {
    "id": 10900014,
    "name": "کاشمر",
    "slug": "کاشمر",
    "province_id": 109
  },
  {
    "id": 10900015,
    "name": "گناباد",
    "slug": "گناباد",
    "province_id": 109
  },
  {
    "id": 10900016,
    "name": "مشهد",
    "slug": "مشهد",
    "province_id": 109
  },
  {
    "id": 10900017,
    "name": "نیشابور",
    "slug": "نیشابور",
    "province_id": 109
  },
  {
    "id": 10900018,
    "name": "چناران",
    "slug": "چناران",
    "province_id": 109
  },
  {
    "id": 10900019,
    "name": "خواف",
    "slug": "خواف",
    "province_id": 109
  },
  {
    "id": 10900020,
    "name": "سرخس",
    "slug": "سرخس",
    "province_id": 109
  },
  {
    "id": 10900022,
    "name": "فریمان",
    "slug": "فریمان",
    "province_id": 109
  },
  {
    "id": 10900023,
    "name": "بردسکن",
    "slug": "بردسکن",
    "province_id": 109
  },
  {
    "id": 10900027,
    "name": "رشتخوار",
    "slug": "رشتخوار",
    "province_id": 109
  },
  {
    "id": 10900028,
    "name": "کلات",
    "slug": "کلات",
    "province_id": 109
  },
  {
    "id": 10900029,
    "name": "خلیل آباد",
    "slug": "خلیل-آباد",
    "province_id": 109
  },
  {
    "id": 10900030,
    "name": "مه ولات",
    "slug": "مه-ولات",
    "province_id": 109
  },
  {
    "id": 10900031,
    "name": "بجستان",
    "slug": "بجستان",
    "province_id": 109
  },
  {
    "id": 10900032,
    "name": "طرقبه شاندیز",
    "slug": "طرقبه-شاندیز",
    "province_id": 109
  },
  {
    "id": 10900033,
    "name": "فیروزه",
    "slug": "فیروزه",
    "province_id": 109
  },
  {
    "id": 10900034,
    "name": "جغتای",
    "slug": "جغتای",
    "province_id": 109
  },
  {
    "id": 10900035,
    "name": "زاوه",
    "slug": "زاوه",
    "province_id": 109
  },
  {
    "id": 10900036,
    "name": "جوین",
    "slug": "جوین",
    "province_id": 109
  },
  {
    "id": 10900037,
    "name": "باخرز",
    "slug": "باخرز",
    "province_id": 109
  },
  {
    "id": 10900038,
    "name": "خوشاب",
    "slug": "خوشاب",
    "province_id": 109
  },
  {
    "id": 10900039,
    "name": "داورزن",
    "slug": "داورزن",
    "province_id": 109
  },
  {
    "id": 10900040,
    "name": "صالح آباد",
    "slug": "صالح-آباد",
    "province_id": 109
  },
  {
    "id": 10900041,
    "name": "کوهسرخ",
    "slug": "کوهسرخ",
    "province_id": 109
  },
  {
    "id": 10900042,
    "name": "زبرخان",
    "slug": "زبرخان",
    "province_id": 109
  },
  {
    "id": 10900043,
    "name": "ششتمد",
    "slug": "ششتمد",
    "province_id": 109
  },
  {
    "id": 10900044,
    "name": "گلبهار",
    "slug": "گلبهار",
    "province_id": 109
  },
  {
    "id": 10900045,
    "name": "میان جلگه",
    "slug": "میان-جلگه",
    "province_id": 109
  },
  {
    "id": 11000010,
    "name": "کاشان",
    "slug": "کاشان",
    "province_id": 110
  },
  {
    "id": 11000011,
    "name": "گلپایگان",
    "slug": "گلپایگان",
    "province_id": 110
  },
  {
    "id": 11000012,
    "name": "لنجان",
    "slug": "لنجان",
    "province_id": 110
  },
  {
    "id": 11000013,
    "name": "نایین",
    "slug": "نایین",
    "province_id": 110
  },
  {
    "id": 11000014,
    "name": "نجف آباد",
    "slug": "نجف-آباد",
    "province_id": 110
  },
  {
    "id": 11000015,
    "name": "نطنز",
    "slug": "نطنز",
    "province_id": 110
  },
  {
    "id": 11000016,
    "name": "شاهین شهرو میمه",
    "slug": "شاهین-شهرو-میمه",
    "province_id": 110
  },
  {
    "id": 11000017,
    "name": "مبارکه",
    "slug": "مبارکه",
    "province_id": 110
  },
  {
    "id": 11000018,
    "name": "آران و بیدگل",
    "slug": "آران-و-بیدگل",
    "province_id": 110
  },
  {
    "id": 11000019,
    "name": "تیران وکرون",
    "slug": "تیران-وکرون",
    "province_id": 110
  },
  {
    "id": 11000020,
    "name": "چادگان",
    "slug": "چادگان",
    "province_id": 110
  },
  {
    "id": 11000021,
    "name": "دهاقان",
    "slug": "دهاقان",
    "province_id": 110
  },
  {
    "id": 11000022,
    "name": "برخوار",
    "slug": "برخوار",
    "province_id": 110
  },
  {
    "id": 11000023,
    "name": "خور و بیابانک",
    "slug": "خور-و-بیابانک",
    "province_id": 110
  },
  {
    "id": 11000024,
    "name": "بویین و میاندشت",
    "slug": "بویین-و-میاندشت",
    "province_id": 110
  },
  {
    "id": 11000025,
    "name": "کوهپایه",
    "slug": "کوهپایه",
    "province_id": 110
  },
  {
    "id": 11000026,
    "name": "جرقویه",
    "slug": "جرقویه",
    "province_id": 110
  },
  {
    "id": 11000027,
    "name": "ورزنه",
    "slug": "ورزنه",
    "province_id": 110
  },
  {
    "id": 11000028,
    "name": "هرند",
    "slug": "هرند",
    "province_id": 110
  },
  {
    "id": 11100010,
    "name": "زهک",
    "slug": "زهک",
    "province_id": 111
  },
  {
    "id": 11100011,
    "name": "هیرمند",
    "slug": "هیرمند",
    "province_id": 111
  },
  {
    "id": 11100012,
    "name": "دلگان",
    "slug": "دلگان",
    "province_id": 111
  },
  {
    "id": 11100013,
    "name": "مهرستان",
    "slug": "مهرستان",
    "province_id": 111
  },
  {
    "id": 11100014,
    "name": "سیب و سوران",
    "slug": "سیب-و-سوران",
    "province_id": 111
  },
  {
    "id": 11100015,
    "name": "نیمروز",
    "slug": "نیمروز",
    "province_id": 111
  },
  {
    "id": 11100016,
    "name": "هامون",
    "slug": "هامون",
    "province_id": 111
  },
  {
    "id": 11100017,
    "name": "میرجاوه",
    "slug": "میرجاوه",
    "province_id": 111
  },
  {
    "id": 11100018,
    "name": "قصرقند",
    "slug": "قصرقند",
    "province_id": 111
  },
  {
    "id": 11100019,
    "name": "فنوج",
    "slug": "فنوج",
    "province_id": 111
  },
  {
    "id": 11100020,
    "name": "بمپور",
    "slug": "بمپور",
    "province_id": 111
  },
  {
    "id": 11100021,
    "name": "تفتان",
    "slug": "تفتان",
    "province_id": 111
  },
  {
    "id": 11100022,
    "name": "دشتیاری",
    "slug": "دشتیاری",
    "province_id": 111
  },
  {
    "id": 11100023,
    "name": "سرباز",
    "slug": "سرباز",
    "province_id": 111
  },
  {
    "id": 11100024,
    "name": "گلشن",
    "slug": "گلشن",
    "province_id": 111
  },
  {
    "id": 11100025,
    "name": "لاشار",
    "slug": "لاشار",
    "province_id": 111
  },
  {
    "id": 11100026,
    "name": "زرآباد",
    "slug": "زرآباد",
    "province_id": 111
  },
  {
    "id": 11200010,
    "name": "دهگلان",
    "slug": "دهگلان",
    "province_id": 112
  },
  {
    "id": 11300010,
    "name": "درگزین",
    "slug": "درگزین",
    "province_id": 113
  },
  {
    "id": 11400010,
    "name": "خانمیرزا",
    "slug": "خانمیرزا",
    "province_id": 114
  },
  {
    "id": 11400011,
    "name": "فلارد",
    "slug": "فلارد",
    "province_id": 114
  },
  {
    "id": 11400012,
    "name": "فرخ شهر",
    "slug": "فرخ-شهر",
    "province_id": 114
  },
  {
    "id": 11500010,
    "name": "چگنی",
    "slug": "چگنی",
    "province_id": 115
  },
  {
    "id": 11500011,
    "name": "رومشکان",
    "slug": "رومشکان",
    "province_id": 115
  },
  {
    "id": 11500012,
    "name": "معمولان",
    "slug": "معمولان",
    "province_id": 115
  },
  {
    "id": 11600010,
    "name": "بدره",
    "slug": "بدره",
    "province_id": 116
  },
  {
    "id": 11600011,
    "name": "هلیلان",
    "slug": "هلیلان",
    "province_id": 116
  },
  {
    "id": 11600012,
    "name": "چوار",
    "slug": "چوار",
    "province_id": 116
  },
  {
    "id": 11800010,
    "name": "عسلویه",
    "slug": "عسلویه",
    "province_id": 118
  },
  {
    "id": 11900010,
    "name": "سلطانیه",
    "slug": "سلطانیه",
    "province_id": 119
  },
  {
    "id": 12100011,
    "name": "بهاباد",
    "slug": "بهاباد",
    "province_id": 121
  },
  {
    "id": 12100012,
    "name": "مروست",
    "slug": "مروست",
    "province_id": 121
  },
  {
    "id": 12100013,
    "name": "زارچ",
    "slug": "زارچ",
    "province_id": 121
  },
  {
    "id": 12200010,
    "name": "خمیر",
    "slug": "خمیر",
    "province_id": 122
  },
  {
    "id": 12200011,
    "name": "پارسیان",
    "slug": "پارسیان",
    "province_id": 122
  },
  {
    "id": 12200012,
    "name": "سیریک",
    "slug": "سیریک",
    "province_id": 122
  },
  {
    "id": 12200013,
    "name": "بشاگرد",
    "slug": "بشاگرد",
    "province_id": 122
  },
  {
    "id": 12300010,
    "name": "اسلامشهر",
    "slug": "اسلامشهر",
    "province_id": 123
  },
  {
    "id": 12300012,
    "name": "رباط‌کریم",
    "slug": "رباط-کریم",
    "province_id": 123
  },
  {
    "id": 12300013,
    "name": "پاکدشت",
    "slug": "پاکدشت",
    "province_id": 123
  },
  {
    "id": 12300014,
    "name": "فیروزکوه",
    "slug": "فیروزکوه",
    "province_id": 123
  },
  {
    "id": 12300016,
    "name": "قدس",
    "slug": "قدس",
    "province_id": 123
  },
  {
    "id": 12300017,
    "name": "ملارد",
    "slug": "ملارد",
    "province_id": 123
  },
  {
    "id": 12300018,
    "name": "پیشوا",
    "slug": "پیشوا",
    "province_id": 123
  },
  {
    "id": 12300019,
    "name": "بهارستان",
    "slug": "بهارستان",
    "province_id": 123
  },
  {
    "id": 12300020,
    "name": "پردیس",
    "slug": "پردیس",
    "province_id": 123
  },
  {
    "id": 12300021,
    "name": "قرچک",
    "slug": "قرچک",
    "province_id": 123
  },
  {
    "id": 12400010,
    "name": "سرعین",
    "slug": "سرعین",
    "province_id": 124
  },
  {
    "id": 12400011,
    "name": "اصلاندوز",
    "slug": "اصلاندوز",
    "province_id": 124
  },
  {
    "id": 12400012,
    "name": "انگوت",
    "slug": "انگوت",
    "province_id": 124
  },
  {
    "id": 12700010,
    "name": "آزادشهر",
    "slug": "آزادشهر",
    "province_id": 127
  },
  {
    "id": 12700011,
    "name": "رامیان",
    "slug": "رامیان",
    "province_id": 127
  },
  {
    "id": 12700012,
    "name": "مراوه تپه",
    "slug": "مراوه-تپه",
    "province_id": 127
  },
  {
    "id": 12700013,
    "name": "گمیشان",
    "slug": "گمیشان",
    "province_id": 127
  },
  {
    "id": 12700014,
    "name": "گالیکش",
    "slug": "گالیکش",
    "province_id": 127
  },
  {
    "id": 12800010,
    "name": "مانه",
    "slug": "مانه",
    "province_id": 128
  },
  {
    "id": 12900010,
    "name": "خوسف",
    "slug": "خوسف",
    "province_id": 129
  },
  {
    "id": 12900011,
    "name": "طبس",
    "slug": "طبس",
    "province_id": 129
  },
  {
    "id": 12900012,
    "name": "عشق آباد",
    "slug": "عشق-آباد",
    "province_id": 129
  }
]


function addOption(select, value, text) {
  const option = document.createElement("option");
  option.value = value;
  option.textContent = text;
  select.appendChild(option);
}

function loadProvinces() {
  provinceSelect.replaceChildren();
  addOption(provinceSelect, "", "استان را انتخاب کنید");

  provinces.forEach(province => {
    addOption(provinceSelect, province.id, province.name);
  });

  citySelect.replaceChildren();
  addOption(citySelect, "", "ابتدا استان را انتخاب کنید");
  citySelect.disabled = true;
}

provinceSelect.addEventListener("change", function () {
  const selectedProvinceId = this.value;

  citySelect.replaceChildren();
  addOption(citySelect, "", "شهرستان را انتخاب کنید");

  if (!selectedProvinceId) {
    citySelect.disabled = true;
    return;
  }

  const filteredCounties = counties.filter(
    county => String(county.province_id) === selectedProvinceId
  );

  filteredCounties.forEach(county => {
    addOption(citySelect, county.id, county.name);
  });

  citySelect.disabled = filteredCounties.length === 0;

  if (filteredCounties.length === 0) {
    citySelect.replaceChildren();
    addOption(citySelect, "", "شهرستانی برای این استان ثبت نشده");
  }
});

loadProvinces();

// استان و شهرستان 

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

    if (!name2Regex.test(username)) {
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
