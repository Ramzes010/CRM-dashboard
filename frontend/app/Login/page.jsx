"use client";
import React, { useState } from "react";

export default function Main() {
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone_number: phoneNumber,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Изменяем ключ с 'token' на 'authToken' для консистентности
        localStorage.setItem('authToken', data.token);
        console.log('Токен сохранен:', data.token); // Добавляем лог для проверки
        window.location.href = '/';
      } else {
        setError(data.detail || 'Ошибка при входе');
      }
    } catch (err) {
      setError('Ошибка сервера');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="main-container bg-[#e6ebce]  mx-auto w-full">
      {/* Header */}
      <div className="h-[80px]">
        <img src="/images/Logo.svg" alt="images/Logo" className="m-auto  pt-[20px]"/>
      </div>

      {/* Main Content */}
      <div className="bg-[#003c46] rounded-t-[24px] px-[44px] pt-[72px]">
        <div className="max-w-[343px] mx-auto">
          <h1 className="text-[30px] text-white text-center  font-light mb-8">
            Добро пожаловать
          </h1>

          {error && (
            <div className="text-red-500 text-center mb-4">
              {error}
            </div>
          )}

          {/* Form */}
          <div className="border border-[#1f535c] rounded-[12px]">
            {/* Phone Input */}
            <div className="p-6 border-b border-[#1f535c]">
              <label className="text-[15px] text-[rgba(255,255,255,0.6)] uppercase">Номер</label>
              <div className="flex items-center gap-3 mt-2">
                <input 
                  type="tel"
                  placeholder="+7 777 777 77 77"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="bg-transparent text-[22px] text-[rgba(255,255,255,0.6)] outline-none w-full"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="p-6 flex justify-between items-center">
              <div className="w-full">
                <label className="text-[15px] text-[rgba(255,255,255,0.6)] uppercase">Пароль</label>
                <div className="mt-2">
                  <input 
                    type={showPassword ? "text" : "password"}
                    placeholder="Введите пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-transparent text-[22px] text-[rgba(255,255,255,0.6)] outline-none w-full"
                  />
                </div>
              </div>
              <div 
                onClick={togglePassword} 
                className="w-[24px] h-[24px] cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                  <path 
                    d={showPassword 
                      ? "M23.6825 12.3057C23.6431 12.3939 22.6934 14.4967 20.555 16.412C20.4819 16.4795 20.3961 16.5318 20.3027 16.5659C20.2092 16.6 20.1099 16.6151 20.0105 16.6104C19.9111 16.6057 19.8136 16.5812 19.7238 16.5385C19.6339 16.4957 19.5535 16.4356 19.4871 16.3614C19.4208 16.2873 19.3698 16.2007 19.3373 16.1067C19.3047 16.0127 19.2912 15.9131 19.2975 15.8138C19.3037 15.7145 19.3297 15.6175 19.3739 15.5283C19.418 15.4392 19.4795 15.3597 19.5547 15.2945C20.6038 14.352 21.4851 13.238 22.1609 12.0001C21.5819 10.9387 20.8518 9.96695 19.9934 9.11544C17.9066 7.04919 15.3856 6.00012 12.5 6.00012C11.892 5.99938 11.2849 6.04861 10.685 6.14731C10.5874 6.16456 10.4874 6.16232 10.3907 6.1407C10.294 6.11908 10.2026 6.07851 10.1217 6.02135C10.0407 5.96419 9.97195 5.89156 9.91925 5.80766C9.86656 5.72376 9.83101 5.63024 9.81466 5.53253C9.79832 5.43481 9.80149 5.33482 9.82401 5.23833C9.84652 5.14185 9.88793 5.05078 9.94584 4.97039C10.0038 4.89 10.077 4.82188 10.1614 4.76997C10.2458 4.71806 10.3396 4.68338 10.4375 4.66794C11.1192 4.55537 11.809 4.49925 12.5 4.50012C15.77 4.50012 18.7409 5.74325 21.0931 8.09544C22.8584 9.86075 23.6525 11.6223 23.6853 11.6964C23.7279 11.7923 23.75 11.8961 23.75 12.0011C23.75 12.106 23.7279 12.2098 23.6853 12.3057H23.6825Z" 
                      : "M5.55499 3.24575C5.48913 3.1715 5.40918 3.11107 5.31979 3.06795C5.2304 3.02483 5.13334 2.99988 5.03423 2.99455C4.93513 2.98922 4.83595 3.00361 4.74245 3.03689C4.64895 3.07017 4.56298 3.12168 4.48953 3.18843C4.41608 3.25518 4.35661 3.33584 4.31457 3.42574C4.27252 3.51565 4.24874 3.613 4.2446 3.71216C4.24045 3.81132 4.25603 3.91032 4.29043 4.00342C4.32483 4.09651 4.37737 4.18186 4.44499 4.2545L6.24874 6.23919C2.84374 8.32887 1.37937 11.5501 1.31468 11.6964C1.27203 11.7923 1.25 11.8961 1.25 12.0011C1.25 12.106 1.27203 12.2098 1.31468 12.3057C1.34749 12.3798 2.14155 14.1404 3.90687 15.9057C6.25905 18.257 9.22999 19.5001 12.5 19.5001C14.1806 19.5097 15.8442 19.1637 17.3816 18.4848L19.4441 20.7545C19.5099 20.8287 19.5899 20.8892 19.6793 20.9323C19.7686 20.9754 19.8657 21.0004 19.9648 21.0057C20.0639 21.011 20.1631 20.9966 20.2566 20.9634C20.3501 20.9301 20.4361 20.8786 20.5095 20.8118C20.583 20.7451 20.6424 20.6644 20.6845 20.5745C20.7265 20.4846 20.7503 20.3872 20.7544 20.2881C20.7586 20.1889 20.743 20.0899 20.7086 19.9968C20.6742 19.9037 20.6217 19.8184 20.5541 19.7457L5.55499 3.24575Z"} 
                    fill="white" 
                    fillOpacity="0.6"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 space-y-3">
            <button 
              onClick={handleLogin}
              className="w-full h-[56px] bg-[#1b5b66] rounded-[12px] text-[rgba(255,255,255,0.45)]"
            >
              Войти
            </button>
            <button className="w-full h-[56px] border border-[rgba(255,255,255,0.12)] rounded-[12px] text-white">
              Забыли пароль?
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-[72px] py-5">
          <div className="flex gap-4 items-center text-[12px] uppercase">
            <span className="text-[rgba(255,255,255,0.45)]">Picheni © 2024</span>
            <span className="text-[rgba(255,255,255,0.6)]">terms</span>
            <span className="text-[rgba(255,255,255,0.6)]">privacy</span>
            <span className="text-[rgba(255,255,255,0.6)]">Помощь</span>
          </div>
          <div className="flex gap-3">
            <div className="w-[32px] h-[32px] bg-[rgba(255,255,255,0.12)] rounded-[8px] p-2">
              <img src="/images/icons/telegram.svg" alt="/telegram" />
            </div>
            <div className="w-[32px] h-[32px] bg-[rgba(255,255,255,0.12)] rounded-[8px] p-2">
              <img src="/images/icons/instagram.svg" alt="instagram" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}