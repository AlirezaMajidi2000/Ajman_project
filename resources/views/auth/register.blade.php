<form method="POST" action="{{ route('register.store') }}">
    @csrf

    <div>
        <label>نام</label>
        <input type="text" name="name" value="{{ old('name') }}" required>
        @error('name') <span style="color:red">{{ $message }}</span> @enderror
    </div>

    <div>
        <label>نام کاربری</label>
        <input type="text" name="username" value="{{ old('username') }}" required>
        @error('username') <span style="color:red">{{ $message }}</span> @enderror
    </div>

    <div>
        <label>کد ملی</label>
        <input type="text" name="national_code" value="{{ old('national_code') }}" maxlength="10" required>
        @error('national_code') <span style="color:red">{{ $message }}</span> @enderror
    </div>

    <div>
        <label>شماره تلفن</label>
        <input type="text" name="phone" value="{{ old('phone') }}" maxlength="11" required>
        @error('phone') <span style="color:red">{{ $message }}</span> @enderror
    </div>

    <div>
        <label>رمز عبور</label>
        <input type="password" name="password" required>
        @error('password') <span style="color:red">{{ $message }}</span> @enderror
    </div>

    <div>
        <label>تکرار رمز عبور</label>
        <input type="password" name="password_confirmation" required>
    </div>

    <button type="submit">ثبت‌نام</button>
</form>
