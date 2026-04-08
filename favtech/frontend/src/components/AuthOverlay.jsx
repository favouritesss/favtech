import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, SESSION_KEYS } from '../services/api';
import { useBrand } from '../context/BrandContext';

const AuthOverlay = ({ isOpen, onClose, initialView = 'login' }) => {
  const { settings } = useBrand();
  const navigate = useNavigate();
  const [view, setView] = useState(initialView);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      if (view === 'register') {
        await authService.register(form);
        // After registration, switch to login view
        setView('login');
        setError('');
        setForm({ name: '', email: form.email, password: '' });
        return;
      }

      // Login
      const { data } = await authService.login(form);
      const { user, token } = data;

      if (user.role === 'admin' || user.role === 'support' || user.role === 'finance') {
        // Admin — send them to admin login for proper admin session
        onClose();
        navigate('/admin/login?hint=' + encodeURIComponent(form.email));
        return;
      }

      // Standard user — save to user namespace only
      localStorage.setItem(SESSION_KEYS.USER_TOKEN, token);
      localStorage.setItem(SESSION_KEYS.USER_DATA, JSON.stringify(user));
      onClose();
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.error || err.response?.data?.message || err.message || 'Authentication failed.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-fade-in">
      {/* Blurred Backdrop */}
      <div 
        className="absolute inset-0 bg-navy/60 backdrop-blur-xl animate-fade-in" 
        onClick={onClose}
      ></div>

      {/* The MAD Modal */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-slide-up flex flex-col max-h-[90vh]">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-seafoam"></div>
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center hover:bg-slate-50 transition-all font-black z-20"
        >
          ✕
        </button>

        <div className="p-10 overflow-y-auto custom-scrollbar">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-navy tracking-tight mb-1 uppercase italic" style={{ fontFamily: 'Times New Roman, serif' }}>
              {view === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-[0.6rem] font-black text-slate-dark opacity-50 uppercase tracking-[0.2em]">Access your boosting dashboard</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 font-bold text-[0.6rem] uppercase animate-shake">
              {error}
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-5">
            {view === 'register' && (
              <div className="space-y-1">
                <label className="text-[0.5rem] font-black text-navy uppercase tracking-widest ml-2">Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ex. John Doe"
                  className="w-full p-4 bg-ice border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-seafoam/10 font-bold placeholder:opacity-20 text-navy text-xs"
                  onChange={(e) => setForm({...form, name: e.target.value})}
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[0.5rem] font-black text-navy uppercase tracking-widest ml-2">Email Address</label>
              <input 
                type="email" 
                required
                placeholder="user@email.com"
                className="w-full p-4 bg-ice border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-seafoam/10 font-bold placeholder:opacity-20 text-navy text-xs"
                onChange={(e) => setForm({...form, email: e.target.value})}
              />
            </div>

            <div className="space-y-1">
              <label className="text-[0.5rem] font-black text-navy uppercase tracking-widest ml-2">Password</label>
              <input 
                type="password" 
                required
                placeholder="••••••••"
                className="w-full p-4 bg-ice border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-seafoam/10 font-bold text-xs"
                onChange={(e) => setForm({...form, password: e.target.value})}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 bg-navy text-white font-black text-sm rounded-2xl shadow-xl shadow-navy/10 hover:translate-y-[-2px] active:translate-y-[0] transition-all mt-4 uppercase tracking-[0.3em]"
            >
              {loading ? 'Working...' : (view === 'login' ? 'Login' : 'Register')}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8 flex justify-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
            <span className="relative bg-white px-4 text-[0.5rem] font-black text-slate-dark opacity-30 uppercase tracking-widest">OR USE SOCIAL</span>
          </div>

          <button className="w-full py-4 border border-slate-100 rounded-2xl flex items-center justify-center space-x-3 hover:bg-slate-50 transition-all">
            <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-4 h-4" alt="Google" />
            <span className="text-[0.6rem] font-black text-navy uppercase tracking-widest">Sign in with Google</span>
          </button>

          <p className="mt-8 text-center text-[0.6rem] font-bold text-slate-dark uppercase tracking-widest opacity-60">
            {view === 'login' ? "New here?" : "Already have an account?"}
            <button 
              onClick={() => setView(view === 'login' ? 'register' : 'login')}
              className="ml-2 text-seafoam hover:underline underline-offset-4"
            >
              {view === 'login' ? 'Create Account' : 'Back to Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthOverlay;
