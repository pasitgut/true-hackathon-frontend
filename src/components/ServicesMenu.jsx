"use client";
import React, { useState } from 'react';
const ServicesMenu = () => {
    const services = [
      {
        id: 1,
        name: "ภาครัฐสำคัญ",
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="4" width="18" height="12" stroke="currentColor" strokeWidth="2" fill="none"/>
            <rect x="5" y="8" width="4" height="4" fill="currentColor"/>
            <rect x="10" y="6" width="8" height="2" fill="currentColor"/>
            <rect x="10" y="10" width="6" height="2" fill="currentColor"/>
          </svg>
        )
      },
      {
        id: 2,
        name: "ธุรกิจเป็นมิตร",
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
        )
      },
      {
        id: 3,
        name: "สถิติ",
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3 3v18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )
      },
      {
        id: 4,
        name: "คู่มือสำคัญ",
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M8 7h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M8 11h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        )
      },
      {
        id: 5,
        name: "เส้นทาง MRT",
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
            <circle cx="8" cy="18" r="2" stroke="currentColor" strokeWidth="2" fill="none"/>
            <circle cx="16" cy="18" r="2" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M3 12h18" stroke="currentColor" strokeWidth="2"/>
            <path d="M8 6v6" stroke="currentColor" strokeWidth="2"/>
            <path d="M16 6v6" stroke="currentColor" strokeWidth="2"/>
          </svg>
        )
      },
      {
        id: 6,
        name: "Corp ระดับ",
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" fill="none"/>
            <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" fill="none"/>
            <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" fill="none"/>
            <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
        )
      },
      {
        id: 7,
        name: "Alpay+",
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 6v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M6 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        )
      },
      {
        id: 8,
        name: "ดูทั้งหมด",
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )
      }
    ];
  
    const handleServiceClick = (service) => {
      console.log(`Clicked: ${service.name}`);
    };
  
    return (
      <div className="w-80 mx-auto p-1" style={{ fontSize: '18px' }}>
        <div className="grid grid-cols-4 gap-3">
          {services.map((service, index) => (
            <button
              key={service.id}
              onClick={() => handleServiceClick(service)}
              className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200 hover:scale-105 ${
                index === 7 
                  ? 'bg-red-500 text-white hover:bg-red-600 shadow-sm border border-red-100' 
                  : 'bg-white text-red-500 hover:bg-red-50'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                index === 7 
                  ? 'bg-white/20' 
                  : 'bg-red-50'
              }`}>
                {service.icon}
              </div>
              <span className="text-xs font-medium text-center leading-tight">
                {service.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  };
  
  export default ServicesMenu;