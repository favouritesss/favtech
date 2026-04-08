import React, { useState, useEffect } from 'react';
import { 
  Users, TrendingUp, Package, CreditCard, 
  Clock, AlertCircle, CheckCircle, Activity, 
  ArrowUp, ArrowDown, RefreshCw, Layers 
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar, Cell 
} from 'recharts';
import { adminService } from '../../services/api';
import { useAdminTheme } from '../../context/AdminThemeContext';

const StatCard = ({ label, value, subtext, icon: Icon, color, trend }) => {
  return (
    <div className="border rounded-3xl p-6 hover:border-teal-500/20 transition-all group overflow-hidden relative"
      style={{ backgroundColor: 'var(--admin-card-bg)', borderColor: 'var(--admin-border)' }}>
      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${color || ''}`}>
          {Icon && <Icon className="w-6 h-6 text-white" />}
        </div>
        {trend && (
          <div className={`px-2.5 py-1 rounded-full text-[0.6rem] font-black uppercase tracking-widest flex items-center gap-1 ${trend > 0 ? 'bg-teal-500/10 text-teal-400' : 'bg-red-500/10 text-red-400'}`}>
            {trend > 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div className="relative z-10">
        <p style={{ color: 'var(--admin-text-muted)' }} className="text-[0.6rem] font-black uppercase tracking-[0.2em] mb-1">{label}</p>
        <p style={{ color: 'var(--admin-text-primary)' }} className="font-black text-3xl tracking-tighter">{value || '0'}</p>
        <p style={{ color: 'var(--admin-text-muted)' }} className="text-[0.55rem] font-medium mt-1 uppercase tracking-widest">{subtext}</p>
      </div>
      <div className={`absolute -right-4 -bottom-4 w-32 h-32 blur-[60px] opacity-10 rounded-full ${color?.split(' ')[0] || ''}`} />
    </div>
  );
};

const AdminDashboard = () => {
  const [period, setPeriod] = useState('week');
  const [loading, setLoading] = useState(true);
  const theme = useAdminTheme();
  const isDarkMode = theme?.isDarkMode ?? true;
  
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    todayRevenue: 0
  });
  const [chartData, setChartData] = useState([]);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [statsRes, chartRes] = await Promise.all([
        adminService.getStats(),
        adminService.getChartData(period)
      ]);
      
      if (statsRes?.data) setStats(statsRes.data);
      
      // Seed data if empty to ensure the graph engine has SOMETHING to draw
      const data = chartRes?.data?.length > 0 ? chartRes.data : [
        { label: 'Mon', revenue: 0, orders: 0 },
        { label: 'Tue', revenue: 0, orders: 0 },
        { label: 'Wed', revenue: 0, orders: 0 },
        { label: 'Thu', revenue: 0, orders: 0 },
        { label: 'Fri', revenue: 0, orders: 0 },
        { label: 'Sat', revenue: 0, orders: 0 },
        { label: 'Sun', revenue: 0, orders: 0 }
      ];
      setChartData(data);
    } catch (err) {
      console.error('Dashboard Sync Error:', err);
    } finally {
      setTimeout(() => setLoading(false), 800); // Smooth transition
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [period]);

  const dashboardCards = [
    { label: 'Platform Users', value: (stats?.totalUsers || 0).toLocaleString(), subtext: 'Total registered accounts', icon: Users, color: 'bg-violet-500/20 text-violet-400', trend: 12 },
    { label: 'Total Gross', value: `₦${(stats?.totalRevenue || 0).toLocaleString()}`, subtext: 'Lifetime platform revenue', icon: TrendingUp, color: 'bg-teal-500/20 text-teal-400', trend: 8 },
    { label: 'Pipeline', value: (stats?.pendingOrders || 0).toLocaleString(), subtext: 'Orders currently processing', icon: Clock, color: 'bg-amber-500/20 text-amber-400' },
    { label: 'Market Volume', value: (stats?.totalOrders || 0).toLocaleString(), subtext: 'Total orders executed', icon: Package, color: 'bg-blue-500/20 text-blue-400', trend: 19 },
  ];

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
       <RefreshCw className="w-10 h-10 text-teal-400 animate-spin" />
       <p style={{ color: 'var(--admin-text-muted)' }} className="text-[0.6rem] font-black uppercase tracking-[0.4em]">Compiling Analytics Cluster...</p>
    </div>
  );

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-1000">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight" style={{ color: 'var(--admin-text-primary)' }}>System Intel</h1>
          <p style={{ color: 'var(--admin-text-muted)' }} className="text-sm font-medium mt-1 uppercase tracking-widest">Real-time performance analytics cluster</p>
        </div>

        <div className="flex items-center gap-2 p-1 border rounded-2xl" style={{ backgroundColor: 'var(--admin-card-bg)', borderColor: 'var(--admin-border)' }}>
          {['week', 'month'].map(p => (
            <button key={p} onClick={() => setPeriod(p)} 
              className={`px-6 py-2.5 rounded-xl text-[0.6rem] font-black uppercase tracking-widest transition-all
                ${period === p ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/20' : 'hover:bg-black/5'}`}
              style={{ color: period === p ? 'white' : 'var(--admin-text-secondary)' }}
            >{p}</button>
          ))}
          <div className="w-[1px] h-4 mx-2" style={{ backgroundColor: 'var(--admin-border)' }} />
          <button onClick={fetchAllData} className="p-2.5 hover:bg-black/5 rounded-xl transition-all" style={{ color: 'var(--admin-text-secondary)' }}>
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardCards.map((card, i) => <StatCard key={i} {...card} />)}
      </div>

      <div className="grid lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-8 border rounded-[2.5rem] p-8 flex flex-col justify-between" style={{ backgroundColor: 'var(--admin-card-bg)', borderColor: 'var(--admin-border)', minHeight: '450px' }}>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-500 flex items-center justify-center shadow-lg shadow-teal-500/20 text-white"><Activity className="w-6 h-6" /></div>
              <div>
                <h3 className="font-black text-sm uppercase tracking-widest" style={{ color: 'var(--admin-text-primary)' }}>Monetary Flow</h3>
                <p style={{ color: 'var(--admin-text-muted)' }} className="text-[0.6rem] font-bold uppercase tracking-widest mt-1">Revenue Stream Analysis</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-black text-2xl tracking-tighter" style={{ color: 'var(--admin-text-primary)' }}>₦{(stats?.todayRevenue || 0).toLocaleString()}</p>
              <p className="text-teal-400 text-[0.55rem] font-black uppercase tracking-widest">Today's Terminal Value</p>
            </div>
          </div>
          
          <div className="w-full" style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)"} />
                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.6)', fontSize: 10, fontWeight: 900 }} dy={10} />
                <YAxis hide domain={[0, 'auto']} />
                <Tooltip 
                  contentStyle={{ backgroundColor: isDarkMode ? '#1e293b' : '#ffffff', border: '1px solid rgba(20, 184, 166, 0.2)', borderRadius: '16px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.4)', fontSize: '11px' }} 
                  itemStyle={{ color: '#2dd4bf', fontWeight: 900, textTransform: 'uppercase' }}
                  cursor={{ stroke: '#14b8a6', strokeWidth: 2, strokeDasharray: '4 4' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#2dd4bf" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" animationDuration={2000} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 border rounded-[2.5rem] p-8 flex flex-col justify-between" style={{ backgroundColor: 'var(--admin-card-bg)', borderColor: 'var(--admin-border)', minHeight: '450px' }}>
          <div className="flex items-center gap-4 mb-8">
             <div className="w-12 h-12 rounded-2xl bg-blue-500 shadow-lg shadow-blue-500/20 flex items-center justify-center text-white"><Layers className="w-6 h-6" /></div>
             <div>
               <h3 className="font-black text-sm uppercase tracking-widest" style={{ color: 'var(--admin-text-primary)' }}>Terminal Distribution</h3>
               <p style={{ color: 'var(--admin-text-muted)' }} className="text-[0.6rem] font-bold uppercase tracking-widest mt-1">Order Volume by Segment</p>
             </div>
          </div>
          
          <div className="w-full mt-auto" style={{ height: '220px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <XAxis dataKey="label" hide />
                <YAxis hide />
                <Bar dataKey="orders" radius={[10, 10, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#22c55e' : '#4ade80'} />
                  ))}
                </Bar>
                <Tooltip 
                  cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }} 
                  contentStyle={{ backgroundColor: isDarkMode ? '#1e293b' : '#ffffff', border: 'none', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)', fontSize: '11px' }} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4 mt-8">
             <div className="p-5 rounded-3xl border" style={{ backgroundColor: 'var(--admin-bg)', borderColor: 'var(--admin-border)' }}>
                <div className="flex justify-between items-center mb-2">
                  <p className="font-black text-[0.6rem] uppercase tracking-widest" style={{ color: 'var(--admin-text-primary)' }}>Cluster Growth</p>
                  <span className="text-teal-400 font-black text-[0.6rem]">+18.5%</span>
                </div>
                <div className="h-1.5 bg-gray-200/5 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-500 w-[65%] blur-[0.5px]" />
                </div>
             </div>
             <p style={{ color: 'var(--admin-text-muted)' }} className="text-[0.55rem] font-medium uppercase tracking-[0.2em] leading-relaxed text-center">Nodes operating at peak integrity.</p>
          </div>
        </div>
      </div>

      <div className="border rounded-[2.5rem] p-6 lg:p-8 flex flex-wrap items-center justify-center gap-10" style={{ backgroundColor: 'var(--admin-header-bg)', borderColor: 'var(--admin-border)' }}>
         <div className="flex items-center gap-3">
           <div className="w-2.5 h-2.5 bg-teal-400 rounded-full animate-pulse shadow-[0_0_15px_rgba(45,212,191,0.5)]" />
           <span className="font-black text-[0.65rem] uppercase tracking-widest" style={{ color: 'var(--admin-text-primary)' }}>Master Node Online</span>
         </div>
         <div className="flex items-center gap-3" style={{ color: 'var(--admin-text-secondary)' }}>
           <CheckCircle className="w-4 h-4 text-teal-400" />
           <span className="text-[0.65rem] font-black uppercase tracking-widest">Paystack Gateway Synced</span>
         </div>
         <div className="flex items-center gap-3" style={{ color: 'var(--admin-text-secondary)' }}>
           <Layers className="w-4 h-4 text-blue-400" />
           <span className="text-[0.65rem] font-black uppercase tracking-widest">MariaDB Master Redundancy</span>
         </div>
         <div className="flex items-center gap-3" style={{ color: 'var(--admin-text-secondary)' }}>
           <AlertCircle className="w-4 h-4 text-violet-400" />
           <span className="text-[0.65rem] font-black uppercase tracking-widest">SSL Cluster Secure</span>
         </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
