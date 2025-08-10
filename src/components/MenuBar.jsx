"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const MenuBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState('');

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Family', path: '/family' },
    { name: 'Inbox', path: '/inbox' },
    { name: 'Check URL', path: '/check-url' },
  ];
  
  // อัปเดตเมนูที่ active ตาม URL ปัจจุบันเสมอ
  useEffect(() => {
    const currentItem = menuItems.find(item => item.path === pathname);
    if (currentItem) {
      setActiveItem(currentItem.name);
    } else {
      // หาจาก path หลัก ในกรณีที่เป็น sub-route เช่น /family/members
      const parentItem = menuItems.find(item => item.path !== '/' && pathname.startsWith(item.path));
      setActiveItem(parentItem ? parentItem.name : 'Home');
    }
  }, [pathname, menuItems]); // เพิ่ม menuItems ใน dependency array (Best practice)


  const handleClick = (item) => {
    setActiveItem(item.name);
    router.push(item.path);
  };

  return (
  <nav className="w-full overflow-x-auto scrollbar-hide bg-white border-b border-gray-100">
  <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8 px-8 py-4 whitespace-nowrap flex-nowrap">
    {menuItems.map((item) => (
      <div
        key={item.name}
        className="relative cursor-pointer group py-2"
        onClick={() => handleClick(item)}
      >
        <span
          className={`
            text-sm font-medium transition-colors duration-300
            ${activeItem === item.name 
              ? 'text-red-500'
              : 'text-gray-600 group-hover:text-red-500'
            }
          `}
        >
          {item.name}
        </span>
        <div
          className={`
            absolute -bottom-0 left-0 w-full h-0.5 rounded-full transition-all duration-300
            ${activeItem === item.name
              ? 'bg-red-500'
              : 'bg-gray-300 scale-x-0 group-hover:scale-x-100'
            }
          `}
        ></div>
      </div>
    ))}
  </div>
</nav>

  );
};

export default MenuBar;
