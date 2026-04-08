import React, { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { TrendingUp, ShoppingCart, Clock, Wallet, ArrowRight, Zap, Star, RefreshCw, Package, ArrowUpRight, ShieldCheck, Gift } from 'lucide-react';
import { userService } from '../services/api';

const DashboardHome = () => {
  const navigate = useNavigate();
  const context = useOutletContext() || {};
  const user = context.user || {};
  
  const [animateCards, setAnimateCards] = useState(false);
  const [stats, setStats] = useState({
    totalOrders: 0,
    completedOrders: 0,
    activeOrders: 0,
    totalSpent: 0,
    referralEarnings: 0
  });

  const [activityLogs, setActivityLogs] = useState([]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await userService.getStats();
        setStats(res.data || {});
        
        try {
          const [ordersRes, txRes] = await Promise.all([
            userService.getOrders(),
            userService.getTransactions()
          ]);
          
          const orders = (ordersRes.data || []).map(o => ({
            type: 'order',
            status: o.status,
            text: `Order #${o.id} initiated`,
            time: new Date(o.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            date: new Date(o.created_at)
          }));
          
          const txs = (txRes.data || []).map(t => ({
            type: 'wallet',
            status: t.status,
            text: `Funded ₦${Number(t.amount).toLocaleString()}`,
            time: new Date(t.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            date: new Date(t.created_at)
          }));
          
          const combined = [...orders, ...txs].sort((a, b) => b.date - a.date).slice(0, 5);
          setActivityLogs(combined.length > 0 ? combined : [{ type: 'wallet', status: 'completed', text: 'System Online', time: 'Now', date: new Date() }]);
        } catch (e) {
          console.error('Activity logs error', e);
        }
      } catch (err) {
        console.error('Stats error', err);
      }
    };
    fetchStats();
    setTimeout(() => setAnimateCards(true), 100);
  }, []);

  const statCards = [
    { label: 'Wallet', value: `₦${Number(user.wallet_balance || 0).toLocaleString()}`, sub: 'Available', icon: <Wallet size={24}/>, color: 'from-emerald-500 to-teal-500', path: '/dashboard/add-funds' },
    { label: 'Orders', value: (stats.totalOrders || 0).toLocaleString(), sub: 'Total Operations', icon: <ShoppingCart size={24}/>, color: 'from-violet-600 to-purple-600', path: '/dashboard/orders' },
    { label: 'Active', value: (stats.pendingOrders || 0).toLocaleString(), sub: 'In Progress', icon: <RefreshCw size={24}/>, color: 'from-amber-500 to-orange-500', path: '/dashboard/orders' },
    { label: 'Spent', value: `₦${Number(stats.totalSpent || 0).toLocaleString()}`, sub: 'Lifetime', icon: <TrendingUp size={24}/>, color: 'from-rose-600 to-pink-600', path: '/dashboard/analytics' },
  ];

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row justify-between gap-6">
         <div className="space-y-1">
            <h1 className="text-4xl font-black text-navy tracking-tight lowercase first-letter:uppercase">
              {getGreeting()}, <span className="text-teal-500">{user.name?.split(' ')[0] || 'User'}</span>
            </h1>
            <p className="text-sm font-medium text-slate-400">Welcome to your social management command center.</p>
         </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, i) => (
          <div key={card.label} className={`bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm transition-all duration-700 hover:shadow-xl hover:translate-y-[-4px] group relative overflow-hidden ${animateCards ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: `${i * 100}ms` }}>
            <div className={`w-14 h-14 bg-gradient-to-br ${card.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg`}>{card.icon}</div>
            <p className="text-[0.6rem] font-black text-slate-400 uppercase tracking-widest">{card.label}</p>
            <h3 className="text-2xl font-black text-navy mt-1">{card.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-navy p-10 md:p-14 rounded-[3rem] text-white relative overflow-hidden group">
           <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">Ready to scale <br/>your <span className="text-teal-400 italic">audience?</span></h2>
           <button onClick={() => navigate('/dashboard/new-order')} className="mt-8 px-10 py-5 bg-teal-500 text-white font-black rounded-2xl hover:bg-teal-400 transition-all flex items-center gap-3">Initialize Growth <ArrowRight size={20}/></button>
        </div>
        <div className="lg:col-span-1 bg-white p-8 rounded-[2.5rem] border border-slate-100 flex flex-col justify-between">
           <div>
              <h3 className="font-bold text-navy text-lg">Growth Tools</h3>
              <p className="text-xs text-slate-400 mt-1">Direct access to elite services</p>
           </div>
           <button onClick={() => navigate('/dashboard/new-order')} className="w-full mt-6 py-4 bg-slate-50 text-navy font-black text-[0.6rem] uppercase tracking-widest rounded-2xl hover:bg-slate-100 transition-all">New Deployment</button>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 md:p-10 shadow-sm">
         <h2 className="font-black text-navy text-2xl mb-8">Activity Stream</h2>
         <div className="space-y-4">
            {activityLogs.map((act, i) => (
              <div key={i} className="flex gap-5 items-center p-4 rounded-2xl hover:bg-slate-50 transition-all">
                 <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${act.type === 'order' ? 'bg-blue-600' : 'bg-teal-500'} text-white`}>{act.type === 'order' ? <Package size={18}/> : <Wallet size={18}/>}</div>
                 <div className="flex-1">
                    <div className="flex justify-between">
                       <p className="text-sm font-black text-navy">{act.text}</p>
                       <span className="text-[0.6rem] font-bold text-slate-300 uppercase">{act.time}</span>
                    </div>
                    <span className={`text-[0.5rem] font-black uppercase px-2 py-0.5 rounded ${act.status === 'completed' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>{act.status}</span>
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default DashboardHome;
