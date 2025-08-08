'use client'; // จำเป็นต้องใช้สำหรับ state และ event handling

import { useState } from 'react';
import Link from 'next/link'; // ใช้ Link ของ Next.js เพื่อการ navigate ที่ดีกว่า

// === ไอคอน (SVG Components) ===
// แยกไอคอนเป็น Component เพื่อให้โค้ดหลักอ่านง่าย
// ไม่ต้องใส่ Type Props แบบ TypeScript

const UserIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </g>
  </svg>
);

const MailIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <path fill="currentColor" d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5l-8-5h16zm0 12H4V8l8 5l8-5v10z"></path>
  </svg>
);

const PhoneIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5L15 15l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"></path></svg>
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

// === Component สำหรับ Input Field เพื่อลดการเขียนโค้ดซ้ำ ===
const InputField = ({ id, label, type, placeholder, icon, children }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-bold text-gray-700 mb-2">
      {label}
    </label>
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        {icon}
      </div>
      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        className="block w-full border-0 border-b-2 border-gray-300 bg-transparent py-2 pl-10 pr-10 text-gray-900 placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-0 sm:text-sm"
        required
      />
      {/* สำหรับใส่ปุ่มเปิด/ปิดรหัสผ่าน */}
      {children}
    </div>
  </div>
);


// === Component หลักของหน้า ===
export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">สร้างบัญชีผู้ใช้</h1>
          <p className="text-gray-500 mt-2">กรอกข้อมูลเพื่อเริ่มต้นใช้งาน</p>
        </div>

        <form className="flex flex-col space-y-6">
          
          <InputField 
            id="fullname"
            label="ชื่อ-นามสกุล"
            type="text"
            placeholder="กรอกชื่อและนามสกุลของคุณ"
            icon={<UserIcon className="h-5 w-5 text-gray-400" />}
          />

          <InputField 
            id="email"
            label="อีเมล"
            type="email"
            placeholder="example@email.com"
            icon={<MailIcon className="h-5 w-5 text-gray-400" />}
          />
          
          <InputField 
            id="phone"
            label="เบอร์โทรศัพท์"
            type="tel"
            placeholder="09x-xxx-xxxx"
            icon={<PhoneIcon className="h-5 w-5 text-gray-400" />}
          />

          {/* --- ช่องกรอก Password --- */}
          <InputField
            id="password"
            label="รหัสผ่าน"
            type={showPassword ? 'text' : 'password'}
            placeholder="กรอกรหัสผ่านของคุณ"
            icon={<LockIcon className="h-5 w-5 text-gray-400" />}
          >
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </InputField>

          {/* --- ช่องยืนยัน Password --- */}
          <InputField
            id="confirmPassword"
            label="ยืนยันรหัสผ่าน"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="กรอกรหัสผ่านของคุณอีกครั้ง"
            icon={<LockIcon className="h-5 w-5 text-gray-400" />}
          >
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </InputField>

          {/* --- ปุ่ม Submit --- */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full rounded-md bg-red-500 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
            >
              สมัครสมาชิก
            </button>
          </div>

          {/* --- ลิงก์ไปหน้า Login --- */}
          <div className="text-center">
            <p className="text-sm text-gray-500">
              มีบัญชีผู้ใช้อยู่แล้ว?{' '}
              <Link href="/login" className="font-medium text-red-500 hover:text-red-600 hover:underline">
                เข้าสู่ระบบที่นี่
              </Link>
            </p>
          </div>

        </form>
      </div>
    </main>
  );
}
