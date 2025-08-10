'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Loading from '@/components/Loading';
import { jwtDecode } from 'jwt-decode'; // 1. Import jwt-decode


// Empty State Component
function EmptyState() {
  return (
    <div className="mx-auto mt-12 flex flex-col items-center text-center">
      {/* Illustration for empty family */}
      <div className="mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-gray-50">
        <svg 
          className="h-16 w-16 text-gray-300" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" 
          />
        </svg>
      </div>
      
      <h2 className="text-xl font-bold text-gray-800">ยังไม่มีครอบครัว</h2>
      <p className="mt-2 text-sm text-gray-500 px-8">
        สร้างกลุ่มครอบครัวเพื่อเริ่มต้นการปกป้องและดูแลคนที่คุณรัก
      </p>
    </div>
  );
}

// Family Group Component
function FamilyGroup({ familyMembers }) {
  // Find first member's family_id to use as the family identifier
  const familyId = familyMembers[0]?.family_id;
  
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      {/* Family Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-red-600 text-white">
            <span className="text-xl">👨‍👩‍👧‍👦</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">ครอบครัวของฉัน</h3>
            <p className="text-xs text-gray-500">{familyMembers.length} สมาชิก</p>
          </div>
        </div>
        <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-600">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>

      {/* Members List */}
      <div className="space-y-2">
        {familyMembers.slice(0, 3).map((member) => (
          <div key={member.user_id} className="flex items-center gap-3 rounded-lg p-2 hover:bg-gray-50">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-gray-100 text-sm">
              👤
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">{member.username}</p>
              <p className="text-xs text-gray-500">{member.phone}</p>
            </div>
            <div className="flex items-center gap-1">
              <span className="inline-flex items-center gap-1 rounded-md border border-green-200 bg-green-50 px-1.5 py-0.5 text-[10px] font-medium text-green-700">
                <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                </svg>
                Active
              </span>
            </div>
          </div>
        ))}
        
        {familyMembers.length > 3 && (
          <div className="pt-2 text-center">
            <button className="text-xs text-blue-600 hover:text-blue-800">
              ดูสมาชิกทั้งหมด ({familyMembers.length})
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function FamilyPage() {
  const router = useRouter();
  const [familyMembers, setFamilyMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch family data from API
  useEffect(() => {
    const fetchFamilyData = async () => {
      try {
          const token = localStorage.getItem('token'); // **สำคัญ:** แก้ไข 'jwtToken' หากคุณใช้ key อื่น
              if (!token) {
                throw new Error('ไม่พบข้อมูลผู้ใช้ กรุณาเข้าสู่ระบบใหม่อีกครั้ง');
              }
        
              const decodedToken = jwtDecode(token);
              const userId = decodedToken.id; // **สำคัญ:** ตรวจสอบว่า payload ใน JWT ของคุณมี key 'id'
        
              if (!userId) {
                throw new Error('Token ไม่ถูกต้องหรือไม่พบ ID ผู้ใช้');
              }
        
        const response = await fetch('http://localhost:8080/api/family/my-family', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: userId }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch family data');
        }
        
        const data = await response.json();
        setFamilyMembers(data);
        localStorage.setItem('family_id', data[0].family_id);
      } catch (err) {
        console.error('Error fetching family data:', err);
        setError(err.message);
        setFamilyMembers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFamilyData();
  }, []);

  const handleCreateFamily = () => {
    router.push('/create-family');
  };

  const handleManageFamily = () => {
    router.push('/family/manage');
  };

  if (loading) {
    return <Loading />;
  }
  
  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-600">เกิดข้อผิดพลาด</h2>
          <p className="mt-2 text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            ลองใหม่อีกครั้ง
          </button>
        </div>
      </div>
    );
  }

  // Check if family exists based on whether we have family members
  const hasFamily = familyMembers.length > 0;

  return (
    <div className="min-h-dvh w-full bg-gray-100">
      <div className="mx-auto min-h-dvh w-full bg-white">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white px-5 py-4 ">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold text-gray-800">ครอบครัวของฉัน</h1>
            {/* {hasFamily && (
              <button 
                onClick={handleManageFamily}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-600"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </button>
            )} */}
          </div>
        </header>

        <main className="px-5 pb-28">
          {!hasFamily ? (
            <>
              <EmptyState />
              <div className="mt-8 space-y-4">
                <div className="rounded-xl bg-blue-50 p-4">
                  <h3 className="font-semibold text-blue-900">ประโยชน์ของการสร้างครอบครัว</h3>
                  <ul className="mt-2 space-y-1 text-sm text-blue-800">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">•</span>
                      <span>ติดตามความปลอดภัยของสมาชิกในครอบครัว</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">•</span>
                      <span>แจ้งเตือนเมื่อมีเหตุการณ์ฉุกเฉิน</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">•</span>
                      <span>จัดการและดูแลข้อมูลส่วนตัวร่วมกัน</span>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <FamilyGroup familyMembers={familyMembers} />
              
              {/* Quick Actions */}
             <div className="grid grid-cols-2 gap-3">
  {/* ปุ่ม เชิญสมาชิก */}
  <button className="rounded-xl border border-gray-200 bg-white p-4 text-left shadow-sm hover:shadow-md transition">
    <Link href="/create-invite">
      <div className="mb-2 grid h-8 w-8 place-items-center rounded-lg bg-green-100">
        <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </div>
      <p className="text-sm font-medium text-gray-800">เชิญสมาชิก</p>
      <p className="text-xs text-gray-500">เพิ่มคนในครอบครัว</p>
    </Link>
  </button>

  {/* ปุ่ม สถานะการปกป้อง */}
  <button className="rounded-xl border border-gray-200 bg-white p-4 text-left shadow-sm hover:shadow-md transition">
    <Link href="/blacklist">
      <div className="mb-2 grid h-8 w-8 place-items-center rounded-lg bg-blue-100">
        <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <p className="text-sm font-medium text-gray-800">สถานะการปกป้อง</p>
      <p className="text-xs text-gray-500">ตรวจสอบความปลอดภัยการใช้อินเตอร์เน็ต</p>
    </Link>
  </button>

  {/* ปุ่ม ติดตามตำแหน่ง */}
  <button className="rounded-xl border border-gray-200 bg-white p-4 text-left shadow-sm hover:shadow-md transition">
    <Link href="/location">
      <div className="mb-2 grid h-8 w-8 place-items-center rounded-lg bg-purple-100">
        <svg className="h-4 w-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3zm0 0c-4.418 0-8 3.582-8 8h16c0-4.418-3.582-8-8-8z" />
        </svg>
      </div>
      <p className="text-sm font-medium text-gray-800">ติดตามตำแหน่ง</p>
      <p className="text-xs text-gray-500">ดูตำแหน่งปัจจุบัน</p>
    </Link>
  </button>

  {/* ปุ่ม รายการธุรกรรม */}
  <button className="rounded-xl border border-gray-200 bg-white p-4 text-left shadow-sm hover:shadow-md transition">
    <Link href="/transaction">
      <div className="mb-2 grid h-8 w-8 place-items-center rounded-lg bg-yellow-100">
        <svg className="h-4 w-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <p className="text-sm font-medium text-gray-800">ธุรกรรม</p>
      <p className="text-xs text-gray-500">ตรวจสอบการใช้จ่าย</p>
    </Link>
  </button>
</div>

            </div>
          )}
        </main>

        {/* Floating Action Button - Center Bottom with Text */}
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
          {!hasFamily ? (
            <button 
              onClick={handleCreateFamily}
              className="flex items-center gap-2 rounded-full bg-red-600 text-white px-6 py-3 shadow-lg shadow-red-600/30 hover:bg-red-700 active:translate-y-[1px] transition"
            >
              <span className="text-xl">➕</span>
              <span className="font-semibold">สร้างครอบครัว</span>
            </button>
          ) : (
            <Link href="/create-invite">
              <button 
                className="flex items-center gap-2 rounded-full bg-red-600 text-white px-6 py-3 shadow-lg shadow-red-600/30 hover:bg-red-700 active:translate-y-[1px] transition"
              >
                <span className="text-xl">📩</span>
                <span className="font-semibold">เชิญสมาชิกใหม่</span>
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
