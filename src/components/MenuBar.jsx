"use client";
import React, { useState } from 'react';

const MenuBar = () => {
  const [activeItem, setActiveItem] = useState('Home');
  const [hoveredItem, setHoveredItem] = useState('');

  const menuItems = [
    { name: 'Home', type: 'item' },
    { name: 'Family', type: 'item' },
    { name: 'Collection', type: 'item' },
    { name: 'About', type: 'item' },
    { name: 'Contact us', type: 'item' }
  ];

  const handleClick = (item) => {
    setActiveItem(item.name);
  };

  const handleMouseEnter = (item) => {
    setHoveredItem(item.name);
  };

  const handleMouseLeave = () => {
    setHoveredItem('');
  };

  return (
    <nav className="flex justify-center items-center px-3 py-3 bg-white min-h-[75px] max-w-sm overflow-x-hidden">
  <div className="flex flex-nowrap items-center justify-center bg-[#F5F5F5] border-2 border-[#F5F5F5] rounded-[100px] px-3 py-3 shadow-md hover:shadow-lg transition-all duration-300 gap-0 max-w-[400px]">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`
              relative cursor-pointer transition-all duration-300 ease-in-out px-2 md:px-3 py-2 md:py-2 rounded-xl select-none text-center whitespace-nowrap
              ${activeItem === item.name 
                ? 'text-red-500 text-base md:text-base font-bold transform scale-105 md:scale-110' 
                : hoveredItem === item.name
                ? 'text-gray-700 text-sm md:text-sm font-semibold transform scale-105 bg-gray-50'
                : 'text-gray-600 text-xs md:text-xs font-medium hover:text-gray-800'
              }
            `}
            onClick={() => handleClick(item)}
            onMouseEnter={() => handleMouseEnter(item)}
            onMouseLeave={handleMouseLeave}
          >
            {item.name}
            
            {/* Active indicator */}
            {activeItem === item.name && (
              <div className="absolute -bottom-1 md:-bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            )}
            
            {/* Hover effect */}
            {hoveredItem === item.name && activeItem !== item.name && (
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gray-400 rounded transition-all duration-300"></div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );

};

export default MenuBar;