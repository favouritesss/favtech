import React from 'react';
import { Link } from 'react-router-dom';
import { useBrand } from '../context/BrandContext';

const Hero = () => {
  const { settings } = useBrand();

  return (
    <div className="relative pt-24 pb-20 md:pt-32 md:pb-40 px-6 overflow-hidden">
      {/* Smart Node Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,_rgba(20,184,166,0.1)_0%,_transparent_70%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between relative z-10">
        <div className="max-w-2xl text-center md:text-left mb-16 md:mb-0">
          <div className="inline-flex items-center space-x-3 px-5 py-1.5 bg-white border border-slate-100 rounded-full mb-8 animate-fade-in shadow-lg shadow-navy/5">
            <span className="w-2 h-2 bg-seafoam rounded-full animate-ping" />
            <span className="text-[0.55rem] font-black text-navy uppercase tracking-[0.3em]">Premium Engagement Platform</span>
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-black text-navy mb-8 leading-[1.1] tracking-tighter uppercase italic">
            Scale Your <br/> <span className="text-seafoam not-italic">Influence.</span>
          </h1>
          
          <p className="text-xs md:text-sm font-bold text-slate-500 mb-10 max-w-lg mx-auto md:mx-0 uppercase tracking-[0.2em] leading-relaxed">
            Premium social media acceleration for elite creators. Deploy high-fidelity engagement across every major digital terminal instantly.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
            <Link to="/services" className="px-10 py-5 bg-navy text-white font-black rounded-full shadow-xl shadow-navy/20 hover:translate-y-[-2px] active:translate-y-0 transition-all text-xs uppercase tracking-[0.3em]">
              Explore Services
            </Link>
            <Link to="/how-it-works" className="text-xs font-black text-navy uppercase tracking-[0.2em] hover:text-seafoam transition-colors border-b border-navy/10 hover:border-seafoam pb-1">
              Learn How it Works
            </Link>
          </div>
        </div>

        {/* The Smart Module - Simplified */}
        <div className="relative w-full max-w-md hidden lg:block animate-float">
           <div className="bg-white border border-slate-100 rounded-[3rem] shadow-2xl overflow-hidden p-10">
              <div className="flex justify-between items-center mb-8">
                 <span className="text-[0.5rem] font-black text-seafoam uppercase tracking-widest">System Online</span>
                 <span className="text-[0.5rem] font-black text-navy uppercase tracking-widest">ID: FAV-102</span>
              </div>
              <h3 className="text-2xl font-black text-navy uppercase italic mb-4">Real-time Growth</h3>
              <div className="space-y-4 mb-8">
                 <div className="flex justify-between text-[0.4rem] font-black uppercase tracking-widest text-slate-400">
                    <span>Performance</span>
                    <span>99.9%</span>
                 </div>
                 <div className="h-1.5 w-full bg-ice rounded-full overflow-hidden">
                    <div className="h-full bg-seafoam w-[92%]"></div>
                 </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 bg-ice rounded-2xl border border-seafoam/5">
                    <p className="text-[0.4rem] font-black text-seafoam uppercase tracking-widest mb-1">Followers</p>
                    <p className="text-lg font-black text-navy italic">+12.5k</p>
                 </div>
                 <div className="p-4 bg-navy rounded-2xl">
                    <p className="text-[0.4rem] font-black text-white/30 uppercase tracking-widest mb-1">Engagement</p>
                    <p className="text-lg font-black text-white italic">High</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
