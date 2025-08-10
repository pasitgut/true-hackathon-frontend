'use client';

import React, { useState } from 'react';

// --- 1. ปรับปรุงโครงสร้างข้อมูล ---

// เพิ่ม ID ให้กับสมาชิกแต่ละคนเพื่อใช้ในการอ้างอิง
const familyMembers = [
    { id: 'fm1', firstName: 'สมชาย', phone: '081-234-5678' },
    { id: 'fm2', firstName: 'สมหญิง', phone: '082-345-6789' },
    { id: 'fm3', firstName: 'น้องปิงปอง', phone: '083-456-7890' },
];

// เพิ่ม 'ownerId' ในแต่ละ transaction
const trueMoneyTransactions = [
    { id: 'tm-1', type: 'expense', merchant: '7-Eleven', amount: 45.00, date: '2023-10-27', time: '12:34', ownerId: 'fm1' },
    { id: 'tm-2', type: 'income', merchant: 'เงินโอนเข้าจาก KBank', amount: 500.00, date: '2023-10-27', time: '09:15', ownerId: 'fm2' },
    { id: 'tm-3', type: 'expense', merchant: 'Lotus\'s', amount: 750.50, date: '2023-10-26', time: '18:55', ownerId: 'fm1' },
    { id: 'tm-4', type: 'expense', merchant: 'ค่าเกมออนไลน์', amount: 300.00, date: '2023-10-25', time: '20:10', ownerId: 'fm3' },
];

// เพิ่ม 'ownerId' และ 'safetyLevel'
const smsTransactions = [
    { id: 'sms-1', sender: 'KBank', message: 'ยอดเงิน 2,000.00บ. เข้าบ/ช X-1234 ของคุณ ณ 26/10/66', date: '2023-10-26', ownerId: 'fm2', safetyLevel: 'safe' }, // ปลอดภัย
    { id: 'sms-2', sender: 'SCB', message: 'ใช้บัตรเครดิต SCB X-5678 ที่ Central World 1,500.00บ. วันที่ 25/10/66', date: '2023-10-25', ownerId: 'fm1', safetyLevel: 'warning' }, // ควรระวัง
    { id: 'sms-3', sender: 'Unknown', message: 'มีการพยายามเข้าสู่ระบบจากอุปกรณ์ที่ไม่รู้จัก กรุณาเปลี่ยนรหัสผ่านทันที', date: '2023-10-24', ownerId: 'fm3', safetyLevel: 'critical' }, // อันตราย
    { id: 'sms-4', sender: 'Gov. Lottery', message: 'ยินดีด้วย! เงินรางวัลสลากดิจิทัล 2,000.00บ. โอนเข้า G-Wallet เรียบร้อยแล้ว', date: '2023-10-16', ownerId: 'fm2', safetyLevel: 'safe' }, // ปลอดภัย
];


// --- 2. ปรับปรุง Component ลูก ---

function TrueMoneyItem({ transaction, owner }) {
    const isExpense = transaction.type === 'expense';
    const amountColor = isExpense ? 'text-red-600' : 'text-green-600';
    const amountSign = isExpense ? '-' : '+';
    
    return (
        <li className="p-4 bg-white rounded-lg shadow flex items-center justify-between">
            <div className="flex items-center space-x-4">
                {/* อวาตาร์ตัวย่อชื่อ */}
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                    {owner.firstName.charAt(0)}
                </div>
                <div>
                    <p className="font-bold">{transaction.merchant}</p>
                    <p className="text-sm text-gray-500">
                        โดย {owner.firstName} • {transaction.date} {transaction.time}
                    </p>
                </div>
            </div>
            <p className={`font-bold text-lg ${amountColor}`}>
                {amountSign} {transaction.amount.toFixed(2)}
            </p>
        </li>
    );
}

function SmsItem({ transaction, owner }) {
    // กำหนดสไตล์ตามระดับความปลอดภัย
    const safetyStyles = {
        safe: {
            border: 'border-green-500',
            bg: 'bg-green-50',
            icon: '✅',
        },
        warning: {
            border: 'border-yellow-500',
            bg: 'bg-yellow-50',
            icon: '⚠️',
        },
        critical: {
            border: 'border-red-500',
            bg: 'bg-red-50',
            icon: '🚨',
        }
    };

    const style = safetyStyles[transaction.safetyLevel] || safetyStyles.warning;

    return (
        <li className={`p-4 rounded-lg shadow-sm border-l-4 ${style.border} ${style.bg}`}>
            <div className="flex justify-between items-start mb-2">
                <p className="font-bold text-gray-800 flex items-center">
                    <span className="mr-2">{style.icon}</span>
                    {transaction.sender}
                </p>
                <div className="text-right">
                    <p className="text-sm text-gray-600">{transaction.date}</p>
                    <p className="text-sm text-gray-500">ถึง: {owner.firstName}</p>
                </div>
            </div>
            <p className="text-gray-700">{transaction.message}</p>
        </li>
    );
}


// --- 3. ปรับปรุง Component หลัก ---
export default function TransactionPage() {
    const [activeTab, setActiveTab] = useState('true_money');

    // ฟังก์ชันสำหรับหาข้อมูลเจ้าของ transaction
    const getOwnerInfo = (ownerId) => {
        return familyMembers.find(member => member.id === ownerId) || { id: 'unknown', firstName: 'ไม่ระบุ' };
    };

    return (
        <div className="flex flex-col w-full min-h-screen bg-gray-100">
            <div className="p-2 bg-white shadow-md sticky top-0 z-10">
                <div className="flex border-b-2 border-gray-200">
                    <button
                        onClick={() => setActiveTab('true_money')}
                        className={`flex-1 py-3 text-center font-semibold transition-colors ${
                            activeTab === 'true_money'
                                ? 'border-b-4 border-red-500 text-red-600'
                                : 'text-gray-500 hover:bg-gray-100'
                        }`}
                    >
                        True Money Wallet
                    </button>
                    <button
                        onClick={() => setActiveTab('sms')}
                        className={`flex-1 py-3 text-center font-semibold transition-colors ${
                            activeTab === 'sms'
                                ? 'border-b-4 border-blue-500 text-blue-600'
                                : 'text-gray-500 hover:bg-gray-100'
                        }`}
                    >
                        SMS Transactions
                    </button>
                </div>
            </div>

            <div className="p-4 w-full">
                {activeTab === 'true_money' && (
                    <div>
                        <h2 className="text-xl font-bold mb-4 text-gray-800">รายการจาก True Money</h2>
                        <ul className="space-y-3">
                            {trueMoneyTransactions.map(tx => (
                                <TrueMoneyItem 
                                    key={tx.id} 
                                    transaction={tx} 
                                    owner={getOwnerInfo(tx.ownerId)} 
                                />
                            ))}
                        </ul>
                    </div>
                )}

                {activeTab === 'sms' && (
                    <div>
                        <h2 className="text-xl font-bold mb-4 text-gray-800">รายการจาก SMS</h2>
                        <ul className="space-y-3">
                            {smsTransactions.map(tx => (
                                <SmsItem 
                                    key={tx.id} 
                                    transaction={tx} 
                                    owner={getOwnerInfo(tx.ownerId)} 
                                />
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
