"use client";
import React ,{ useState } from 'react';

// function MenuBar() {
//   return (
//     <div>MenuBar</div>
//   )
// }

const MenuBar = () => {
    const [activeItem, setActiveItem] = useState('');
    const [hoveredItem, setHoveredItem] = useState('');
  
    const menuItems = [
      { name: 'Motrew', type: 'logo' },
      { name: 'Menu', type: 'item' },
      { name: 'Collection', type: 'item' },
      { name: 'About', type: 'item' },
      { name: 'Contact Us', type: 'item' }
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
      <nav className="menu-bar">
        <div className="menu-container">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`menu-item ${item.type} ${
                activeItem === item.name ? 'active' : ''
              } ${hoveredItem === item.name ? 'hovered' : ''}`}
              onClick={() => handleClick(item)}
              onMouseEnter={() => handleMouseEnter(item)}
              onMouseLeave={handleMouseLeave}
            >
              {item.name}
            </div>
          ))}
        </div>
      </nav>
    );
  };

export default MenuBar