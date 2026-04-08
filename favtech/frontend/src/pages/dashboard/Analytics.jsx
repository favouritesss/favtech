import React, { useState, useEffect } from 'react';
import { TrendingUp, PieChart, BarChart3, Clock, Package, Wallet, ArrowRight, Zap, Target } from 'lucide-react';
import { userService } from '../../services/api';

const Analytics = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    completedOrders: 0,
    activeOrders: 0,
    totalSpent: 0,
    referralEarnings: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await userService.getStats();
        setStats(res.data);
      } catch (err) {
        console.error('Stats fetch failed');
      }
    };
    fetchStats();
  }, []);

  const metrics = [
    { label: 'Order Success Rate', value: stats.totalOrders > 0 ? `${Math.round((stats.completedOrders / stats.totalOrders) * 100)}%` : '0%', icon: <Target className="w-5 h-5" />, color: 'bg-green-50 text-green-500' },
    { label: 'Avg Order Value', value: stats.totalOrders > 0 ? `₦${Math.round(stats.totalSpent / stats.totalOrders).toLocaleString()}` : '₦0', icon: <Wallet className="w-5 h-5" />, color: 'bg-blue-50 text-blue-500' },
    { label: 'Growth Index', value: '+12.4%', icon: <TrendingUp className="w-5 h-5" />, color: 'bg-teal-50 text-teal-500' },
  ];

  const mostUsed = [
    { service: 'Instagram Followers', count: 124, trend: 15, color: 'bg-pink-500' },
    { service: 'TikTok Likes', count: 86, trend: 8, color: 'bg-black' },
    { service: 'Facebook Page Likes', count: 42, trend: -5, color: 'bg-blue-600' },
  ];

  return (
    <div className="space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-navy uppercase tracking-tight">Performance Analytics</h1>
          <p className="text-sm text-slate-400 font-medium">Deep dive into your investment and growth metrics.</p>
        </div>
        <div className="px-4 py-2 bg-white border border-slate-100 rounded-xl flex items-center gap-2 shadow-sm">
           <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
           <span className="text-[0.6rem] font-black text-navy uppercase tracking-widest">Real-time Stream</span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {metrics.map(m => (
          <div key={m.label} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm group hover:border-teal-500 transition-all">
             <div className={`w-12 h-12 ${m.color} rounded-2xl flex items-center justify-center mb-6 shadow-sm`}>
                {m.icon}
             </div>
             <p className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest mb-1">{m.label}</p>
             <h3 className="text-3xl font-black text-navy tracking-tighter">{m.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
         {/* Spending Trend Visualization (MOCK) */}
         <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
               <h2 className="font-black text-navy text-sm uppercase tracking-widest">Spending Trend</h2>
               <select className="bg-slate-50 border border-slate-100 rounded-xl px-3 py-1.5 text-[0.6rem] font-black uppercase text-slate-400 outline-none">
                  <option>Last 30 Days</option>
                  <option>Yearly</option>
               </select>
            </div>
            
            <div className="h-64 flex items-end gap-2 pb-1 bg-slate-50/50 rounded-3xl p-6 border border-slate-50">
               {[40, 70, 45, 90, 65, 80, 50, 100, 75, 60, 85, 95].map((h, i) => (
                 <div key={i} className="flex-1 group relative">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-navy text-white text-[0.5rem] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all">
                       ₦{h*100}
                    </div>
                    <div style={{ height: `${h}%` }} className={`w-full rounded-t-lg transition-all cursor-pointer ${h > 80 ? 'bg-teal-500' : 'bg-slate-200 group-hover:bg-navy'}`} />
                 </div>
               ))}
            </div>

            <div className="flex justify-between px-2">
               {['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'].map(m => (
                 <span key={m} className="text-[0.5rem] font-black text-slate-300 uppercase tracking-widest">{m}</span>
               ))}
            </div>
         </div>

         {/* Most Used Services */}
         <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
            <h2 className="font-black text-navy text-sm uppercase tracking-widest">Usage Distribution</h2>
            <div className="space-y-6">
               {mostUsed.map(s => (
                 <div key={s.service} className="space-y-2">
                    <div className="flex justify-between items-center px-1">
                       <span className="text-xs font-bold text-navy uppercase">{s.service}</span>
                       <span className="text-[0.6rem] font-black text-teal-600">+{s.trend}% WEEKLY</span>
                    </div>
                    <div className="h-3 bg-slate-50 rounded-full overflow-hidden">
                       <div className={`h-full ${s.color} rounded-full`} style={{ width: `${s.count/1.5}%` }} />
                    </div>
                 </div>
               ))}
            </div>

            <div className="p-6 bg-navy rounded-3xl text-white relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-1000" />
               <div className="flex items-center gap-4 relative z-10">
                  <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/20">
                     <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest">Growth Engine Active</h4>
                    <p className="text-[0.6rem] text-white/40 font-bold uppercase">Your 30-day conversion rate is above average.</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Analytics;
