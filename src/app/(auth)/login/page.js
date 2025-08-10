'use client'; // จำเป็นต้องใช้สำหรับ state และ event handling


import InputField from '@/components/InputField';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // สำหรับ redirect หลัง login สำเร็จ

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
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // State สำหรับเก็บข้อมูล form
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // State สำหรับ error messages
  const [errors, setErrors] = useState({});

  // Function สำหรับอัพเดท input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error เมื่อ user เริ่มพิมพ์
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Function สำหรับ validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'กรุณากรอกอีเมล';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'รูปแบบอีเมลไม่ถูกต้อง';
    }

    if (!formData.password) {
      newErrors.password = 'กรุณากรอกรหัสผ่าน';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Function สำหรับส่ง API
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Login สำเร็จ
        alert('เข้าสู่ระบบสำเร็จ!');
        
        // เก็บ token ใน localStorage
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
        
        // เก็บข้อมูล user (ถ้ามี)
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
        }
        
        // Redirect ไปหน้าหลักหรือหน้าที่ต้องการ
        router.push('/'); // เปลี่ยนเป็น path ที่ต้องการ
        
      } else {
        // มี error จาก server
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
          
          {/* --- ช่องกรอก Email --- */}
          <div>
              <InputField
                label="EMAIL"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="example@gmail.com"
                error={errors.email}
                icon={<MailIcon className="h-5 w-5 text-gray-400" />}
              />
            </div>

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
