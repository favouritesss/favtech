import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldAlert, Lock, User, Eye, EyeOff, Terminal, Activity } from 'lucide-react';
import { authService, SESSION_KEYS } from '../../services/api';

const AdminLogin = () => {
  const location = useLocation();
  const hintEmail = new URLSearchParams(location.search).get('hint') || '';
  const [email, setEmail] = useState(hintEmail);
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await authService.login({ email, password });
      const { user, token } = response.data;

      // Gate: only admin / support / finance roles allowed
      if (user.role !== 'admin' && user.role !== 'support' && user.role !== 'finance') {
        throw new Error('Access Denied: Administrative credentials required.');
      }

      // Store ONLY in the admin namespace — never touches user session keys
      localStorage.setItem(SESSION_KEYS.ADMIN_TOKEN, token);
      localStorage.setItem(SESSION_KEYS.ADMIN_DATA, JSON.stringify(user));

      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Authentication failed');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050b1a] flex items-center justify-center p-6 font-sans">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-teal-500/10 border border-teal-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_50px_rgba(20,184,166,0.1)]">
            <ShieldAlert className="w-10 h-10 text-teal-400" />
          </div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Admin <span className="text-teal-400">Command</span></h1>
          <p className="text-white/30 text-xs font-bold uppercase tracking-widest mt-2 flex items-center justify-center gap-2">
            <Activity className="w-3 h-3 text-teal-500 animate-pulse" /> Secure Management Gateway
          </p>
        </div>

        <form onSubmit={handleAdminLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[0.65rem] font-black text-white/40 uppercase tracking-widest ml-1">Terminal ID (Email)</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <User className="w-4 h-4 text-white/20 group-focus-within:text-teal-400 transition-colors" />
              </div>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@favtech.com"
                className="w-full pl-12 pr-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white text-sm outline-none placeholder-white/20 focus:border-teal-500/50 focus:bg-white/10 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[0.65rem] font-black text-white/40 uppercase tracking-widest ml-1">Encryption Key (Password)</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <Lock className="w-4 h-4 text-white/20 group-focus-within:text-teal-400 transition-colors" />
              </div>
              <input 
                type={showPass ? "text" : "password"}
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-14 py-4 bg-white/5 border border-white/10 rounded-2xl text-white text-sm outline-none placeholder-white/20 focus:border-teal-500/50 focus:bg-white/10 transition-all"
              />
              <button 
                type="button" 
                onClick={() => setShowPass(!showPass)}
                className="absolute inset-y-0 right-0 pr-5 flex items-center text-white/20 hover:text-white transition-colors"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 animate-head-shake">
              <div className="w-2 h-2 rounded-full bg-red-500 pulse" />
              <p className="text-red-400 text-[0.7rem] font-bold uppercase tracking-wide">{error}</p>
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-5 bg-teal-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-teal-400 active:scale-[0.98] transition-all relative overflow-hidden group shadow-[0_20px_50px_rgba(20,184,166,0.2)]"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-3">
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                Validating...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <Terminal className="w-4 h-4" /> Authenticate Backend
              </div>
            )}
          </button>
        </form>

        <p className="text-center mt-10 text-white/20 text-[0.65rem] font-black uppercase tracking-widest">
          Authorized personnel only. <br/> All access attempts are recorded in the system logs.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
