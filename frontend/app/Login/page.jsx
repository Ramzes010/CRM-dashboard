"use client";
import React, { useState } from "react";
import Footer from "../../components/footer/page";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

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
        localStorage.setItem('authToken', data.token);
        console.log('Токен сохранен:', data.token);
        window.location.href = '/';
      } else {
        setError(data.detail || 'Error during login');
      }
    } catch (err) {
      setError('Server error');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="main-container bg-[#e6ebce] mx-auto w-full overflow-hidden">
      {/* Header */}
      <div className="h-[5.556vw] max-md:hidden">
        <img src="/images/Logo.svg" alt="Logo" className="m-auto pt-[1.389vw] max-md:hidden"/>
      </div>

      {/* Main Content */}
      <div className="bg-[#003c46] rounded-t-[1.667vw] px-[3.056vw] pt-[5vw] overflow-y-auto">
        <svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="hidden max-md:block max-md:w-[10.417vw] max-md:m-auto max-md:mb-[11.733vw]">
          <g clipPath="url(#clip0_1312_7314)">
            <path d="M18.5 36C28.4411 36 36.5 27.9411 36.5 18C36.5 8.05887 28.4411 0 18.5 0C8.55888 0 0.5 8.05887 0.5 18C0.5 27.9411 8.55888 36 18.5 36Z" fill="#53CFBA"/>
            <path d="M23.4516 11.0828C22.1844 9.79766 20.4364 9 18.5027 9C14.6354 9 11.5 12.1796 11.5 16.1014C11.5 18.0624 12.2811 19.835 13.5538 21.1201L15.1543 19.4971C14.2967 18.6274 13.7669 17.4254 13.7669 16.1014C13.7669 13.4481 15.8863 11.2988 18.5027 11.2988C19.8137 11.2988 20.999 11.8362 21.8512 12.7058C22.7087 13.5755 23.2386 14.7775 23.2386 16.1014C23.2386 18.3615 21.6982 20.256 19.6225 20.7656V14.9603L17.3775 17.237V28H19.6225V23.1032C22.9545 22.5604 25.5 19.6245 25.5 16.0959C25.5 14.135 24.7189 12.3624 23.4516 11.0773V11.0828Z" fill="#003C46"/>
          </g>
          <defs>
            <clipPath id="clip0_1312_7314">
              <rect width="36" height="36" fill="white" transform="translate(0.5)"/>
            </clipPath>
          </defs>
        </svg>

        <div className="max-w-[30.556vw] mx-auto max-md:max-w-[100vw]">
          <h1 className="text-[4.083vw] text-white text-center font-light mb-[2.222vw] max-md:text-[8.533vw] max-md:mb-[8.533vw] max-md:text-center">
            Welcome
          </h1>

          {error && (
            <div className="text-red-500 text-center mb-[0.278vw]">
              {error}
            </div>
          )}

          {/* Form */}
          <div className="border border-[#1f535c] rounded-[0.833vw] max-md:rounded-[3.2vw]">
            {/* Phone Input */}
            <div className="p-[1.389vw] border-b border-[#1f535c] max-md:pt-[4vw] max-md:pl-[6.4vw] max-md:pb-[2.133vw]">
              <label className="text-[1.042vw] text-[rgba(255,255,255,0.6)] uppercase max-md:text-[4vw]">Number</label>
              <div className="flex items-center gap-[0.208vw] mt-[0.139vw]">
                <PhoneInput
                  country={'kz'}
                  value={phoneNumber}
                  onChange={phone => setPhoneNumber(phone)}
                  inputClass="!bg-transparent !text-[1.528vw] !text-[rgba(255,255,255,0.6)] !outline-none !w-full !appearance-none !max-md:text-[5.867vw] !max-md:pb-[2.133vw] !border-none"
                  containerClass="!w-full"
                  buttonClass="!bg-transparent !border-none"
                  dropdownClass="!bg-[#003c46] !text-white"
                  searchClass="!bg-[#003c46] !text-white"
                  enableSearch={true}
                  inputProps={{
                    placeholder: 'Enter phone number'
                  }}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="p-[1.389vw] flex justify-between items-center">
              <div className="w-full max-md:pt-[4vw] max-md:pl-[6.4vw] max-md:pb-[2.133vw]">
                <label className="text-[1.042vw] text-[rgba(255,255,255,0.6)] uppercase max-md:text-[4vw]">Password</label>
                <div className="mt-[0.139vw]">
                  <input 
                    type={showPassword ? "text" : "password"}
                    placeholder="Введите пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-transparent text-[1.528vw] text-[rgba(255,255,255,0.6)] outline-none w-full appearance-none max-md:text-[5.867vw] max-md:pb-[2.133vw]"
                  />
                </div>
              </div>
              <div 
                onClick={togglePassword} 
                className="w-[1.667vw] h-[1.667vw] cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="1.736vw" height="1.667vw" viewBox="0 0 25 24" fill="none" className="max-md:w-[8.4vw] max-md:h-[8.4vw] max-md:relative max-md:right-[10.067vw] max-md:bottom-[3.067vw]">
                  <path 
                    d="M12.5 4.5C8.77 4.5 5.49 6.82 3.5 10.5C5.49 14.18 8.77 16.5 12.5 16.5C16.23 16.5 19.51 14.18 21.5 10.5C19.51 6.82 16.23 4.5 12.5 4.5ZM12.5 14.5C10.29 14.5 8.5 12.71 8.5 10.5C8.5 8.29 10.29 6.5 12.5 6.5C14.71 6.5 16.5 8.29 16.5 10.5C16.5 12.71 14.71 14.5 12.5 14.5ZM12.5 8.5C11.4 8.5 10.5 9.4 10.5 10.5C10.5 11.6 11.4 12.5 12.5 12.5C13.6 12.5 14.5 11.6 14.5 10.5C14.5 9.4 13.6 8.5 12.5 8.5Z"
                    fill="white" 
                    fillOpacity="0.6"
                  />
                  {!showPassword && (
                    <line 
                      x1="4" 
                      y1="4" 
                      x2="21" 
                      y2="17" 
                      stroke="white" 
                      strokeOpacity="0.6" 
                      strokeWidth="0.139vw"
                    />
                  )}
                </svg>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-[1.389vw] space-y-[0.833vw] max-md:mt-[6.4vw]">
            <button 
              onClick={handleLogin}
              disabled={!phoneNumber || !password}
              className={`w-full h-[3.889vw] rounded-[0.833vw] transition-all duration-300 max-md:h-[15.2vw] max-md:rounded-[3.2vw] max-md:mb-[3.2vw]
                ${(!phoneNumber || !password) 
                  ? 'bg-[#1b5b66] opacity-50 cursor-not-allowed text-[rgba(255,255,255,0.45)]' 
                  : 'bg-[#1b5b66] text-[rgba(255,255,255,0.45)] hover:bg-[#246b77] hover:text-white'
                }`}
            >
              Log in
            </button>
            <button className="w-full h-[3.889vw] border border-[rgba(255,255,255,0.12)] rounded-[0.833vw] text-white hover:bg-[rgba(255,255,255,0.1)] transition-all duration-300 max-md:h-[15.2vw] max-md:rounded-[3.2vw]">
              Forgot password?
            </button>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}