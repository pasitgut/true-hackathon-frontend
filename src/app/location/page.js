'use client';

import React, { useState } from 'react';

const familyMembers = [
    {
        firstName: 'สมชาย',
        lastName: 'ใจดี',
        phone: '081-234-5678',
    },
    {
        firstName: 'สมหญิง',
        lastName: 'ใจงาม',
        phone: '082-345-6789',
    },
    {
        firstName: 'น้องปิงปอง',
        lastName: 'ใจเพชร',
        phone: '083-456-7890',
    },
];

export default function Location() {
    // 1. สร้าง State เพื่อจัดการสถานะการแจ้งเตือนและเวลา
    const [isAccident, setIsAccident] = useState(false);
    const [accidentTime, setAccidentTime] = useState(null);

    // 2. ฟังก์ชันสำหรับจัดการเมื่อกดปุ่มแจ้งเหตุ
    const handleEmergency = () => {
        setIsAccident(true);
        setAccidentTime(new Date());
    };

    // 3. ฟังก์ชันสำหรับรีเซ็ตสถานการณ์
    const handleReset = () => {
        setIsAccident(false);
        setAccidentTime(null);
    };

    return (
        <div className="relative flex flex-col w-full min-h-screen">
            {/* 4. กล่องแจ้งเตือนที่จะแสดงเมื่อเกิดอุบัติเหตุ */}
            {isAccident && accidentTime && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-6 rounded-lg shadow-2xl max-w-sm w-full animate-pulse border-4 border-red-500">
                        <h2 className="text-2xl font-bold text-red-700 mb-2">
                            🚨 แจ้งเตือนเหตุฉุกเฉิน! 🚨
                        </h2>
                        <p className="text-gray-800 mb-4">
                            เกิดเหตุเมื่อเวลา:{' '}
                            <strong className="text-lg">
                                {accidentTime.toLocaleTimeString('th-TH', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit',
                                })}
                            </strong>
                        </p>
                        <p className="font-semibold mb-2">กรุณาติดต่อครอบครัวโดยด่วน:</p>
                        <ul className="space-y-2 mb-6">
                            {familyMembers.map((member) => (
                                <li key={member.phone} className="flex justify-between items-center">
                                    <span>{member.firstName} {member.lastName}</span>
                                    <a 
                                        href={`tel:${member.phone}`}
                                        className="text-blue-600 font-semibold hover:underline"
                                    >
                                        {member.phone}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={handleReset}
                            className="w-full bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-600 transition-colors"
                        >
                            รีเซ็ตสถานการณ์
                        </button>
                    </div>
                </div>
            )}

            {/* ปุ่มสำหรับแจ้งเหตุฉุกเฉิน */}
            <div className="p-4 bg-white shadow-md">
                 <button
                    onClick={handleEmergency}
                    disabled={isAccident} // ปิดการใช้งานปุ่มเมื่อมีการแจ้งเหตุไปแล้ว
                    className="w-full bg-red-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-700 transition-colors disabled:bg-red-300 disabled:cursor-not-allowed"
                 >
                    แจ้งเหตุฉุกเฉิน
                 </button>
            </div>

            {/* แผนที่ */}
            <div className="w-full h-[50vh]">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4073.8528200232126!2d100.60922549128834!3d13.684861485579098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29f2047b69e33%3A0xbec0e806b6e11305!2sTrue%20Digital%20Park%20West!5e0!3m2!1sen!2sth!4v1754672268178!5m2!1sen!2sth"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>

            {/* รายชื่อครอบครัว */}
            <div className="w-full p-4 bg-gray-100">
                <h2 className="text-xl font-bold mb-4">สมาชิกในครอบครัว</h2>
                <ul className="space-y-4">
                    {familyMembers.map((member, index) => (
                        <li key={index} className="p-4 bg-white rounded shadow">
                            <p><strong>ชื่อ:</strong> {member.firstName}</p>
                            <p><strong>นามสกุล:</strong> {member.lastName}</p>
                            <p><strong>เบอร์โทร:</strong> <a href={`tel:${member.phone}`} className="text-blue-600">{member.phone}</a></p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
