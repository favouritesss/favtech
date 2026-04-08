import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useBrand } from '../context/BrandContext';
import {
  LayoutDashboard, PlusCircle, ClipboardList, Wallet, User, Users,
  Gift, Code2, LifeBuoy, ShieldCheck, BadgeCheck, Download, HelpCircle,
  LogOut, Bell, Search, ChevronDown, TrendingUp, Menu, X, Sun, Moon, PieChart, Package
} from 'lucide-react';
import { userService, SESSION_KEYS } from '../services/api';

const DashboardLayout = () => {
  const { settings } = useBrand();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEYS.USER_DATA) || '{}');
    } catch { return {}; }
  });
  const navigate = useNavigate();
  const location = useLocation();

  const fetchProfile = async () => {
    try {
      const res = await userService.getProfile();
      setUser(res.data);
      // Update ONLY the user namespace
      localStorage.setItem(SESSION_KEYS.USER_DATA, JSON.stringify(res.data));
    } catch (err) {
      console.error('Failed to fetch user profile');
    }
  };

  useEffect(() => {
    fetchProfile();

    // Inactivity Timer (Security Enhancement)
    let timeout;
    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        handleLogout();
      }, 30 * 60 * 1000); // 30 minutes
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keypress', resetTimer);
    resetTimer();

    return () => {
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keypress', resetTimer);
      clearTimeout(timeout);
    };
  }, [location.pathname]);

  const handleLogout = () => {
    // Only clear the USER session — never touch admin session keys
    localStorage.removeItem(SESSION_KEYS.USER_TOKEN);
    localStorage.removeItem(SESSION_KEYS.USER_DATA);
    navigate('/login', { replace: true });
  };

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, [location.pathname]);

  const navGroups = [
    {
      label: 'Main',
      items: [
        { name: 'Overview', path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" />, exact: true },
        { name: 'Analytics', path: '/dashboard/analytics', icon: <PieChart className="w-5 h-5" /> },
        { name: 'New Order', path: '/dashboard/new-order', icon: <PlusCircle className="w-5 h-5" /> },
        { name: 'My Orders', path: '/dashboard/orders', icon: <ClipboardList className="w-5 h-5" /> },
        { name: 'Finance / Wallet', path: '/dashboard/add-funds', icon: <Wallet className="w-5 h-5" /> },
      ]
    },
    {
      label: 'Network',
      items: [
        { name: 'Profile Settings', path: '/dashboard/profile', icon: <User className="w-5 h-5" /> },
        { name: 'Invite & Earn', path: '/dashboard/referrals', icon: <Users className="w-5 h-5" /> },
        { name: 'API Services', path: '/dashboard/api', icon: <Code2 className="w-5 h-5" /> },
      ]
    },
    {
      label: 'Governance',
      items: [
        { name: 'Support Tickets', path: '/dashboard/tickets', icon: <LifeBuoy className="w-5 h-5" /> },
        { name: '2FA Security', path: '/dashboard/security', icon: <ShieldCheck className="w-5 h-5" /> },
        { name: 'Trust Verification', path: '/dashboard/verify', icon: <BadgeCheck className="w-5 h-5" /> },
        { name: 'App Installation', path: '/dashboard/install', icon: <Download className="w-5 h-5" /> },
      ]
    }
  ];

  const [currencyDropdown, setCurrencyDropdown] = useState(false);

  return (
    <div className={`flex h-screen overflow-hidden ${darkMode ? 'bg-gray-950 text-white' : 'bg-[#f8fafc] text-[#0f172a]'} font-sans transition-colors duration-300`}>
      
      {/* ─── Mobile Header (Sleek Theme) ─── */}
      <div className="lg:hidden fixed top-0 w-full h-20 bg-white/90 backdrop-blur-md z-40 flex items-center justify-between px-5 border-b border-slate-100 shadow-sm">
        <button onClick={() => setDarkMode(!darkMode)} className={`p-2 transition-colors relative z-50 ${darkMode ? 'text-white' : 'text-navy'}`}>
           {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        
        <div className="flex-1 flex justify-center">
          <Link to="/dashboard" className="h-8">
            <img src={settings.logo_url ? `http://localhost:5000${settings.logo_url}` : "/logo.png"} alt="Logo" className="h-full w-auto object-contain" />
          </Link>
        </div>
        
        <div className="flex items-center gap-4 relative z-50">
          <div className="relative">
            <div onClick={() => setCurrencyDropdown(!currencyDropdown)} className={`flex items-center gap-1.5 cursor-pointer py-2 ${darkMode ? 'text-white' : 'text-navy'}`}>
              <span className="font-black text-sm uppercase tracking-widest">NGN</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${currencyDropdown ? 'rotate-180' : ''}`} />
            </div>
            {currencyDropdown && (
              <div className="absolute top-10 right-0 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden w-24 z-50">
                 <button onClick={() => setCurrencyDropdown(false)} className="w-full px-4 py-3 text-xs font-black text-navy uppercase text-center hover:bg-slate-50 transition-colors">NGN</button>
                 <button onClick={() => setCurrencyDropdown(false)} className="w-full px-4 py-3 text-xs font-black text-slate-400 uppercase text-center hover:bg-slate-50 transition-colors border-t border-slate-50">USD</button>
              </div>
            )}
          </div>
          <button onClick={() => setSidebarOpen(true)} className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${darkMode ? 'bg-white/10 text-white' : 'bg-navy text-white shadow-lg'}`}>
            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </button>
        </div>
      </div>

      {/* ─── Sidebar Overlay (Backdrop) for Mobile ─── */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-[60] lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ─── Sidebar ─── */}
      <aside className={`
        ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-[#0f172a]'} text-white flex flex-col flex-shrink-0 transition-transform duration-300 z-[70]
        ${sidebarOpen ? 'w-64 translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-64'}
        fixed lg:static top-0 left-0 h-full border-r overflow-hidden shadow-2xl lg:shadow-none
      `}>
        {/* Brand Container with white background for logo visibility */}
        <div className={`p-6 border-b ${darkMode ? 'border-gray-800' : 'border-white/10'} flex-shrink-0 bg-white flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            {settings.logo_url ? (
              <img src={`http://localhost:5000${settings.logo_url}`} alt="Logo" className="max-h-10 w-auto object-contain" />
            ) : (
              <div className="w-10 h-10 bg-navy rounded-2xl flex items-center justify-center shadow-lg shadow-navy/20 flex-shrink-0 overflow-hidden">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
            )}
            {sidebarOpen && (
              <div className="overflow-hidden flex-1">
                <p className="font-black text-navy text-base leading-none tracking-tight">{settings.site_name || 'FavTech'}</p>
                <p className="text-teal-600 text-[0.45rem] font-black uppercase tracking-[0.2em] mt-1">Prime Console</p>
              </div>
            )}
          </div>
          {sidebarOpen && (
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 hover:bg-slate-100 rounded-xl transition-colors">
              <X className="w-5 h-5 text-navy" />
            </button>
          )}
        </div>

        {/* Nav */}
        <div className="flex-1 overflow-y-auto py-6 space-y-8 custom-scrollbar scrollbar-hide">
          {navGroups.map(group => (
            <div key={group.label} className="space-y-3">
              {sidebarOpen && (
                <p className="text-white/20 text-[0.45rem] font-black uppercase tracking-[0.4em] px-7 mb-4">{group.label}</p>
              )}
              <div className="space-y-1.5 px-4">
                {group.items.map(item => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.exact}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group
                      ${isActive
                        ? 'bg-teal-500 text-white shadow-xl shadow-teal-500/30'
                        : 'text-white/40 hover:bg-white/5 hover:text-white'
                      }`
                    }
                    title={!sidebarOpen ? item.name : ''}
                  >
                    <span className="flex-shrink-0 transition-transform group-hover:scale-110 duration-300">{item.icon}</span>
                    {sidebarOpen && (
                      <span className="text-[0.65rem] font-black uppercase tracking-widest truncate">{item.name}</span>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Wallet Quick View */}
        {sidebarOpen && (
          <div className="mx-4 mb-4 p-5 bg-gradient-to-br from-teal-500/20 to-teal-500/5 border border-teal-500/20 rounded-[2rem] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/10 blur-3xl rounded-full translate-x-12 translate-y-[-12px]" />
            <p className="text-white/30 text-[0.5rem] font-black uppercase tracking-widest mb-1 relative z-10">Wallet Balance</p>
            <p className="text-white font-black text-2xl tracking-tighter relative z-10">₦{Number(user.wallet_balance || 0).toLocaleString()}</p>
            <button
              onClick={() => navigate('/dashboard/add-funds')}
              className="mt-4 w-full py-2.5 bg-teal-500 text-white text-[0.55rem] font-black uppercase tracking-widest rounded-xl hover:bg-teal-400 transition-all shadow-lg shadow-teal-500/20 relative z-10"
            >
              + Fund Account
            </button>
          </div>
        )}

        {/* Sign Out */}
        <div className="px-4 pb-6 flex-shrink-0">
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 px-4 py-3.5 w-full rounded-2xl text-red-400/50 hover:bg-red-500/10 hover:text-red-400 transition-all ${!sidebarOpen ? 'justify-center' : ''}`}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="text-[0.65rem] font-black uppercase tracking-widest">Terminate Session</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        
        {/* Top Header (Desktop Only) */}
        <header className={`hidden lg:flex flex-shrink-0 h-16 border-b ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-slate-100'} items-center px-6 gap-6 z-30 transition-colors duration-300`}>
          <div className="flex-1 md:flex max-w-md items-center gap-4 px-5 py-2.5 rounded-2xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-slate-50 border-slate-100'}">
            <Search className="w-5 h-5 text-slate-300" />
            <input placeholder="Search intelligent services..." className={`text-xs font-bold bg-transparent outline-none w-full ${darkMode ? 'text-white placeholder-gray-600' : 'text-navy placeholder-slate-400'}`} />
          </div>

          <div className="flex-1" />

          <div className="flex items-center gap-3">
             <button onClick={() => setDarkMode(!darkMode)} className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${darkMode ? 'bg-gray-800 text-teal-400 shadow-inner shadow-teal-500/10' : 'bg-slate-50 text-slate-400 hover:text-teal-500'}`}>
               {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
             </button>

             {/* Notif */}
             <div className="relative">
                <button onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }} className={`w-10 h-10 rounded-xl flex items-center justify-center relative transition-all ${darkMode ? 'bg-gray-800 text-white' : 'bg-slate-50 text-slate-400 hover:text-teal-500'}`}>
                   <Bell className="w-5 h-5" />
                   <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-teal-500 rounded-full border-2 ${darkMode ? 'border-gray-900' : 'border-white'} animate-pulse" />
                </button>
             </div>

             {/* Profile */}
             <div className="relative">
               <button onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }} className={`flex items-center gap-3 p-1.5 rounded-2xl transition-all ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-slate-50 hover:bg-slate-100'}`}>
                 <div className="w-8 h-8 bg-teal-500 rounded-xl flex items-center justify-center text-white font-black text-xs shadow-lg shadow-teal-500/20">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                 </div>
                 <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
               </button>
               {profileOpen && (
                 <div className={`absolute right-0 top-14 w-64 rounded-[2rem] shadow-2xl border z-50 overflow-hidden ${darkMode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-slate-100 text-navy'} animate-slide-up`}>
                    <div className="p-6 border-b border-white/5 bg-[#0f172a] text-white">
                       <p className="font-black text-sm tracking-tight">{user.name}</p>
                       <p className="text-[0.6rem] text-teal-400 font-bold uppercase tracking-widest mt-1">Tier: Diamond Affiliate</p>
                    </div>
                    <div className="p-2">
                       {[
                         { label: 'My Identity', path: '/dashboard/profile' },
                         { label: 'Security Hub', path: '/dashboard/security' },
                         { label: 'Integrations', path: '/dashboard/api' }
                       ].map(i => (
                         <button key={i.label} onClick={() => { navigate(i.path); setProfileOpen(false); }} className={`w-full text-left px-5 py-3.5 text-[0.65rem] font-black uppercase tracking-widest rounded-xl transition-all ${darkMode ? 'text-white hover:bg-teal-500' : 'text-navy hover:bg-slate-100'}`}>
                            {i.label}
                         </button>
                       ))}
                       <button onClick={handleLogout} className="w-full text-left px-5 py-3.5 text-[0.65rem] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 hover:text-red-600 transition-all rounded-xl mt-2">
                          Sign Out
                       </button>
                    </div>
                 </div>
               )}
             </div>
          </div>
        </header>

        {/* Content View */}
        <main className={`flex-1 overflow-y-auto overflow-x-hidden ${darkMode ? 'bg-gray-950' : 'bg-[#f8fafc]'} custom-scrollbar pt-20 lg:pt-0 pb-20 lg:pb-0 w-full max-w-[100vw]`}>
           <div className="p-4 md:p-8 lg:p-10 max-w-7xl mx-auto min-h-full w-full">
              <Outlet context={{ darkMode, user }} />
           </div>
        </main>

        {/* ─── Mobile Bottom Navigation (Sleek Theme) ─── */}
        <div className="lg:hidden fixed bottom-0 w-full h-[72px] bg-white border-t border-slate-100 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] flex items-center justify-around px-2 z-40 rounded-t-3xl">
          <button onClick={() => setSidebarOpen(true)} className="flex flex-col items-center justify-center w-12 h-12 text-slate-400 hover:text-navy transition-colors">
            <Menu className="w-5 h-5 mb-1" />
            <span className="text-[0.55rem] font-black uppercase">Menu</span>
          </button>
          
          <button onClick={() => navigate('/dashboard/add-funds')} className={`flex flex-col items-center justify-center w-12 h-12 transition-colors ${location.pathname.includes('add-funds') ? 'text-navy' : 'text-slate-400'}`}>
            <Wallet className="w-5 h-5 mb-1" />
            <span className="text-[0.55rem] font-black uppercase">Wallet</span>
          </button>
          
          {/* Center Floater */}
          <div className="relative -top-6">
            <button 
              onClick={() => navigate('/dashboard')}
              className="w-14 h-14 bg-teal-500 rounded-full flex items-center justify-center shadow-xl shadow-teal-500/30 border-4 border-white transform hover:scale-105 transition-all text-white"
            >
              <LayoutDashboard className="w-6 h-6" />
            </button>
          </div>
          
          <button onClick={() => navigate('/dashboard/new-order')} className={`flex flex-col items-center justify-center w-12 h-12 transition-colors ${location.pathname.includes('new-order') ? 'text-navy' : 'text-slate-400'}`}>
            <Package className="w-5 h-5 mb-1" />
            <span className="text-[0.55rem] font-black uppercase">Order</span>
          </button>
          
          <button onClick={() => navigate('/dashboard/profile')} className={`flex flex-col items-center justify-center w-12 h-12 transition-colors ${location.pathname.includes('profile') ? 'text-navy' : 'text-slate-400'}`}>
            <User className="w-5 h-5 mb-1" />
            <span className="text-[0.55rem] font-black uppercase">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
