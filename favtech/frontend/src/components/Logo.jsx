import React from 'react';
import { useBrand } from '../context/BrandContext';
import { TrendingUp } from 'lucide-react';

const Logo = ({ className = 'h-10', variant = 'full' }) => {
  const { settings } = useBrand();
  const logoUrl = settings.logo_url ? `http://localhost:5000${settings.logo_url}` : null;

  return (
    <div className={`flex items-center space-x-3 group cursor-pointer ${className}`}>
      {logoUrl ? (
        <div className="relative h-full">
           <img src={logoUrl} alt={settings.site_name} className="h-full w-auto object-contain transition-all duration-300 group-hover:scale-105" />
        </div>
      ) : (
        <div className="relative">
          <div className="w-12 h-12 bg-navy rounded-xl flex items-center justify-center transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 shadow-lg shadow-navy/20 overflow-hidden">
            <div className="relative font-black text-white text-2xl tracking-tighter">
              F
              <div className="absolute top-0 -right-2 flex space-x-0.5">
                <div className="w-1 h-1 bg-seafoam animate-pulse"></div>
                <div className="w-1 h-3 bg-seafoam/50"></div>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-seafoam/20 blur-xl rounded-full -z-10 group-hover:bg-seafoam/40 transition-colors"></div>
        </div>
      )}
      
      {variant === 'full' && (
        <div className="flex flex-col">
          <span className="text-2xl font-black text-navy leading-none tracking-tight">
            {settings.site_name.split(' ')[0]}<span className="text-seafoam underline decoration-2 underline-offset-4">{settings.site_name.split(' ').slice(1).join(' ')}</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
