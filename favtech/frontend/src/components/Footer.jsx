import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-navy text-white pt-32 pb-16 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-seafoam/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-y-16 lg:gap-x-12 mb-24">
          
          {/* Brand Identity */}
          <div className="col-span-2 md:col-span-3 lg:col-span-5 space-y-10">
            <Logo variant="full" className="h-10 brightness-0 invert" />
            <p className="max-w-md text-slate-400 font-medium text-sm leading-relaxed uppercase tracking-wider opacity-80">
              The premier social media acceleration platform for African creators. We provide high-fidelity engagement systems designed for exponential brand growth and digital sovereignty.
            </p>
            <div className="flex flex-wrap gap-8">
              {['Facebook', 'Instagram', 'Twitter', 'TikTok'].map(social => (
                <a key={social} href="#" className="text-slate-500 hover:text-seafoam transition-all duration-300 text-[0.6rem] font-black uppercase tracking-[0.3em]">{social}</a>
              ))}
            </div>
          </div>
          
          {/* Spacer for desktop */}
          <div className="hidden lg:block lg:col-span-1"></div>

          {/* Navigation Links */}
          <div className="col-span-1 lg:col-span-3 space-y-10">
            <h4 className="text-seafoam font-black uppercase tracking-[0.4em] text-[0.65rem] flex items-center gap-3">
              <span className="w-4 h-px bg-seafoam/30" />
              Navigation
            </h4>
            <ul className="space-y-6">
              {['Services', 'How it Works', 'Support', 'Help'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(' ', '-')}`} className="text-slate-400 hover:text-white hover:translate-x-2 inline-block transition-all duration-300 text-[0.65rem] font-black uppercase tracking-[0.3em]">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Protocol */}
          <div className="col-span-1 lg:col-span-3 space-y-10">
            <h4 className="text-seafoam font-black uppercase tracking-[0.4em] text-[0.65rem] flex items-center gap-3">
              <span className="w-4 h-px bg-seafoam/30" />
              Protocols
            </h4>
            <ul className="space-y-6">
              {['Terms', 'Privacy', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase()}`} className="text-slate-400 hover:text-white hover:translate-x-2 inline-block transition-all duration-300 text-[0.65rem] font-black uppercase tracking-[0.3em]">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer & Copyright */}
        <div className="pt-16 border-t border-white/5 space-y-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <div className="space-y-2">
              <p className="text-[0.6rem] font-black text-slate-500 uppercase tracking-[0.2em]">
                &copy; {currentYear} Premium SMM Global Operations.
                &copy; {currentYear} Global Operations.
              </p>
              <p className="text-[0.5rem] font-bold text-slate-600 uppercase tracking-widest leading-loose">
                Registered Digital Asset Services Provider. All systems encrypted.
              </p>
            </div>
            <p className="max-w-3xl text-[0.55rem] font-bold text-slate-500 uppercase tracking-widest leading-relaxed text-left lg:text-right opacity-50">
              Disclaimer: This is an independent intermediary service. We are not affiliated with, endorsed by, or sponsored by Meta, ByteDance, or X Corp. All trademarks are the property of their respective owners. Use of this platform constitutes acceptance of all operational protocols.
            </p>
          </div>
          
          <div className="flex justify-center lg:justify-start gap-4">
             <div className="w-2 h-2 rounded-full bg-seafoam animate-pulse"></div>
             <span className="text-[0.5rem] font-black text-slate-600 uppercase tracking-[0.4em]">System Status: Operational / Low Latency</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
