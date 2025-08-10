'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
// ใช้ heroicons เพื่อความสอดคล้องกับ UI เดิม
import { ChevronLeftIcon, EnvelopeIcon, EnvelopeOpenIcon, InboxIcon } from '@heroicons/react/24/outline';
import { jwtDecode } from 'jwt-decode';

// --- Mock Data ---
// ในแอปพลิเคชันจริง ข้อมูลนี้จะถูกดึงมาจาก API
const initialSentInvitations = [
  { id: 1, recipientName: 'คุณสมชาย ใจดี', status: 'pending' },
  { id: 2, recipientName: 'คุณสมศรี มีสุข', status: 'accepted' },
  { id: 3, recipientName: 'คุณมานะ บากบั่น', status: 'declined' },
];

const initialReceivedInvitations = [
  { id: 1, senderName: 'คุณพ่อ', status: 'pending' },
  { id: 2, senderName: 'คุณอา', status: 'pending' },
];
// --- End Mock Data ---


// Component สำหรับแสดงสถานะ (Pending, Accepted, Declined)
function StatusBadge({ status }) {
  const statusStyles = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    accepted: 'bg-green-100 text-green-800 border-green-200',
    declined: 'bg-red-100 text-red-800 border-red-200',
  };

  const statusText = {
    pending: 'รอดำเนินการ',
    accepted: 'ตอบรับแล้ว',
    declined: 'ปฏิเสธแล้ว',
  };
  console.log('status: ', status)
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}
    >
      {statusText[status] || 'ไม่ทราบสถานะ'}
    </span>
  );
}

// Component สำหรับแสดงรายการคำเชิญที่ได้รับ
function ReceivedInvitationItem({ invitation, onRespond }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition-all hover:border-gray-300 hover:shadow-md">
      <div className="flex flex-1 items-center gap-4">
        <div className="grid h-10 w-10 place-items-center rounded-full bg-blue-100 text-blue-600">
          <EnvelopeOpenIcon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="truncate font-semibold text-gray-800">{invitation.senderName}</p>
          <p className="text-xs text-gray-500">ได้เชิญคุณเข้าร่วมครอบครัว</p>
        </div>
      </div>
      
      {/* ส่วนของการตอบกลับ */}
      <div className="flex flex-shrink-0 items-center gap-2 pl-2">
        {invitation.status === 'pending' ? (
          <>
            <button
              onClick={() => onRespond(invitation.id, 'declined')}
              className="rounded-lg bg-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm hover:bg-gray-300 transition-colors"
            >
              ปฏิเสธ
            </button>
            <button
              onClick={() => onRespond(invitation.id, 'accepted')}
              className="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-green-700 transition-colors"
            >
              ตอบรับ
            </button>
          </>
        ) : (
          <StatusBadge status={invitation.status} />
        )}
      </div>
    </div>
  );
}

// Component สำหรับแสดงรายการคำเชิญที่ส่งไป
function SentInvitationItem({ invitation }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
      <div className="flex flex-1 items-center gap-4">
        <div className="grid h-10 w-10 place-items-center rounded-full bg-gray-100 text-gray-600">
          <EnvelopeIcon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="truncate font-semibold text-gray-800">{invitation.recipientName}</p>
          <p className="text-xs text-gray-500">คุณได้ส่งคำเชิญไปให้</p>
        </div>
      </div>
      <div className="flex-shrink-0 pl-2">
        <StatusBadge status={invitation.status} />
      </div>
    </div>
  );
}

// Component สำหรับแสดงเมื่อไม่มีข้อมูล
function EmptyStateMessage({ message }) {
  return (
    <div className="mt-4 rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 p-6 text-center">
        <InboxIcon className="mx-auto h-10 w-10 text-gray-400" />
        <p className="mt-2 text-sm text-gray-500">{message}</p>
    </div>
  );
}


// Component หลักของหน้า Inbox
export default function InboxPage() {
  const [sentInvitations, setSentInvitations] = useState(initialSentInvitations);
  const [receivedInvitations, setReceivedInvitations] = useState(initialReceivedInvitations);


  useEffect(() => {
    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No token found');

            const decoded = jwtDecode(token);
            const userId = decoded.id;

            console.log('user id', userId);
            const res = await fetch("https://true-backend.pasitlab.com/api/family/invitation", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: userId })
            })
            console.log(res);
            if (!res.ok) throw new Error('Failed to fetch invitations');

            const data = await res.json();

            const mappedSent = data.sender_data.map((inv) => ({
                id: inv.id,
                recipientName: inv.username,
                status: inv.status,
            }));

            const mappedReceived = data.recipient_data.map((inv) => ({
                id: inv.id,
                senderName: inv.username,
                status: inv.status
            }));

            setSentInvitations(mappedSent)
            setReceivedInvitations(mappedReceived)
        } catch (error) {
            console.error('Error loading invitations: ', error);
        }
    };

    fetchData();
  }, [])
  // Function สำหรับจัดการเมื่อมีการตอบรับ/ปฏิเสธคำเชิญ
  const handleInvitationResponse = async (id, response) => {
    console.log('id: ', id, 'response: ', response);
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const decoded = jwtDecode(token);
    const userId = decoded.id;

    const statusToSend = response === 'accepted' ? 'accepted' : 'declined';

    const res = await fetch(`https://true-backend.pasitlab.com/api/family/invitation/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        status: statusToSend,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to update invitation status: ${res.status} - ${errorText}`);
    }

    // อัปเดตสถานะใน state ทันทีหลังจาก API สำเร็จ
    setReceivedInvitations(prevInvitations =>
      prevInvitations.map(inv =>
        inv.id === id ? { ...inv, status: response } : inv
      )
    );

    console.log(`✅ Invitation ${id} updated to ${statusToSend}`);
  } catch (error) {
    console.error('Error updating invitation:', error);
    alert('ไม่สามารถอัปเดตคำเชิญได้ กรุณาลองใหม่ภายหลัง');
  }
};

  return (
    <div className="min-h-dvh w-full bg-gray-50">
      <div className="mx-auto min-h-dvh max-w-lg w-full bg-white shadow-lg">
        {/* Header */}
        <header className="sticky top-0 z-10 flex items-center gap-4 border-b border-gray-200 bg-white/80 px-4 py-3 backdrop-blur-sm">
          <Link href="/family" className="rounded-lg p-2 text-gray-500 hover:bg-gray-100">
            <ChevronLeftIcon className="h-6 w-6" />
          </Link>
          <h1 className="text-lg font-bold text-gray-800">กล่องข้อความคำเชิญ</h1>
        </header>

        {/* Main Content */}
        <main className="space-y-8 p-4 sm:p-5">
          {/* Received Invitations Section */}
          <section>
            <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-gray-700">
              <EnvelopeOpenIcon className="h-5 w-5 text-blue-600" />
              <span>คำเชิญที่ได้รับ</span>
            </h2>
            <div className="space-y-3">
              {receivedInvitations.length > 0 ? (
                receivedInvitations.map(inv => (
                  <ReceivedInvitationItem 
                    key={`received-${inv.id}`} 
                    invitation={inv} 
                    onRespond={handleInvitationResponse} 
                  />
                ))
              ) : (
                <EmptyStateMessage message="ไม่มีคำเชิญที่ได้รับ" />
              )}
            </div>
          </section>

          {/* Divider */}
          <div className="border-t border-gray-200"></div>

          {/* Sent Invitations Section */}
          <section>
            <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-gray-700">
              <EnvelopeIcon className="h-5 w-5 text-gray-500" />
              <span>คำเชิญที่ส่งแล้ว</span>
            </h2>
            <div className="space-y-3">
              {sentInvitations.length > 0 ? (
                sentInvitations.map(inv => (
                  <SentInvitationItem 
                    key={`sent-${inv.id}`} 
                    invitation={inv} 
                  />
                ))
              ) : (
                <EmptyStateMessage message="คุณยังไม่ได้ส่งคำเชิญ" />
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
