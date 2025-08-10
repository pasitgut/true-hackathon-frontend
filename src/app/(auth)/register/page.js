'use client';

import InputField from '@/components/InputField';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// === ไอคอน (SVG Components) ===

const UserIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </g>
  </svg>
);

const PhoneIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5L15 15l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
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
export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error[name]) {
      setError(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newError = {};

    if (!formData.username.trim()) {
      newError.username = 'กรุณากรอกชื่อผู้ใช้';
    }

    if (!formData.phone.trim()) {
      newError.phone = 'กรุณากรอกเบอร์โทรศัพท์';
    } else if (!/^0\d{9}$/.test(formData.phone)) {
      newError.phone = 'เบอร์โทรต้องมี 10 หลักและขึ้นต้นด้วย 0';
    }

    if (!formData.password) {
      newError.password = 'กรุณากรอกรหัสผ่าน';
    }

    if (!formData.confirmPassword) {
      newError.confirmPassword = 'กรุณายืนยันรหัสผ่าน';
    }

    if (formData.password !== formData.confirmPassword) {
      newError.confirmPassword = 'รหัสผ่านไม่ตรงกัน';
    }

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('สมัครสมาชิกสำเร็จ');
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
        router.push('/');
      } else {
        alert(data.error || 'เกิดข้อผิดพลาด');
      }
    } catch (error) {
      console.error('Register error:', error);
      alert('เกิดข้อผิดพลาดในการเชื่อมต่อ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex w-full p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">สร้างบัญชีผู้ใช้</h1>
          <p className="text-gray-500 mt-2">กรอกข้อมูลเพื่อเริ่มต้นใช้งาน</p>
        </div>

        <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
          <InputField
            id="fullname"
            label="ชื่อ-นามสกุล"
            type="text"
            placeholder="กรอกชื่อและนามสกุลของคุณ"
            value={formData.username}
            onChange={handleInputChange}
            error={error.username}
            name="username"
            icon={<UserIcon className="h-5 w-5 text-gray-400" />}
          />

          <InputField
            id="phone"
            label="เบอร์โทรศัพท์"
            type="tel"
            placeholder="09x-xxx-xxxx"
            value={formData.phone}
            onChange={handleInputChange}
            error={error.phone}
            name="phone"
            icon={<PhoneIcon className="h-5 w-5 text-gray-400" />}
          />

          {/* --- ช่องกรอกรหัสผ่าน --- */}
          <InputField
            id="password"
            label="รหัสผ่าน"
            type={showPassword ? 'text' : 'password'}
            placeholder="กรอกรหัสผ่านของคุณ"
            value={formData.password}
            onChange={handleInputChange}
            error={error.password}
            name="password"
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

          {/* --- ช่องยืนยันรหัสผ่าน --- */}
          <InputField
            id="confirmPassword"
            label="ยืนยันรหัสผ่าน"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="กรอกรหัสผ่านของคุณอีกครั้ง"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            error={error.confirmPassword}
            name="confirmPassword"
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
              disabled={loading}
              className="w-full rounded-md bg-red-500 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
            >
              {loading ? 'กำลังสมัคร...' : 'สมัครสมาชิก'}
            </button>
          </div>

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
