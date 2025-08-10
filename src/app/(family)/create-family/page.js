'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { jwtDecode } from 'jwt-decode'; // 1. Import jwt-decode

export default function CreateFamilyPage() {
  const router = useRouter();
  const [familyName, setFamilyName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState(''); // State for handling errors

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    if (!familyName.trim()) {
      setError('กรุณากรอกชื่อครอบครัว');
      return;
    }

    setIsCreating(true);

    try {
      // 2. ดึง Token และถอดรหัสเพื่อเอา ID
      const token = localStorage.getItem('token'); // **สำคัญ:** แก้ไข 'jwtToken' หากคุณใช้ key อื่น
      if (!token) {
        throw new Error('ไม่พบข้อมูลผู้ใช้ กรุณาเข้าสู่ระบบใหม่อีกครั้ง');
      }

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id; // **สำคัญ:** ตรวจสอบว่า payload ใน JWT ของคุณมี key 'id'

      if (!userId) {
        throw new Error('Token ไม่ถูกต้องหรือไม่พบ ID ผู้ใช้');
      }

      // 3. ยิง API ไปยัง Backend
      const response = await fetch('https://true-backend.pasitlab.com/api/family/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // ส่ง Token ไปใน Header เพื่อยืนยันตัวตน
        },
        body: JSON.stringify({
          family_name: familyName,
          user_id: userId // ส่ง id ที่ได้จาก token
        })
      });

      // 4. จัดการ Response จาก API
      if (!response.ok) {
        // หาก server ตอบกลับมาด้วย status error (เช่น 400, 500)
        const errorData = await response.json();
        throw new Error(errorData.message || 'เกิดข้อผิดพลาดในการสร้างครอบครัว');
      }

      // หากสำเร็จ
      // const result = await response.json(); // หาก API ตอบกลับข้อมูลบางอย่าง
      // console.log('Family created:', result);
      const result = await response.json();
      if (result.family) {
        localStorage.setItem('family', result.family);
      }
      
      router.push('/family'); // ไปยังหน้า family หลังสร้างสำเร็จ

    } catch (err) {
      console.error('Error creating family:', err);
      // แสดง error ที่มาจาก throw new Error()
      setError(err.message); 
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-dvh w-full bg-gray-100">
      <div className="mx-auto min-h-dvh w-full bg-white">
        <header className="sticky top-0 z-10 bg-white px-5 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/family">
                <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-600">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              </Link>
              <h1 className="text-lg font-bold text-gray-800">สร้างครอบครัวใหม่</h1>
            </div>
          </div>
        </header>

        <main className="px-5 pb-28">
          <div className="mx-auto mt-8 flex flex-col items-center text-center">
            <div className="mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-red-50">
              <span className="text-4xl">👨‍👩‍👧‍👦</span>
            </div>
            
            <h2 className="text-xl font-bold text-gray-800">ยินดีต้อนรับ!</h2>
            <p className="mt-2 text-sm text-gray-500 px-8">
              สร้างกลุ่มครอบครัวเพื่อเริ่มต้นการปกป้องและดูแลคนที่คุณรัก
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor="familyName" className="block text-sm font-medium text-gray-700 mb-2">
                ชื่อครอบครัว *
              </label>
              <input
                type="text"
                id="familyName"
                value={familyName}
                onChange={(e) => setFamilyName(e.target.value)}
                placeholder="เช่น ครอบครัวใจดี, My Happy Family"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                disabled={isCreating}
              />
              <p className="mt-1 text-xs text-gray-500">
                ชื่อนี้จะใช้แสดงในระบบและส่งให้สมาชิกที่คุณเชิญ
              </p>
            </div>
            
            {/* แสดงข้อความ Error หากมี */}
            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-center text-sm font-medium text-red-700">
                {error}
              </div>
            )}

            {/* ส่วนอื่นๆ ของ Form เหมือนเดิม */}
            <div className="rounded-xl bg-blue-50 p-4">
              <h3 className="font-semibold text-blue-900 mb-3">สิ่งที่คุณจะได้รับ:</h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start gap-2">
                  <svg className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  <span>ติดตามความปลอดภัยของสมาชิกในครอบครัว</span>
                </li>
              </ul>
            </div>
          </form>
        </main>

        <div className="fixed bottom-5 left-1/2 w-[calc(100%-2.5rem)] max-w-sm -translate-x-1/2 z-50">
          <button 
            type="submit"
            onClick={handleSubmit}
            disabled={!familyName.trim() || isCreating}
            className="w-full flex items-center justify-center gap-2 rounded-full bg-red-600 text-white px-6 py-3 shadow-lg shadow-red-600/30 hover:bg-red-700 active:translate-y-[1px] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCreating ? (
              <>
                <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                <span className="font-semibold">กำลังสร้าง...</span>
              </>
            ) : (
              <>
                <span className="text-xl">✨</span>
                <span className="font-semibold">สร้างครอบครัว</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
