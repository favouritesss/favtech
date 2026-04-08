import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await authService.register(formData);
      navigate('/login');
    } catch (err) {
      console.error('Register Detail Error:', err);
      setError(err.response?.data?.error || err.message || 'Registration failed. Check if Backend is running.');
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
            <span className="text-2xl font-bold text-navy">FavTech</span>
          </Link>
          <h1 className="text-3xl font-extrabold text-navy">Create Account</h1>
          <p className="text-slate-500 font-medium mt-2">Join thousands of elite marketing professionals</p>
        </div>

        <div className="bg-white p-10 rounded-[2rem] shadow-2xl shadow-slate-200 border border-white">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-bold border border-red-100 uppercase italic">
              {error}
            </div>
          )}
          
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-navy mb-2 ml-1 tracking-widest">Full Name</label>
              <input 
                type="text" 
                required
                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-seafoam focus:bg-white transition-all font-medium"
                placeholder="Ex. John Doe"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-navy mb-2 ml-1 tracking-widest">Email Address</label>
              <input 
                type="email" 
                required
                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-seafoam focus:bg-white transition-all font-medium"
                placeholder="name@company.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-navy mb-2 ml-1 tracking-widest">Password</label>
              <input 
                type="password" 
                required
                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-seafoam focus:bg-white transition-all font-medium"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-seafoam text-white py-4 rounded-xl font-black shadow-xl shadow-seafoam/20 hover:scale-105 active:scale-95 transition-all text-xs tracking-widest uppercase disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Get Access Now'}
            </button>
          </form>

          <p className="text-center mt-10 text-slate-500 font-medium">
            Already have an account? <Link to="/login" className="text-navy font-bold hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
