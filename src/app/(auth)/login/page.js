'use client'; // จำเป็นต้องใช้สำหรับ state และ event handling

import { useState } from 'react';

// === ไอคอน (SVG Components) ===
// การแยกไอคอนเป็น Component ช่วยให้โค้ดหลักอ่านง่ายขึ้น

const MailIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <path fill="currentColor" d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5l-8-5h16zm0 12H4V8l8 5l8-5v10z"></path>
  </svg>
);

const LockIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </g>
  </svg>
);

const EyeIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
      <path d="M2 12s3-7 10-7s10 7 10 7s-3 7-10 7s-10-7-10-7z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </g>
  </svg>
);

const EyeOffIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24m-3.39-9.04A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.17 13.17 0 0 1-2 3.5"></path>
      <path d="M2 12s3-7 10-7a9.74 9.74 0 0 1 5 1.38M2 2l20 20"></path>
    </g>
  </svg>
);


// === Component หลักของหน้า ===
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-sm rounded-lg bg-white p-8 shadow-md">
        <form className="flex flex-col space-y-8">
          
          {/* --- ช่องกรอก Email --- */}
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
              EMAIL
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MailIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue="demo@email.com"
                className="block w-full border-x-0 border-t-0 border-b-2 border-red-500 bg-transparent py-2 pl-10 pr-3 text-gray-900 placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-0 sm:text-sm"
              />
            </div>
          </div>

          {/* --- ช่องกรอก Password --- */}
          <div>
            <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <LockIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="enter your password"
                className="block w-full border-x-0 border-t-0 border-b-2 border-gray-300 bg-transparent py-2 pl-10 pr-10 text-gray-900 placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-0 sm:text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* --- ปุ่ม Login --- */}
          <button
            type="submit"
            className="w-full rounded-md bg-red-500 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            เข้าสู่ระบบ
          </button>

          {/* --- ลิงก์สร้างบัญชี --- */}
          <div className="text-center">
            <a href="register" className="text-sm text-gray-500 hover:text-red-500">
              สร้างบัญชีของคุณง่าย ๆ ด้วยเบอร์โทร
            </a>
          </div>

        </form>
      </div>
    </main>
  );
}
