import React, { useState } from 'react';
import { 
  BarChart3, TrendingUp, Users, ShoppingBag, 
  ArrowUpRight, ArrowDownRight, Calendar, 
  Download, Filter, RefreshCcw, PieChart, Activity
} from 'lucide-react';

// Reusable Chart Placeholder / Mock
const ChartContainer = ({ title, subtitle, children, icon: Icon }) => (
  <div className="bg-[#0d1526] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all group">
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400">
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-white font-black text-sm uppercase tracking-widest">{title}</h3>
          <p className="text-white/30 text-[0.6rem] font-bold uppercase mt-1">{subtitle}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="p-2 bg-white/5 rounded-lg text-white/40 hover:text-white transition-colors">
          <Download className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
    {children}
  </div>
);

const SimpleLineChart = ({ data, color = '#14b8a6', height = 160 }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 400; // Relative width for SVG path
  const h = height;
  
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x},${y}`;
  }).join(' ');

  const areaPoints = `0,${h} ${points} ${w},${h}`;

  return (
    <div className="relative w-full overflow-hidden" style={{ height }}>
      <svg className="w-full h-full" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id={`gradient-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPoints} fill={`url(#gradient-${color.replace('#','')})`} />
        <polyline points={points} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {/* Grid Lines Overlay (Mock) */}
      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-5">
        {[...Array(5)].map((_, i) => <div key={i} className="w-full border-t border-white" />)}
      </div>
    </div>
  );
};

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('30d');

  const performanceMetrics = [
    { label: 'Growth Rate', value: '24.8%', icon: TrendingUp, color: 'text-teal-400', positive: true },
    { label: 'Churn Rate', value: '2.1%', icon: Activity, color: 'text-red-400', positive: false },
    { label: 'Avg Order Value', value: '₦1,240', icon: ShoppingBag, color: 'text-blue-400', positive: true },
    { label: 'New Customers', value: '+412', icon: Users, color: 'text-violet-400', positive: true },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tight">Business Intelligence</h1>
          <p className="text-white/30 text-sm font-medium mt-1">Deep dive into platform performance metrics</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
            {['7d', '30d', '90d', 'Year'].map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg text-[0.6rem] font-black uppercase tracking-widest transition-all
                  ${timeRange === range ? 'bg-teal-500 text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
              >
                {range}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-5 py-3 bg-teal-500 hover:bg-teal-400 text-white rounded-xl text-[0.6rem] font-black uppercase tracking-widest transition-all shadow-lg shadow-teal-500/20">
            <RefreshCcw className="w-3.5 h-3.5" /> Sync Data
          </button>
        </div>
      </div>

      {/* High Level Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((m, i) => (
          <div key={i} className="bg-[#0d1526] border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full pointer-events-none" />
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg bg-white/5 ${m.color}`}>
                <m.icon className="w-4 h-4" />
              </div>
              <div className={`flex items-center gap-1 text-[0.6rem] font-bold ${m.positive ? 'text-teal-400' : 'text-red-400'}`}>
                {m.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {m.positive ? '+5.2%' : '-1.4%'}
              </div>
            </div>
            <p className="text-white font-black text-2xl tracking-tight">{m.value}</p>
            <p className="text-white/30 text-[0.6rem] font-black uppercase tracking-widest mt-1">{m.label}</p>
          </div>
        ))}
      </div>

      {/* Main Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <ChartContainer title="Revenue Growth" subtitle="Daily revenue trends over time" icon={TrendingUp}>
          <SimpleLineChart data={[30, 45, 38, 62, 55, 80, 75, 90, 85, 105, 98, 120]} color="#14b8a6" />
          <div className="flex justify-between mt-6 px-1">
            {['Week 1', 'Week 2', 'Week 3', 'Week 4'].map(w => (
              <span key={w} className="text-white/20 text-[0.5rem] font-black uppercase">{w}</span>
            ))}
          </div>
        </ChartContainer>

        <ChartContainer title="Order Volume" subtitle="Total orders processed per day" icon={ShoppingBag}>
          <SimpleLineChart data={[120, 150, 140, 180, 170, 210, 190, 240, 220, 260, 250, 290]} color="#3b82f6" />
          <div className="flex justify-between mt-6 px-1">
            {['Week 1', 'Week 2', 'Week 3', 'Week 4'].map(w => (
              <span key={w} className="text-white/20 text-[0.5rem] font-black uppercase">{w}</span>
            ))}
          </div>
        </ChartContainer>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* User Engagement */}
        <div className="lg:col-span-2 bg-[#0d1526] border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-white font-black text-sm uppercase tracking-widest">Platform Distribution</h3>
            <span className="text-white/20 text-[0.6rem] font-bold">Top 5 Platforms</span>
          </div>
          <div className="space-y-6">
            {[
              { name: 'Instagram', val: 78, color: 'bg-teal-500' },
              { name: 'TikTok', val: 62, color: 'bg-blue-500' },
              { name: 'Facebook', val: 45, color: 'bg-indigo-500' },
              { name: 'YouTube', val: 38, color: 'bg-red-500' },
              { name: 'Twitter (X)', val: 24, color: 'bg-white' },
            ].map(p => (
              <div key={p.name} className="space-y-2">
                <div className="flex justify-between items-center text-[0.65rem] font-black uppercase tracking-wider">
                  <span className="text-white/80">{p.name}</span>
                  <span className="text-white">{p.val}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-1000 ${p.color}`} style={{ width: `${p.val}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-[#0d1526] border border-white/5 rounded-2xl p-6">
          <h3 className="text-white font-black text-sm uppercase tracking-widest mb-8">Traffic Sources</h3>
          <div className="flex flex-col items-center justify-center h-48 relative">
            {/* Mock Donut Chart */}
            <div className="w-32 h-32 rounded-full border-8 border-teal-500/20 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full border-8 border-teal-500 border-t-transparent animate-[spin_3s_linear_infinite]" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-white font-black text-xl">84%</span>
              <span className="text-white/20 text-[0.5rem] font-bold uppercase">Organic</span>
            </div>
          </div>
          <div className="mt-8 space-y-3">
            {[
              { label: 'Direct', val: '42%' },
              { label: 'Referral', val: '31%' },
              { label: 'Search', val: '18%' },
              { label: 'Social', val: '9%' },
            ].map(s => (
              <div key={s.label} className="flex justify-between items-center bg-white/2 p-3 rounded-xl">
                <span className="text-white/40 text-[0.6rem] font-black uppercase tracking-widest">{s.label}</span>
                <span className="text-teal-400 text-xs font-black">{s.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
