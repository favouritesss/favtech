import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { useBrand } from '../context/BrandContext';
import Logo from './Logo';
import AuthOverlay from './AuthOverlay';

import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const { settings } = useBrand();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Services', path: '/services' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Support', path: '/support' },
    { name: 'Help', path: '/help' },
  ];

  return (
    <>

      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-xl shadow-md py-3 lg:py-5' : 'bg-white shadow-sm py-5 lg:py-8'}`}>
        <div className="max-w-7xl mx-auto px-5 lg:px-10 flex justify-between items-center">
          
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <Logo className="h-10" variant="full" />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className="relative text-[0.6rem] font-black uppercase tracking-[0.3em] transition-all duration-300 group"
                  style={{ color: isActive ? '#14b8a6' : '#0f172a' }}
                >
                  {item.name}
                  {/* Active underline */}
                  <span
                    className="absolute -bottom-1 left-0 h-0.5 bg-seafoam transition-all duration-300"
                    style={{ width: isActive ? '100%' : '0%' }}
                  />
                  {!isActive && (
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-seafoam/50 group-hover:w-full transition-all duration-300" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={() => navigate('/?overlay=login')}
              className="text-[0.6rem] font-black text-navy uppercase tracking-[0.3em] hover:text-seafoam transition-colors px-4 py-2"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/?overlay=register')}
              className="px-6 py-3 bg-navy text-white text-[0.6rem] font-black uppercase tracking-[0.3em] rounded-xl hover:bg-seafoam transition-all shadow-lg"
            >
              Register
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-navy hover:bg-slate-50 rounded-xl transition-all"
            aria-label="Menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[150] bg-[#0f172a]/95 backdrop-blur-md flex flex-col transition-all duration-500 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center flex-1 gap-8 p-10">
          {navLinks.map((item, i) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className="text-3xl font-black uppercase tracking-tight transition-all duration-300"
                style={{
                  color: isActive ? '#14b8a6' : '#ffffff',
                  transitionDelay: `${i * 60}ms`,
                  opacity: isMenuOpen ? 1 : 0,
                  transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)'
                }}
              >
                {item.name}
              </Link>
            );
          })}

          <div className="flex flex-col gap-4 w-full max-w-xs mt-8 pt-8 border-t border-white/10">
            <button
              onClick={() => { setIsMenuOpen(false); navigate('/?overlay=login'); }}
              className="w-full py-4 border border-white/20 text-white font-black text-xs uppercase tracking-widest rounded-2xl"
            >
              Login
            </button>
            <button
              onClick={() => { setIsMenuOpen(false); navigate('/?overlay=register'); }}
              className="w-full py-4 bg-seafoam text-white font-black text-xs uppercase tracking-widest rounded-2xl"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
