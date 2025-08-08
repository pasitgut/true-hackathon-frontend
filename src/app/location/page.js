import React from 'react';

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
    return (
        <div className="flex flex-col w-full min-h-screen">
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
