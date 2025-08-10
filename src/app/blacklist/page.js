
// export default function Blacklist() {

//         const blockedWebsites = [
//   {
//     name: "www.facebook.com",
//     logo: "https://www.facebook.com/favicon.ico",
//   },
//   {
//     name: "www.youtube.com",
//     logo: "https://www.youtube.com/favicon.ico",
//   },
//   {
//     name: "www.tiktok.com",
//     logo: "https://www.tiktok.com/favicon.ico",
//   },
//   {
//     name: "www.roblox.com",
//     logo: "https://www.roblox.com/favicon.ico"
//   },
//   {
//     name: "www.instagram.com",
//     logo: "https://www.instagram.com/favicon.ico"
//   },
//   {
//     name: "www.google.com",
//     logo: "https://www.google.com/favicon.ico"
//   },
//   {
//     name: "www.x.com",
//     logo: "https://www.x.com/favicon.ico"
//   }
// ];
//         return (
//             <>
//             <div className="flex h-[150px] bg-blue-500 mt-2 mx-2 rounded-lg"> </div>
//                 <div className="flex max-w-md mx-auto">
//                     <input
//     type="search"
//     placeholder="Search..."
//     className="w-full h-[50px] bg-[#505050] my-2 mx-2 rounded-lg px-4 text-white placeholder-white focus:outline-none"
//     />

//                 </div>
//                 <div className="max-w-md mx-auto w-full px-2">
//                     <div className="flex items-center bg-white rounded-lg shadow px-4 py-2 my-2">
//                         <img src="https://www.google.com/favicon.ico" 
//                         alt="Website Logo"
//                         className="w-8 h-8 rounded mr-4" />
//                         <span className="text-gray-800 font-medium">www.google.com</span>
//                     </div>

//                     <div className="flex items-center my-4 px-4">
//         <div className="flex-grow h-px bg-gray-300" />
//         <span className="mx-4 text-gray-600 text-sm">Blocked List</span>
//         <div className="flex-grow h-px bg-gray-300" />
//       </div>
//  {/* Blocked List */}
//       <div className="max-w-md mx-auto w-full px-2 pb-24">
//   {blockedWebsites.map((site, index) => (
//     <div
//       key={index}
//       className="flex items-center bg-red-100 rounded-lg shadow px-4 py-2 my-2"
//     >
//       <img
//         src={site.logo}
//         alt="Website Logo"
//         className="w-8 h-8 rounded mr-4"
//       />
//       <span className="text-red-800 font-medium">{site.name}</span>
//     </div>
//   ))}
// </div>


      
//       {/* Floating Buttons - Centered at Bottom, Row Layout */}
// <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-4 z-50">
//   <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full shadow-lg">
//     Limited Access
//   </button>
//   <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full shadow-lg">
//     Block Website
//   </button>
// </div>

//                 </div>
//             </>
//         )
//     }




import React from 'react';

// --- ข้อมูลจำลอง (Mock Data) ---
// ในแอปพลิเคชันจริง ข้อมูลนี้จะมาจากระบบหลังบ้านหรือ API ที่คอยดักจับและวิเคราะห์ URL

const familyMembers = [
    { id: 'fm1', firstName: 'สมชาย' },
    { id: 'fm2', firstName: 'สมหญิง' },
    { id: 'fm3', firstName: 'น้องปิงปอง' },
];

const visitHistory = [
    {
        id: 'v1',
        url: 'https://k-bank-login-secure.com',
        title: 'เว็บฟิชชิ่งขโมยข้อมูลธนาคาร',
        category: 'Phishing',
        safetyLevel: 'critical', // อันตราย
        timestamp: '2023-10-27 14:30:15',
        ownerId: 'fm1',
    },
    {
        id: 'v2',
        url: 'https://youtube.com',
        title: 'YouTube',
        category: 'Entertainment',
        safetyLevel: 'safe', // ปลอดภัย
        timestamp: '2023-10-27 13:55:02',
        ownerId: 'fm3',
    },
    {
        id: 'v3',
        url: 'https://1xbet-th.com',
        title: 'เว็บพนันออนไลน์',
        category: 'Gambling',
        safetyLevel: 'critical', // อันตราย
        timestamp: '2023-10-27 11:20:45',
        ownerId: 'fm3',
    },
    {
        id: 'v4',
        url: 'https://facebook.com',
        title: 'Facebook',
        category: 'Social Media',
        safetyLevel: 'warning', // ควรระวัง (อาจใช้เวลามากเกินไป)
        timestamp: '2023-10-27 10:10:11',
        ownerId: 'fm2',
    },
    {
        id: 'v5',
        url: 'https://wikipedia.org',
        title: 'Wikipedia',
        category: 'Education',
        safetyLevel: 'safe', // ปลอดภัย
        timestamp: '2023-10-26 18:05:33',
        ownerId: 'fm1',
    },
    {
        id: 'v6',
        url: 'https://malware-download.xyz/free-game.exe',
        title: 'ดาวน์โหลดไฟล์ไม่ปลอดภัย',
        category: 'Malware',
        safetyLevel: 'critical', // อันตราย
        timestamp: '2023-10-26 16:45:00',
        ownerId: 'fm3',
    },
];

// --- Component ย่อยสำหรับแสดงแต่ละรายการในประวัติ ---
function HistoryItem({ visit, owner }) {
    const safetyStyles = {
        safe: {
            icon: '✅',
            borderColor: 'border-green-500',
            bgColor: 'bg-green-50',
            textColor: 'text-green-800',
        },
        warning: {
            icon: '⚠️',
            borderColor: 'border-yellow-500',
            bgColor: 'bg-yellow-50',
            textColor: 'text-yellow-800',
        },
        critical: {
            icon: '🚨',
            borderColor: 'border-red-500',
            bgColor: 'bg-red-50',
            textColor: 'text-red-800',
        },
    };

    const style = safetyStyles[visit.safetyLevel];

    return (
        <li className={`p-4 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between border-l-4 ${style.borderColor} ${style.bgColor} shadow-sm`}>
            <div className="flex items-center mb-2 sm:mb-0">
                <span className="text-2xl mr-4">{style.icon}</span>
                <div>
                    <p className={`font-bold ${style.textColor}`}>{visit.title}</p>
                    <a href={visit.url} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:underline break-all">
                        {visit.url}
                    </a>
                </div>
            </div>
            <div className="text-right text-sm text-gray-600 sm:ml-4 flex-shrink-0">
                <p><strong>ผู้เข้าชม:</strong> {owner.firstName}</p>
                <p className="text-gray-500">{visit.timestamp}</p>
            </div>
        </li>
    );
}

// --- Component หลักของหน้า Website Alert ---
export default function WebsiteAlertPage() {
    // --- ส่วนการวิเคราะห์ข้อมูล ---
    const criticalCount = visitHistory.filter(v => v.safetyLevel === 'critical').length;
    const warningCount = visitHistory.filter(v => v.safetyLevel === 'warning').length;

    // หาว่าใครมีความเสี่ยงสูงสุด
    const memberRisk = familyMembers.map(member => {
        const criticalVisits = visitHistory.filter(v => v.ownerId === member.id && v.safetyLevel === 'critical').length;
        return { name: member.firstName, riskScore: criticalVisits };
    }).sort((a, b) => b.riskScore - a.riskScore);

    const highestRiskMember = memberRisk[0]?.riskScore > 0 ? memberRisk[0] : null;

    const getOwnerInfo = (ownerId) => {
        return familyMembers.find(member => member.id === ownerId) || { id: 'unknown', firstName: 'ไม่ระบุ' };
    };
    
    // เรียงลำดับประวัติล่าสุดขึ้นก่อน
    const sortedHistory = [...visitHistory].sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp));


    return (
        <div className="w-full min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">ภาพรวมความปลอดภัยเว็บไซต์</h1>

                {/* 1. ส่วนสรุปและวิเคราะห์ */}
                <div className={`p-6 rounded-xl mb-8 shadow-lg ${
                    criticalCount > 0 ? 'bg-red-100 border-red-500' : 
                    warningCount > 0 ? 'bg-yellow-100 border-yellow-500' : 
                    'bg-green-100 border-green-500'
                } border-l-4`}>
                    <h2 className="text-2xl font-bold mb-4">สรุปสถานการณ์</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div className="bg-red-200 p-4 rounded-lg text-center">
                            <p className="text-4xl font-extrabold text-red-800">{criticalCount}</p>
                            <p className="font-semibold text-red-700">การแจ้งเตือนระดับอันตราย</p>
                        </div>
                        <div className="bg-yellow-200 p-4 rounded-lg text-center">
                            <p className="text-4xl font-extrabold text-yellow-800">{warningCount}</p>
                            <p className="font-semibold text-yellow-700">รายการที่ควรระวัง</p>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-2">คำแนะนำ:</h3>
                        {criticalCount > 0 ? (
                            <p className="text-red-900">
                                ตรวจพบการเข้าถึงเว็บไซต์อันตรายร้ายแรง! 
                                {highestRiskMember && ` โดยเฉพาะอย่างยิ่ง **${highestRiskMember.name}**.`}
                                 กรุณาตรวจสอบอุปกรณ์และพูดคุยเพื่อทำความเข้าใจถึงความเสี่ยงโดยด่วน
                            </p>
                        ) : warningCount > 0 ? (
                            <p className="text-yellow-900">
                                มีการเข้าถึงเว็บไซต์ที่ควรระวัง ควรตรวจสอบและให้คำแนะนำเกี่ยวกับการใช้งานอินเทอร์เน็ตอย่างปลอดภัย
                            </p>
                        ) : (
                            <p className="text-green-900">
                                สถานการณ์โดยรวมยังปลอดภัยดี ไม่พบการเข้าถึงเว็บไซต์ที่เป็นอันตราย
                            </p>
                        )}
                    </div>
                </div>

                {/* 2. ประวัติการเข้าชมทั้งหมด */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">ประวัติการเข้าชมล่าสุด</h2>
                    {sortedHistory.length > 0 ? (
                        <ul className="space-y-4">
                            {sortedHistory.map(visit => (
                                <HistoryItem 
                                    key={visit.id}
                                    visit={visit}
                                    owner={getOwnerInfo(visit.ownerId)}
                                />
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 text-center py-8">ยังไม่มีประวัติการเข้าชมเว็บไซต์</p>
                    )}
                </div>

            </div>
        </div>
    );
}

