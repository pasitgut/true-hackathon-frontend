'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { jwtDecode } from 'jwt-decode'; // ต้องมีการติดตั้ง jwt-decode

export default function CreateInvitePage() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [invitedMembers, setInvitedMembers] = useState([]);
  const [isInviting, setIsInviting] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');

  // Format phone number as user types
  const formatPhoneNumber = (value) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Format as XXX-XXX-XXXX
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
  };

  const handleAddMember = () => {
    setError('');
    
    if (!phoneNumber.trim()) {
      setError('กรุณากรอกเบอร์มือถือ');
      return;
    }

    // Validate phone number (should have 10 digits)
    const digits = phoneNumber.replace(/\D/g, '');
    if (digits.length !== 10) {
      setError('กรุณากรอกเบอร์มือถือให้ครบ 10 หลัก');
      return;
    }

    // Check if already invited
    if (invitedMembers.some(member => member.phone === phoneNumber)) {
      setError('เบอร์นี้ได้รับการเชิญแล้ว');
      return;
    }

    // เพิ่มข้อมูลผู้ใช้ลงในรายการที่จะเชิญ (โดยไม่ต้องเช็คกับ API)
    setInvitedMembers(prev => [...prev, {
      id: Date.now(), // ID ชั่วคราวสำหรับการแสดงผลในรายการ
      name: `ผู้ใช้ ${phoneNumber}`,
      phone: phoneNumber,
      rawPhone: digits, // เก็บเบอร์โทรแบบไม่มีขีดไว้สำหรับส่ง API
      isRegistered: false, // ไม่ทราบว่าลงทะเบียนหรือไม่
      inviteStatus: 'pending'
    }]);
    
    setPhoneNumber('');
  };

  const handleRemoveMember = (id) => {
    setInvitedMembers(prev => prev.filter(member => member.id !== id));
  };

  const handleSendInvites = async () => {
    if (invitedMembers.length === 0) {
      setError('กรุณาเพิ่มสมาชิกอย่างน้อย 1 คน');
      return;
    }

    setIsSending(true);
    setError('');

    try {
      console.log('Invited Member', invitedMembers);
      // ดึงข้อมูลที่จำเป็นจาก localStorage และ JWT token
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('ไม่พบข้อมูลผู้ใช้ กรุณาเข้าสู่ระบบใหม่อีกครั้ง');
      }

      const familyId = localStorage.getItem('family_id');
      if (!familyId) {
        throw new Error('ไม่พบข้อมูลครอบครัว กรุณาสร้างครอบครัวก่อน');
      }

      // ถอดรหัส JWT token เพื่อดึง sender_id
      const decodedToken = jwtDecode(token);
      const senderId = decodedToken.id;

      if (!senderId) {
        throw new Error('ไม่พบข้อมูล ID ผู้ใช้ในระบบ');
      }
      console.log('familyId', familyId, 'senderId', senderId, 'phone', );
      // ส่งคำเชิญทีละรายการ
      const invitePromises = invitedMembers.map(async (member) => {
        console.log('phone', member.phoneNumber);
        const response = await fetch('https://true-backend.pasitlab.com/api/family/invite', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            family_id: familyId,
            sender_id: senderId,
            phone: member.rawPhone // ใช้เบอร์แบบไม่มีขีด
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `ไม่สามารถส่งคำเชิญให้ ${member.phone} ได้`);
        }

        return await response.json();
      });

      // รอให้ทุกคำเชิญส่งเสร็จ
      const results = await Promise.all(invitePromises);
      console.log('Invitation results:', results);
      
      // แสดงข้อความสำเร็จและกลับไปหน้าครอบครัว
      alert('ส่งคำเชิญสำเร็จแล้ว');
      router.push('/family');
    } catch (error) {
      console.error('Error sending invites:', error);
      setError(error.message || 'เกิดข้อผิดพลาดในการส่งคำเชิญ');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-dvh w-full bg-gray-100">
      <div className="mx-auto min-h-dvh w-full bg-white">
        {/* Header */}
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
              <h1 className="text-lg font-bold text-gray-800">เชิญสมาชิกใหม่</h1>
            </div>
          </div>
        </header>

        <main className="px-5 pb-28">
          {/* Illustration */}
          <div className="mx-auto mt-8 flex flex-col items-center text-center">
            <div className="mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-green-50">
              <span className="text-4xl">📱</span>
            </div>
            
            <h2 className="text-xl font-bold text-gray-800">เชิญคนที่คุณรัก</h2>
            <p className="mt-2 text-sm text-gray-500 px-8">
              ใส่เบอร์มือถือเพื่อเชิญเข้าร่วมครอบครัวและดูแลกันอย่างปลอดภัย
            </p>
          </div>

          {/* Add Member Form */}
          <div className="mt-8 space-y-4">
            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-4">เพิ่มสมาชิกใหม่</h3>
              
              {/* แสดงข้อความ Error หากมี */}
              {error && (
                <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm font-medium text-red-700">
                  {error}
                </div>
              )}
              
              <div className="flex gap-3">
                <div className="flex-1">
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    placeholder="XXX-XXX-XXXX"
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                    maxLength={12} // XXX-XXX-XXXX format
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    เบอร์มือถือ 10 หลัก (เช่น 088-123-4567)
                  </p>
                </div>
                <button
                  onClick={handleAddMember}
                  disabled={!phoneNumber.trim()}
                  className="rounded-lg bg-red-600 px-4 py-3 text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Invited Members List */}
            {invitedMembers.length > 0 && (
              <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-800">
                    รายชื่อที่จะเชิญ ({invitedMembers.length})
                  </h3>
                </div>
                
                <div className="divide-y divide-gray-100">
                  {invitedMembers.map((member) => (
                    <div key={member.id} className="flex items-center gap-3 p-4">
                      <div className="grid h-10 w-10 place-items-center rounded-full bg-gray-100 text-sm">
                        📱
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">
                          ผู้ใช้เบอร์: {member.phone}
                        </p>
                        <p className="text-xs text-gray-500">{member.phone}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleRemoveMember(member.id)}
                          className="rounded-lg p-1 text-gray-400 hover:bg-gray-50 hover:text-gray-600"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Info Section */}
            <div className="rounded-xl bg-blue-50 p-4">
              <h3 className="font-semibold text-blue-900 mb-3">การเชิญสมาชิก:</h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start gap-2">
                  <svg className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>ระบบจะส่ง SMS เชิญไปยังเบอร์ที่ระบุ</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>หากยังไม่ได้ลงทะเบียน จะได้รับลิงค์ดาวน์โหลดแอป</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>สมาชิกสามารถยอมรับหรือปฏิเสธคำเชิญได้</span>
                </li>
              </ul>
            </div>
          </div>
        </main>

        {/* Fixed Send Button */}
        {invitedMembers.length > 0 && (
          <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
            <button 
              onClick={handleSendInvites}
              disabled={isSending}
              className="flex items-center gap-2 rounded-full bg-red-600 text-white px-6 py-3 shadow-lg shadow-red-600/30 hover:bg-red-700 active:translate-y-[1px] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSending ? (
                <>
                  <svg className="h-5 w-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />   
                  </svg>
                  <span className="font-semibold">กำลังส่งคำเชิญ...</span>
                </>
              ) : (
                <>
                  <span className="text-xl">📩</span>
                  <span className="font-semibold">ส่งคำเชิญ ({invitedMembers.length})</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
