"use client";
import { useState, useEffect } from 'react';

const AnimatedStatsComponent = () => {
  const [counts, setCounts] = useState({
    products: 0,
    customers: 0,
    years: 0
  });

  const targetValues = {
    products: 900,
    customers: 500,
    years: 30
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'k+';
    }
    return num + '+';
  };

  useEffect(() => {
    const duration = 1500; // 2 seconds
    const steps = 60;
    const interval = duration / steps;

    const timer = setInterval(() => {
      setCounts(prev => ({
        products: Math.min(prev.products + (targetValues.products / steps), targetValues.products),
        customers: Math.min(prev.customers + (targetValues.customers / steps), targetValues.customers),
        years: Math.min(prev.years + (targetValues.years / steps), targetValues.years)
      }));
    }, interval);

    const cleanup = setTimeout(() => {
      clearInterval(timer);
      setCounts({
        products: targetValues.products,
        customers: targetValues.customers,
        years: targetValues.years
      });
    }, duration);

    return () => {
      clearInterval(timer);
      clearTimeout(cleanup);
    };
  }, []);

  const StatItem = ({ icon, count, label, color, bgColor }) => (
    <div className="flex items-center bg-white rounded p-1 py-3 flex-1">
      <div className={`w-13 h-13 rounded-full ${bgColor} flex items-center justify-center mr-2`}>
        <div className="text-white text-[28px]">
          {icon}
        </div>
      </div>
      <div className="flex-1">
        <div className={`text-lg font-bold ${color} tabular-nums leading-tight`}>
          {count}
        </div>
        <div className="text-gray-600 text-[8px] font-medium leading-tight">
          {label}
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full mx-auto p-4" style={{ fontSize: '14px' }}>
      <div className="flex space-x-2">
        <StatItem
          icon="📦"
          count={formatNumber(Math.floor(counts.products))}
          label="Premium Product" 
          color="text-black"
          bgColor="bg-[#FFB988]"
        />
        <StatItem
          icon="😊"
          count={formatNumber(Math.floor(counts.customers))}
          label="Happy Customer"
          color="text-black"
          bgColor="bg-[#ED282E]"
        />
        <StatItem
          icon="💚"
          count={Math.floor(counts.years) + '+'}
          label="Years Serving"
          color="text-black"
          bgColor="bg-[#ED282E]"
        />
      </div>
    </div>
  );
};

export default AnimatedStatsComponent;