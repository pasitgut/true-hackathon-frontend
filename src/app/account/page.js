'use client'; // ต้องมีบรรทัดนี้สำหรับ App Router เพื่อใช้ state และ event

import { useState } from 'react';


const ToggleSwitch = ({ initialChecked = false }) => {
  const [isOn, setIsOn] = useState(initialChecked);

  return (
    <button
      onClick={() => setIsOn(!isOn)}
      className={`relative inline-flex h-8 w-14 flex-shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
        isOn ? 'bg-red-500' : 'bg-gray-300'
      }`}
    >
      <span
        aria-hidden="true"
        className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
          isOn ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
};


// === Component หลักของหน้า ===
export default function ProfileSettingsPage() {
  
  // ข้อมูลสำหรับแสดงผลในแต่ละแถวของการตั้งค่า
  const settingsItems = [
    {
      id: 1,
      label: (
        <span>
          ฉันยอมรับ{' '}
          <span className="text-red-500">
            ข้อกำหนดสิทธิ์การใช้งานของผู้ใช้ปลายทาง
          </span>
        </span>
      ),
      defaultChecked: true,
    },
    {
      id: 2,
      label: (
        <span>
          ฉันได้อ่าน <span className="text-red-500">นโยบายความเป็นส่วนตัว</span>{' '}
          แล้ว
        </span>
      ),
      defaultChecked: true,
    },
    {
      id: 3,
      label: 'ฉันได้อ่านแล้วว่า VPN จะจัดการข้อมูลของฉัน อย่างไร',
      defaultChecked: false,
    },
    {
      id: 4,
      label: 'ช่วยเราปรับปรุงผลิตภัณฑ์โดยส่งข้อมูลการใช้งานที่ไม่ระบุบุคคล',
      defaultChecked: true,
    },
  ];


  return (
    <main className="flex min-h-screen justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-sm">
        
        {/* ส่วนข้อมูลโปรไฟล์ */}
        <div className="flex items-center space-x-4">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-200">
            {/* ไอคอนรูปคน (SVG) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">ชื่อผู้ใช้งาน</span>
            <span className="text-xl font-bold text-gray-800">
              Kittayot Muttakit
            </span>
            <span className="text-sm text-gray-500">09x-xxx-xxxx</span>
          </div>
        </div>

        {/* เส้นคั่น */}
        <hr className="my-6 border-gray-200" />

        {/* ส่วนรายการตั้งค่า */}
        <div className="flex flex-col space-y-6">
          {settingsItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="pr-4 text-sm text-gray-700">{item.label}</div>
              <ToggleSwitch initialChecked={item.defaultChecked} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
