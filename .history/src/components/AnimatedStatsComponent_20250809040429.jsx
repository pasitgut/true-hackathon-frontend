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
    const duration = 2000; // 2 seconds
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
    <div className="flex items-center bg-white rounded p-2 flex-1">
      <div className={`w-8 h-8 rounded-full ${bgColor} flex items-center justify-center mr-2`}>
        <div className="text-white text-sm">
          {icon}
        </div>
      </div>
      <div className="flex-1">
        <div className={`text-lg font-bold ${color} tabular-nums leading-tight`}>
          {count}
        </div>
        <div className="text-gray-600 text-xs font-medium leading-tight">
          {label}
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-80 mx-auto p-4" style={{ fontSize: '14px' }}>
      <div className="flex space-x-2">
        <StatItem
          icon="📦"
          count={formatNumber(Math.floor(counts.products))}
          label="Premium Product"
          color="text-orange-600"
          bgColor="bg-orange-500"
        />
        <StatItem
          icon="😊"
          count={formatNumber(Math.floor(counts.customers))}
          label="Happy Customer"
          color="text-purple-600"
          bgColor="bg-purple-500"
        />
        <StatItem
          icon="💚"
          count={Math.floor(counts.years) + '+'}
          label="Years Serving"
          color="text-green-600"
          bgColor="bg-green-500"
        />
      </div>
    </div>
  );
};

export default AnimatedStatsComponent;