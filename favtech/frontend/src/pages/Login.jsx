import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService, SESSION_KEYS } from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await authService.login({ email, password });
      const { user, token } = response.data;

      if (user.role === 'admin' || user.role === 'support' || user.role === 'finance') {
        // Admin user — redirect to admin login page so they use admin session
        navigate('/admin/login?hint=' + encodeURIComponent(email));
        return;
      }

      // Standard user — store under user-only namespace
      localStorage.setItem(SESSION_KEYS.USER_TOKEN, token);
      localStorage.setItem(SESSION_KEYS.USER_DATA, JSON.stringify(user));
      navigate('/dashboard');
    } catch (err) {
      console.error('Login Detail Error:', err);
      setError(err.response?.data?.error || err.message || 'Authentication failed. Check if Backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center space-x-2 mb-8">
            <div className="w-10 h-10 bg-navy rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">F</span>
            </div>
          </Link>
          <h1 className="text-3xl font-extrabold text-navy">Welcome Back</h1>
          <p className="text-slate-500 font-medium mt-2">Enter your credentials to access your dashboard</p>
        </div>

        <div className="bg-white p-10 rounded-[2rem] shadow-2xl shadow-slate-200 border border-white">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-bold border border-red-100 flex items-center">
              <span className="mr-2">⚠️</span> {error}
            </div>
          )}
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-navy mb-2 ml-1 uppercase tracking-widest">Email Address</label>
              <input 
                type="email" 
                required
                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-seafoam focus:bg-white transition-all font-medium"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="block text-sm font-bold text-navy uppercase tracking-widest">Password</label>
                <a href="#" className="text-xs font-bold text-seafoam hover:text-navy transition-colors">Forgot Password?</a>
              </div>
              <input 
                type="password" 
                required
                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-seafoam focus:bg-white transition-all font-medium"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-navy text-white py-4 rounded-xl font-bold shadow-xl shadow-navy/20 hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center mt-10 text-slate-500 font-medium">
            Don't have an account? <Link to="/register" className="text-seafoam font-bold hover:underline">Register Now</Link>
          </p>
        </div>
        
        <div className="mt-10 text-center text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">
          Secured by FavTech Enterprise Guard
        </div>
      </div>
    </div>
  );
};

export default Login;
