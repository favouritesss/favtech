import React, { useState, useEffect } from 'react';

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-white flex items-center justify-center animate-fade-out pointer-events-none" style={{ animationDelay: '600ms' }}>
      <div className="relative">
        {/* Sharp Round Preloader */}
        <div className="w-20 h-20 border-4 border-navy/5 rounded-full"></div>
        <div className="absolute top-0 left-0 w-20 h-20 border-4 border-t-seafoam border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        
        {/* Digital Pulse Ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-seafoam/20 rounded-full animate-ping"></div>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
           <span className="text-[0.6rem] font-black text-navy uppercase tracking-[0.4em] animate-pulse">Initializing</span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
