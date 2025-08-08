"use client";
import React, { useState } from 'react';
import { ChevronRightIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // ข้อมูล slides
  const slides = [
    {
      id: 1,
      title: "Discover Amazing Places",
      subtitle: "Explore the world's most beautiful destinations",
      description: "Find your perfect getaway with our curated collection of stunning locations.",
      mainImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      previewImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=400&fit=crop"
    },
    {
      id: 2,
      title: "Urban Adventures",
      subtitle: "Experience vibrant city life",
      description: "Immerse yourself in the energy and culture of metropolitan destinations.",
      mainImage: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
      previewImage: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=400&fit=crop"
    },
    {
      id: 3,
      title: "Natural Wonders",
      subtitle: "Connect with nature's beauty",
      description: "Discover breathtaking landscapes and peaceful natural environments.",
      mainImage: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
      previewImage: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=400&fit=crop"
    }
  ];

  const handleNext = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
      setIsAnimating(false);
    }, 250);
  };

  const handlePreviewClick = () => {
    handleNext();
  };

  const currentSlide = slides[currentIndex];
  const nextIndex = (currentIndex + 1) % slides.length;
  const nextSlide = slides[nextIndex];

  return (
    <div className="w-full max-w-sm mx-auto bg-white overflow-hidden">
      <div className="relative w-full h-[250px] flex">
        
        {/* ส่วนที่ 1: Content Section (ซ้าย) */}
        <div className="relative z-30 w-1/3 bg-white from-slate-50 to-slate-100 p-6 flex flex-col justify-between">
          <div className="space-y-3">
            <h1 className="text-lg font-bold text-gray-800 leading-tight">
              {currentSlide.title}
            </h1>
            <h2 className="text-sm font-medium text-gray-600">
              {currentSlide.subtitle}
            </h2>
            <p className="text-xs text-gray-500 leading-relaxed">
              {currentSlide.description}
            </p>
          </div>
          
          {/* Search Box */}
          <div className="relative">
            <div className="flex items-center bg-white rounded-full shadow-sm border border-gray-200 overflow-hidden">
              <div className="flex-1 flex items-center px-3 py-2">
                <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search destinations..."
                  className="flex-1 text-xs text-gray-600 placeholder-gray-400 border-none outline-none bg-transparent"
                />
              </div>
              
              {/* Search Button */}
              <button
                onClick={handleNext}
                disabled={isAnimating}
                className="relative z-40 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                <ChevronRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* ส่วนที่ 2: Main Image Section (กลาง) */}
        <div className="relative w-1/2 h-[250px] overflow-hidden">
          <div 
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              isAnimating ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100'
            }`}
            style={{ aspectRatio: '4/3' }}
          >
            <img
              src={currentSlide.mainImage}
              alt={currentSlide.title}
              className="w-full h-[250px] object-cover rounded-lg"
            />
          </div>
          
          {/* Next Image (สำหรับ animation) */}
          <div 
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              isAnimating ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
            }`}
            style={{ aspectRatio: '4/3' }}
          >
            <img
              src={nextSlide.mainImage}
              alt={nextSlide.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>

        {/* ส่วนที่ 3: Preview Section (ขวา) */}
        <div className="absolute right-0 top-0 w-16 h-full z-20">
          <button
            onClick={handlePreviewClick}
            disabled={isAnimating}
            className="w-full h-full relative overflow-hidden group disabled:cursor-not-allowed"
          >
            <div 
              className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                isAnimating ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100'
              }`}
            >
              <img
                src={nextSlide.previewImage}
                alt="Next"
                className="w-full h-full object-cover object-left transition-transform duration-300 group-hover:scale-105"
              />
              {/* <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-5 transition-all duration-300"></div> */}
            </div>
            
            {/* Next preview image (สำหรับ animation) */}
            <div 
              className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                isAnimating ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
              }`}
            >
              <img
                src={slides[(nextIndex + 1) % slides.length].previewImage}
                alt="Next"
                className="w-full h-full object-cover object-left transition-transform duration-300 group-hover:scale-105"
              />
              {/* <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-5 transition-all duration-300"></div> */}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;