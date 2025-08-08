"use client";

import { useState, useRef, useEffect } from "react";

export default function CarouselSection() {
    const slides = [1,2,3,4,5];
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollRef = useRef(null);

    useEffect(() => {
        const el = scrollRef.current;

        if (!el) return;

        const onScroll = () => {
            const scrollLeft = el.scrollLeft;
            const slideWidth = el.clientWidth;
            const index = Math.round(scrollLeft / slideWidth);
            setActiveIndex(index);
        };

        el.addEventListener("scroll", onScroll, { passive: true });
        return () => el.removeEventListener("scroll", onScroll);
    }, [])


    return (
      <>
      {/* Carousel */}
      <div
        ref={scrollRef}
        className="h-[200px] mt-4 overflow-x-auto whitespace-nowrap flex gap-4 px-4 scroll-smooth scrollbar-hide"
      >
        {slides.map((item, index) => (
          <div
            key={index}
            className="inline-block w-full max-w-[90%] sm:max-w-[400px] h-full bg-gradient-to-r from-red-400 to-red-600 rounded-lg text-white flex items-center justify-center text-xl shrink-0"
          >
            Slide {item}
          </div>
        ))}
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center mt-2 gap-2">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              i === activeIndex ? "bg-red-500" : "bg-gray-300"
            } transition-all duration-300`}
          />
        ))}
      </div>
    </>
    )
}