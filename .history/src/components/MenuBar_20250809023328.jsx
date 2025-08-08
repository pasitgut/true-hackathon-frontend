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
      <div className="flex flex-nowrap md:flex-nowrap items-center justify-center bg-[#F5F5F5] border-2 border-[#F5F5F5] rounded-[100px] px-3 md:px-3 py-3 md:py-3 lg:py-3 lg:px-3 shadow-md hover:shadow-lg transition-all duration-300 gap-0 ">
      {/* <div className="grid grid-cols-5 bg-[#F5F5F5] border-2 border-[#F5F5F5] rounded-[100px] shadow-md hover:shadow-lg transition-shadow duration-300 w-[400px] sm:w-[400px] md:w-[400px] lg:w-[400px] xl:w-[400px] gap-0">   */}
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`
              relative cursor-pointer transition-all duration-300 ease-in-out px-2 md:px-6 py-2 md:py-3 rounded-xl select-none text-center whitespace-nowrap
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

// return (
//     <nav className="flex justify-center items-center p-4 md:p-6 bg-white min-h-[50px] md:min-h-[100px]">
//       <div className="grid grid-cols-5 bg-[#F5F5F5] border-2 border-[#F5F5F5] rounded-[100px] shadow-md hover:shadow-lg transition-all duration-300 w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl xl:max-w-4xl">
//         {menuItems.map((item, index) => (
//           <div
//             key={index}
//             className={`
//               relative cursor-pointer transition-all duration-300 ease-in-out select-none text-center whitespace-nowrap
//               px-1 py-3 first:pl-3 last:pr-3 first:rounded-l-[100px] last:rounded-r-[100px]
//               sm:px-2 sm:py-4 sm:first:pl-4 sm:last:pr-4
//               md:px-3 md:py-5 md:first:pl-6 md:last:pr-6
//               lg:px-4 lg:py-6 lg:first:pl-8 lg:last:pr-8
//               ${activeItem === item.name 
//                 ? 'text-red-500 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold' 
//                 : hoveredItem === item.name
//                 ? 'text-gray-700 text-xs sm:text-sm md:text-base lg:text-lg font-semibold'
//                 : 'text-gray-600 text-xs sm:text-sm md:text-base lg:text-base font-medium hover:text-gray-800'
//               }
//             `}
//             onClick={() => handleClick(item)}
//             onMouseEnter={() => handleMouseEnter(item)}
//             onMouseLeave={handleMouseLeave}
//           >
//             <span className={`block ${activeItem === item.name ? 'transform scale-105' : hoveredItem === item.name ? 'transform scale-105' : ''} transition-transform duration-300`}>
//               {item.name}
//             </span>
            
//             {/* Active indicator */}
//             {activeItem === item.name && (
//               <div className="absolute -bottom-1 md:-bottom-2 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 md:w-2 md:h-2 bg-red-500 rounded-full animate-pulse"></div>
//             )}
            
//             {/* Hover effect */}
//             {hoveredItem === item.name && activeItem !== item.name && (
//               <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4 sm:w-6 md:w-8 h-0.5 bg-gray-400 rounded transition-all duration-300"></div>
//             )}
//           </div>
//         ))}
//       </div>
//     </nav>
//   );

// return (
//     <nav className="flex justify-center items-center p-4 md:p-6 bg-white min-h-[50px] md:min-h-[100px]">
//             <div className="grid grid-cols-5 bg-[#F5F5F5] border-2 border-[#F5F5F5] rounded-[100px] shadow-md hover:shadow-lg transition-shadow duration-300 w-[320px] sm:w-[400px] md:w-[400px] lg:w-[400px] xl:w-[400px]">
//         {menuItems.map((item, index) => (
//           <div
//             key={index}
//             className={`
//               relative cursor-pointer transition-colors duration-300 ease-in-out select-none text-center whitespace-nowrap overflow-hidden
//               px-1 py-3 first:pl-3 last:pr-3 first:rounded-l-[100px] last:rounded-r-[100px]
//               sm:px-2 sm:py-4 sm:first:pl-4 sm:last:pr-4
//               md:px-3 md:py-5 md:first:pl-6 md:last:pr-6
//               lg:px-4 lg:py-6 lg:first:pl-8 lg:last:pr-8
//               ${activeItem === item.name 
//                 ? 'text-red-500 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold' 
//                 : hoveredItem === item.name
//                 ? 'text-gray-700 text-xs sm:text-sm md:text-base lg:text-lg font-semibold'
//                 : 'text-gray-600 text-xs sm:text-sm md:text-base lg:text-base font-medium hover:text-gray-800'
//               }
//             `}
//             onClick={() => handleClick(item)}
//             onMouseEnter={() => handleMouseEnter(item)}
//             onMouseLeave={handleMouseLeave}
//           >
//             <span className="block leading-tight">
//               {item.name}
//             </span>
            
//             {/* Active indicator */}
//             {activeItem === item.name && (
//               <div className="absolute -bottom-1 md:-bottom-2 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 md:w-2 md:h-2 bg-red-500 rounded-full animate-pulse"></div>
//             )}
            
//             {/* Hover effect */}
//             {hoveredItem === item.name && activeItem !== item.name && (
//               <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4 sm:w-6 md:w-8 h-0.5 bg-gray-400 rounded transition-all duration-300"></div>
//             )}
//           </div>
//         ))}
//       </div>
//     </nav>
//   );


};

export default MenuBar;