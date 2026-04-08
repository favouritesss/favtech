import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Users, CreditCard, Package, Plug, ShoppingBag, Settings,
  Mail, Shield, Ticket, Gift, Bell, BarChart3, Tag, FileText, LogOut,
  ChevronDown, ChevronRight, TrendingUp, Menu, X, Activity, AlertTriangle, Moon, Sun
} from 'lucide-react';
import { useAdminTheme } from '../context/AdminThemeContext';
import { SESSION_KEYS } from '../services/api';

const ADMIN_NAV = [
  { label: 'Command Center', items: [
    { name: 'Overview', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
    { name: 'Activity Logs', path: '/admin/logs', icon: Activity },
  ]},
  { label: 'Operations', items: [
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Orders', path: '/admin/orders', icon: Package },
    { name: 'Transactions', path: '/admin/transactions', icon: CreditCard },
    { name: 'Support Tickets', path: '/admin/tickets', icon: Ticket },
  ]},
  { label: 'Platform', items: [
    { name: 'Services', path: '/admin/services', icon: ShoppingBag },
    { name: 'API Providers', path: '/admin/api-providers', icon: Plug },
    { name: 'Coupons', path: '/admin/coupons', icon: Tag },
    { name: 'Referral System', path: '/admin/referrals', icon: Gift },
    { name: 'Notifications', path: '/admin/notifications', icon: Bell },
  ]},
  { label: 'Configuration', items: [
    { name: 'App Settings', path: '/admin/settings', icon: Settings },
    { name: 'SMTP / Email', path: '/admin/smtp', icon: Mail },
    { name: 'Security', path: '/admin/security', icon: Shield },
  ]},
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { isDarkMode, toggleTheme } = useAdminTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // Only clear the ADMIN session — never touch user session keys
    localStorage.removeItem(SESSION_KEYS.ADMIN_TOKEN);
    localStorage.removeItem(SESSION_KEYS.ADMIN_DATA);
    navigate('/admin/login', { replace: true });
  };

  React.useEffect(() => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, [location.pathname]);

  const currentPage = ADMIN_NAV.flatMap(g => g.items).find(i => i.path === location.pathname)?.name || 'Admin';

  return (
    <div className="flex h-screen overflow-hidden font-sans transition-colors duration-300" style={{ backgroundColor: 'var(--admin-bg)' }}>
      {/* Sidebar */}
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside className={`flex-shrink-0 flex flex-col transition-all duration-300 border-r ${sidebarOpen ? 'w-72 translate-x-0' : '-translate-x-full lg:translate-x-0 w-16'} fixed lg:static top-0 left-0 h-full z-50 overflow-hidden`} 
        style={{ backgroundColor: 'var(--admin-sidebar-bg)', borderColor: 'var(--admin-border)' }}>
        {/* Brand */}
        <div className={`flex items-center gap-3 p-5 border-b flex-shrink-0 bg-white ${!sidebarOpen ? 'justify-center' : ''}`} style={{ borderColor: 'var(--admin-border)' }}>
          <div className="flex-shrink-0 flex items-center justify-center">
            {/* Logic to show actual logo if exists */}
            {localStorage.getItem('favtech_logo_url') || settings?.logo_url ? (
              <img src={`http://localhost:5000${localStorage.getItem('favtech_logo_url') || settings.logo_url}`} alt="Logo" className="max-h-9 w-auto object-contain" />
            ) : (
              <div className="w-9 h-9 bg-navy rounded-xl flex items-center justify-center shadow-lg shadow-navy/20">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
            )}
          </div>
          {sidebarOpen && (
            <div className="flex-1">
              <p className="font-black text-sm leading-none text-navy">FavTech</p>
              <p className="text-teal-500 text-[0.5rem] font-bold uppercase tracking-widest mt-0.5">Admin Console</p>
            </div>
          )}
          {sidebarOpen && (
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1.5 hover:bg-slate-100 rounded-xl text-navy">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Alerts Badge */}
        {sidebarOpen && (
          <div className="mx-4 mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <div>
              <p className="text-amber-400 text-[0.6rem] font-black uppercase tracking-wider">3 Pending Actions</p>
              <p style={{ color: 'var(--admin-text-secondary)' }} className="text-[0.5rem]">Orders awaiting review</p>
            </div>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 space-y-5">
          {ADMIN_NAV.map(group => (
            <div key={group.label}>
              {sidebarOpen && (
                <p style={{ color: 'var(--admin-text-muted)' }} className="text-[0.45rem] font-black uppercase tracking-[0.3em] px-5 mb-2">{group.label}</p>
              )}
              <div className="space-y-0.5 px-3">
                {group.items.map(item => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group
                        ${isActive ? 'bg-teal-500/15 text-teal-400 border border-teal-500/20' : ''}`}
                      style={{ 
                        color: isActive ? '' : 'var(--admin-text-secondary)',
                      }}
                      title={!sidebarOpen ? item.name : ''}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      {sidebarOpen && <span className="text-[0.65rem] font-bold uppercase tracking-wider">{item.name}</span>}
                      {isActive && sidebarOpen && <ChevronRight className="w-3 h-3 ml-auto" />}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t flex-shrink-0 space-y-1" style={{ borderColor: 'var(--admin-border)' }}>
          <NavLink to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all" style={{ color: 'var(--admin-text-secondary)' }}>
            <TrendingUp className="w-4 h-4 flex-shrink-0" />
            {sidebarOpen && <span className="text-[0.65rem] font-bold uppercase tracking-wider">View Site</span>}
          </NavLink>
          <button onClick={handleLogout} className={`flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-red-400/60 hover:bg-red-500/10 hover:text-red-400 transition-all ${!sidebarOpen ? 'justify-center' : ''}`}>
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {sidebarOpen && <span className="text-[0.65rem] font-bold uppercase tracking-wider">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top Bar */}
        <header className="h-14 border-b flex items-center px-6 gap-4 flex-shrink-0" style={{ backgroundColor: 'var(--admin-header-bg)', borderColor: 'var(--admin-border)' }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-black/5 transition-all" style={{ color: 'var(--admin-text-secondary)' }}>
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
          <div>
            <p className="font-black text-sm uppercase tracking-widest" style={{ color: 'var(--admin-text-primary)' }}>{currentPage}</p>
            <p className="text-[0.5rem] font-bold uppercase tracking-widest" style={{ color: 'var(--admin-text-muted)' }}>FavTech Admin Console</p>
          </div>
          <div className="ml-auto flex items-center gap-3">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="w-10 h-10 rounded-xl border flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-sm"
              style={{ borderColor: 'var(--admin-border)', backgroundColor: 'var(--admin-card-bg)', color: 'var(--admin-text-primary)' }}
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
            </button>

            <div className="flex items-center gap-2 px-4 py-2 rounded-xl border" style={{ backgroundColor: 'var(--admin-card-bg)', borderColor: 'var(--admin-border)' }}>
              <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
              <span className="text-[0.6rem] font-bold uppercase tracking-widest" style={{ color: 'var(--admin-text-secondary)' }}>System Online</span>
            </div>
            <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center text-white font-black text-xs shadow-lg">
              A
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto" style={{ backgroundColor: 'var(--admin-bg)' }}>
          <div className="p-6 max-w-[1400px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
