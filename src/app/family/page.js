'use client';

import React from 'react';


function Illustration() {
  // ใช้กล่อง placeholder แทนภาพจริง (เปลี่ยนเป็น <Image src="/your-image.svg" .../> ได้)
  return (
    <div className="mx-auto mt-6 flex flex-col items-center">
      <div className="h-36 w-56 rounded-2xl bg-gray-100 ring-1 ring-gray-200" />
    </div>
  );
}

function DeviceCard({ phone }) {
  return (
    <button className="group relative w-full rounded-2xl border border-gray-200 bg-white p-4 text-left shadow-sm transition hover:shadow-md">
      <div className="flex items-center gap-4">
        <div className="grid h-12 w-12 place-items-center rounded-full bg-blue-600 text-white">
          <span className="text-xl">👤</span>
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-800">{phone}</p>
          <div className="mt-1 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-md border border-green-200 bg-green-50 px-1.5 py-0.5 text-[10px] font-medium text-green-700">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
              </svg>
              Secure
            </span>
            <span className="text-[10px] text-gray-400">การปกป้องเปิดอยู่</span>
          </div>
        </div>
        <svg
          className="h-5 w-5 text-gray-300 group-hover:text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </button>
  );
}

export default function Page() {
  const devices = [
    { phone: '6664451XXXX' },
    { phone: '6664451XXXX' },
    { phone: '6664451XXXX' },
  ];

  return (
    <div className="min-h-dvh w-full bg-gray-100">
      <div className="mx-auto min-h-dvh w-full max-w-sm bg-white">
        <div className="h-2" />

        <main className="px-5 pb-28">
          <Illustration />
          <div className="mt-4 text-center">
            <h1 className="text-lg font-extrabold text-gray-800">เหลือ 0 สิทธิการใช้งาน</h1>
            <p className="mt-1 text-xs text-gray-500">นี่คืออุปกรณ์ที่คุณกำลังปกป้อง</p>
          </div>

          <div className="mt-5 space-y-3">
            {devices.map((d, idx) => (
              <DeviceCard key={idx} phone={d.phone} />
            ))}
          </div>
        </main>

        <div className="sticky bottom-0 w-full bg-gradient-to-t from-white/95 to-white/60 px-5 pb-[calc(16px+env(safe-area-inset-bottom))] pt-3 backdrop-blur">
          <button className="w-full rounded-full bg-red-600 py-3 text-white shadow-lg shadow-red-600/30 transition active:translate-y-[1px]">
            เริ่มต้นใช้งาน
          </button>
        </div>
      </div>
    </div>
  );
}
