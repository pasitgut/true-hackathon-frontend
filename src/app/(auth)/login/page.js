'use client';

import InputField from '@/components/InputField';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// === ไอคอน ===
const PhoneIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1v3.5a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1H7.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.24 1.01l-2.2 2.2z"
    />
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

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    phone: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.phone.trim()) {
      newErrors.phone = 'กรุณากรอกเบอร์โทรศัพท์';
    } else if (!/^0\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง (ต้องมี 10 หลักและขึ้นต้นด้วย 0)';
    }

    if (!formData.password) {
      newErrors.password = 'กรุณากรอกรหัสผ่าน';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      localStorage.clear();
      const response = await fetch('https://true-backend.pasitlab.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: formData.phone,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert('เข้าสู่ระบบสำเร็จ!');

        if (data.token) {
          localStorage.setItem('token', data.token);
        }

        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
        }

        router.push('/');
      } else {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          alert(data.message || data.error || 'เกิดข้อผิดพลาด');
        }
      }

    } catch (error) {
      console.error('Login error:', error);
      alert('เกิดข้อผิดพลาดในการเชื่อมต่อ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex w-full justify-center p-4">
      <div className="w-full max-w-sm rounded-lg bg-white p-8">
        <form className="flex flex-col space-y-8" onSubmit={handleSubmit}>

          {/* --- ช่องกรอกเบอร์โทร --- */}
          <InputField
            label="เบอร์โทรศัพท์"
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="08xxxxxxxx"
            error={errors.phone}
            icon={<PhoneIcon className="h-5 w-5 text-gray-400" />}
          />

          {/* --- ช่องกรอก Password --- */}
          <InputField
            id="password"
            label="รหัสผ่าน"
            type={showPassword ? 'text' : 'password'}
            placeholder="กรอกรหัสผ่านของคุณ"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
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

          {/* --- ปุ่ม Login --- */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-red-500 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
          </button>

          {/* --- ลิงก์สร้างบัญชี --- */}
          <div className="text-center">
            <a href="/register" className="text-sm text-gray-500 hover:text-red-500">
              สร้างบัญชีของคุณง่าย ๆ ด้วยเบอร์โทร
            </a>
          </div>

        </form>
      </div>
    </main>
  );
}
