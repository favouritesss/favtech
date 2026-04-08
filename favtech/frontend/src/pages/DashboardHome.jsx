import React, { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { TrendingUp, ShoppingCart, Clock, Wallet, ArrowRight, Zap, Star, RefreshCw, Package, ArrowUpRight, ShieldCheck, Gift } from 'lucide-react';
import { userService } from '../services/api';

const DashboardHome = () => {
  const navigate = useNavigate();
  const { user = {} } = useOutletContext() || {};
  const [animateCards, setAnimateCards] = useState(false);
  const [stats, setStats] = useState({
    totalOrders: 0,
    completedOrders: 0,
    activeOrders: 0,
    totalSpent: 0,
    referralEarnings: 0
  });

  const [activityLogs, setActivityLogs] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await userService.getStats();
        setStats(res.data);
        
        try {
          const [ordersRes, txRes] = await Promise.all([
            userService.getOrders(),
            userService.getTransactions()
          ]);
          
          const orders = (ordersRes.data || []).map(o => ({
            type: 'order',
            status: o.status,
            text: `Order #${o.id} initiated for Service #${o.service_id}`,
            time: new Date(o.created_at).toLocaleString(),
            date: new Date(o.created_at)
          }));
          
          const txs = (txRes.data || []).map(t => ({
            type: 'wallet',
            status: t.status,
            text: `Wallet ${t.type} of ₦${t.amount.toLocaleString()}`,
            time: new Date(t.created_at).toLocaleString(),
            date: new Date(t.created_at)
          }));
          
          const combined = [...orders, ...txs].sort((a, b) => b.date - a.date).slice(0, 5);
          if (combined.length > 0) {
            setActivityLogs(combined);
          } else {
            setActivityLogs([
              { type: 'wallet', status: 'completed', text: 'Welcome to FavTech operational command', time: 'Just now', date: new Date() }
            ]);
          }
        } catch (e) {
          console.error('Logs fetch failed', e);
        }
      } catch (err) {
        console.error('Stats fetch failed');
      }
    };
    fetchStats();
    setTimeout(() => setAnimateCards(true), 100);
  }, []);

  const statCards = [
    {
      label: 'Wallet Capital',
      value: `₦${Number(user.wallet_balance || 0).toLocaleString()}`,
      sub: 'Digital Assets',
      icon: <Wallet className="w-6 h-6" />,
      color: 'from-emerald-500 to-teal-500',
      action: { label: 'Top Up', path: '/dashboard/add-funds' }
    },
    {
      label: 'Operation Count',
      value: (stats.totalOrders || 0).toLocaleString(),
      sub: 'Lifecycle Total',
      icon: <ShoppingCart className="w-6 h-6" />,
      color: 'from-violet-600 to-purple-600',
      action: { label: 'Audit', path: '/dashboard/orders' }
    },
    {
      label: 'Active Flows',
      value: (stats.pendingOrders || 0).toLocaleString(),
      sub: 'Synching Threads',
      icon: <RefreshCw className="w-6 h-6" />,
      color: 'from-amber-500 to-orange-500',
      action: { label: 'Monitor', path: '/dashboard/orders' }
    },
    {
      label: 'Capital Invested',
      value: `₦${Number(stats.totalSpent || 0).toLocaleString()}`,
      sub: 'All-time Scaling',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-rose-600 to-pink-600',
      action: { label: 'Insights', path: '/dashboard/analytics' }
    },
  ];



  const quickPlatforms = [
    { name: 'Instagram', color: '#E1306C', icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> },
    { name: 'TikTok', color: '#000000', icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.12-3.44-3.17-3.8-5.46-.4-2.51.56-5.23 2.67-6.78 1.27-.93 2.87-1.43 4.45-1.42.02 0 .04.01.06.01v4.06c-1.1-.06-2.22.25-3.04.9A3.333 3.333 0 005.12 18.5c.34 1.53 1.83 2.62 3.37 2.65 1.5.02 2.88-.93 3.35-2.36.19-.57.3-1.17.3-1.78.01-4.1-.01-8.2.02-12.3.01-1.56-.02-3.13.01-4.69z"/></svg> },
    { name: 'YouTube', color: '#FF0000', icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
    { name: 'Facebook', color: '#1877F2', icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
  ];

  return (
    <div className="space-y-10 pb-20 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
         <div className="space-y-2">
            <h1 className="text-3xl font-black text-navy tracking-tight">Overview</h1>
            <p className="text-sm font-medium text-slate-500 relative bg-white pl-4 border-l-4 border-teal-500 py-1">
              Welcome back, <span className="font-bold text-navy">{user.name}</span>
            </p>
         </div>
         <div className="flex items-center gap-4">
            <button onClick={() => navigate('/dashboard/referrals')} className="flex items-center gap-3 px-6 py-3 bg-white border border-slate-100 rounded-2xl shadow-[0_5px_15px_-5px_rgba(0,0,0,0.05)] hover:shadow-lg hover:-translate-y-0.5 transition-all">
               <Gift className="w-5 h-5 text-teal-500" />
               <span className="text-[0.65rem] font-black uppercase text-navy tracking-widest">Refer & Earn</span>
            </button>
         </div>
      </div>

      {/* Primary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, i) => (
          <div
            key={card.label}
            className={`
              bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm transition-all duration-700 hover:shadow-xl hover:border-teal-500/20 group
              ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className={`w-12 h-12 bg-gradient-to-br ${card.color} rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110 duration-500`}>
                {card.icon}
              </div>
              <button 
                onClick={() => navigate(card.action.path)}
                className="w-8 h-8 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-navy hover:text-white transition-all shadow-inner"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div>
              <p className="text-[0.65rem] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{card.label}</p>
              <h3 className="text-2xl font-black text-navy tracking-tighter">{card.value}</h3>
              <p className="text-[0.6rem] font-bold text-slate-300 uppercase tracking-widest mt-1 opacity-0 group-hover:opacity-100 transition-opacity">{card.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid: Quick Order and Balance */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Deep Dive Action */}
        <div className="lg:col-span-2 bg-[#0f172a] p-10 py-12 rounded-[2.5rem] text-white overflow-hidden relative group shadow-2xl shadow-navy/10">
           <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/20 blur-[100px] rounded-full translate-x-10 translate-y-[-100px] pointer-events-none" />
           <div className="absolute bottom-0 left-0 w-80 h-80 bg-navy blur-[100px] rounded-full translate-x-[-100px] pointer-events-none" />
           
           <div className="relative z-10 flex flex-col h-full justify-between gap-10">
              <div className="space-y-5">
                 <div className="flex items-start flex-col gap-2">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">Boost your social <br/>presence <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">instantly.</span></h2>
                 </div>
                 <p className="text-base text-white/70 leading-relaxed font-medium max-w-[500px]">
                   Access our premium catalog of high-quality, instant-start social media services. Gain followers, views, and engagements seamlessly.
                 </p>
              </div>

              <div className="flex flex-wrap gap-4 items-center mt-4">
                 <button onClick={() => navigate('/dashboard/new-order')} className="px-8 py-4 bg-teal-500 text-white font-black text-sm rounded-2xl hover:bg-teal-400 hover:shadow-[0_0_40px_rgba(20,184,166,0.3)] transition-all flex items-center gap-3">
                    Place New Order <ArrowRight className="w-5 h-5" />
                 </button>
                 <div className="flex items-center gap-3 px-4 py-2 border border-white/10 rounded-xl bg-white/5 backdrop-blur-md">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_10px_#34d399]" />
                    <span className="text-xs font-bold text-white/80">Services Online</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Quick Connect Platforms */}
        <div className="lg:col-span-1 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col justify-between">
           <div className="mb-6">
              <h3 className="font-bold text-navy text-lg tracking-tight">Quick Services</h3>
              <p className="text-xs text-slate-400 font-medium mt-1">Jump directly to a platform</p>
           </div>
           
           <div className="grid grid-cols-2 gap-3 mb-6">
              {quickPlatforms.map(p => (
                <button 
                  key={p.name}
                  onClick={() => navigate('/dashboard/new-order')}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-teal-500/30 hover:bg-white hover:shadow-lg transition-all text-center group flex flex-col items-center justify-center gap-3"
                >
                  <div className="text-slate-700 group-hover:scale-110 group-hover:text-teal-500 transition-all duration-300">
                     {p.icon}
                  </div>
                  <p className="text-[0.65rem] font-bold text-slate-500 group-hover:text-navy transition-colors">{p.name}</p>
                </button>
              ))}
           </div>

           <button onClick={() => navigate('/dashboard/analytics')} className="w-full py-4 text-navy font-black text-[0.6rem] uppercase tracking-widest border-2 border-dashed border-slate-100 rounded-2xl hover:bg-slate-50 transition-all">
              View Growth Metrics
           </button>
        </div>
      </div>

      {/* Activity Monitor */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 md:p-10 relative">
         <div className="flex items-center justify-between mb-8 border-b border-slate-50 pb-6">
            <h2 className="font-bold text-navy text-lg tracking-tight">Recent Activity</h2>
            <button onClick={() => navigate('/dashboard/orders')} className="text-[0.7rem] font-bold text-teal-600 hover:text-teal-400 transition-colors uppercase tracking-widest">View All</button>
         </div>

         <div className="space-y-8">
            {activityLogs.map((act, i) => (
              <div key={i} className="flex gap-6 items-start group relative">
                 {i !== activityLogs.length - 1 && (
                   <div className="absolute left-[1.1rem] top-10 bottom-0 w-[2px] bg-slate-50 group-hover:bg-teal-100 transition-colors" />
                 )}
                 <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all z-10
                    ${act.type === 'order' ? 'bg-blue-50 text-blue-500 border border-blue-100' : 'bg-teal-50 text-teal-500 border border-teal-100'}`}>
                    {act.type === 'order' ? <Package className="w-4 h-4" /> : <Wallet className="w-4 h-4" />}
                 </div>
                 <div className="flex-1 pb-2">
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-xs font-black text-navy uppercase tracking-tight">{act.text}</p>
                      <span className="text-[0.6rem] font-bold text-slate-500 uppercase tracking-widest">{act.time}</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <span className={`px-2 py-0.5 rounded-lg text-[0.5rem] font-black uppercase tracking-widest
                          ${act.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700 animate-pulse'}`}>
                          {act.status}
                       </span>
                       <span className="text-[0.55rem] font-black text-slate-400 uppercase tracking-widest">Thread: #{Math.floor(Math.random()*90000+10000)}</span>
                    </div>
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default DashboardHome;
