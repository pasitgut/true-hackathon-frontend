// "use client";
// import React ,{ useState } from 'react';


// const MenuBar = () => {
//     const [activeItem, setActiveItem] = useState('');
//     const [hoveredItem, setHoveredItem] = useState('');
  
//     const menuItems = [
//       { name: 'Motrew', type: 'logo' },
//       { name: 'Menu', type: 'item' },
//       { name: 'Collection', type: 'item' },
//       { name: 'About', type: 'item' },
//       { name: 'Contact Us', type: 'item' }
//     ];
  
//     const handleClick = (item) => {
//       setActiveItem(item.name);
//     };
  
//     const handleMouseEnter = (item) => {
//       setHoveredItem(item.name);
//     };
  
//     const handleMouseLeave = () => {
//       setHoveredItem('');
//     };
  
//     return (
//       <nav className="menu-bar">
//         <div className="menu-container">
//           {menuItems.map((item, index) => (
//             <div
//               key={index}
//               className={`menu-item ${item.type} ${
//                 activeItem === item.name ? 'active' : ''
//               } ${hoveredItem === item.name ? 'hovered' : ''}`}
//               onClick={() => handleClick(item)}
//               onMouseEnter={() => handleMouseEnter(item)}
//               onMouseLeave={handleMouseLeave}
//             >
//               {item.name}
//             </div>
//           ))}
//         </div>
//       </nav>
//     );
//   };

// export default MenuBar

// "use client";
// import React, { useState } from 'react';

// const MenuBar = () => {
//   const [activeItem, setActiveItem] = useState('');
//   const [hoveredItem, setHoveredItem] = useState('');

//   const menuItems = [
//     { name: 'Motrew', type: 'logo' },
//     { name: 'Menu', type: 'item' },
//     { name: 'Collection', type: 'item' },
//     { name: 'About', type: 'item' },
//     { name: 'Contact Us', type: 'item' }
//   ];

//   const handleClick = (item) => {
//     setActiveItem(item.name);
//   };

//   const handleMouseEnter = (item) => {
//     setHoveredItem(item.name);
//   };

//   const handleMouseLeave = () => {
//     setHoveredItem('');
//   };

//   return (
//     <nav className="flex justify-center items-center p-5 bg-gradient-to-br from-gray-50 to-blue-100 min-h-[80px]">
//       <div className="flex items-center bg-white/90 backdrop-blur-md border-3 border-blue-500 rounded-full px-10 py-4 shadow-xl transition-all duration-300 gap-10 hover:shadow-2xl hover:-translate-y-1">
//         {menuItems.map((item, index) => (
//           <div
//             key={index}
//             className={`
//               relative cursor-pointer transition-all duration-300 font-medium px-4 py-2 rounded-full select-none
//               ${item.type === 'logo' 
//                 ? `text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent mr-5 px-5 hover:scale-110` 
//                 : `text-gray-600 hover:text-gray-800 hover:bg-blue-50 hover:-translate-y-0.5`
//               }
//               ${activeItem === item.name && item.type === 'item' 
//                 ? 'text-white bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg -translate-y-0.5 animate-pulse' 
//                 : ''
//               }
//               ${hoveredItem === item.name && item.type === 'item' 
//                 ? 'text-blue-500 bg-blue-50' 
//                 : ''
//               }
//             `}
//             onClick={() => handleClick(item)}
//             onMouseEnter={() => handleMouseEnter(item)}
//             onMouseLeave={handleMouseLeave}
//           >
//             {item.name}
//           </div>
//         ))}
//       </div>
//     </nav>
//   );
// };

// export default MenuBar;

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
    <nav className="flex justify-center items-center p-4 md:p-6 bg-white min-h-[50px] md:min-h-[100px]">
      <div className="flex flex-nowrap md:flex-nowrap items-center justify-center bg-[#F5F5F5] border-2 border-[#F5F5F5] rounded-[100px] px-6 md:px-10 py-3 md:py-8 shadow-md hover:shadow-lg transition-all duration-300 gap-0 max-w-4xl">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`
              relative cursor-pointer transition-all duration-300 ease-in-out px-6 md:px-2 py-2 md:py-3 rounded-xl select-none text-center whitespace-nowrap
              ${activeItem === item.name 
                ? 'text-red-500 text-base md:text-xl font-bold transform scale-105 md:scale-110' 
                : hoveredItem === item.name
                ? 'text-gray-700 text-sm md:text-lg font-semibold transform scale-105 bg-gray-50'
                : 'text-gray-600 text-xs md:text-base font-medium hover:text-gray-800'
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