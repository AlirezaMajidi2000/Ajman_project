<form method="POST" action="{{ route('login.store') }}">
    @csrf

    <div>
        <label>نام کاربری</label>
        <input type="text" name="username" value="{{ old('username') }}" required autofocus>
        @error('username') <span style="color:red">{{ $message }}</span> @enderror
    </div>

    <div>
        <label>رمز عبور</label>
        <input type="password" name="password" required>
        @error('password') <span style="color:red">{{ $message }}</span> @enderror
    </div>

    <div>
        <label>
            <input type="checkbox" name="remember"> مرا به خاطر بسپار
        </label>
    </div>

    <button type="submit">ورود</button>
</form>
