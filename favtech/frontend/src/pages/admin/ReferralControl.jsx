import React, { useState } from 'react';
import { 
  Gift, Users, TrendingUp, CreditCard, 
  Settings, Save, RefreshCw, ArrowUp, 
  ArrowDown, ChevronRight, UserPlus, DollarSign
} from 'lucide-react';

const ReferralControl = () => {
  const [config, setConfig] = useState({
    enabled: true,
    percentage: 5.0,
    minPayout: 5000,
    bonusType: 'percentage', // percentage or fixed
    autoApprove: false,
  });

  const referralStats = [
    { label: 'Total Referrals', value: '1,420', icon: Users, color: 'text-blue-400' },
    { label: 'Total Paid Out', value: '₦450,000', icon: DollarSign, color: 'text-teal-400' },
    { label: 'Pending Payouts', value: '₦12,500', icon: CreditCard, color: 'text-amber-400' },
    { label: 'Avg Conv. Rate', value: '14.2%', icon: TrendingUp, color: 'text-violet-400' },
  ];

  const recentReferrals = [
    { referrer: 'king_favour', referee: 'new_user_88', bonus: '₦450.00', date: '2h ago', status: 'Approved' },
    { referrer: 'mary_k', referee: 'biz_acct_4', bonus: '₦120.50', date: '5h ago', status: 'Pending' },
    { referrer: 'john_d', referee: 'creator_x', bonus: '₦50.00', date: '12h ago', status: 'Approved' },
    { referrer: 'biz_acct', referee: 'startup_ceo', bonus: '₦2,400.00', date: '1d ago', status: 'Approved' },
    { referrer: 'favour_o', referee: 'ig_agency', bonus: '₦880.00', date: '2d ago', status: 'Approved' },
  ];

  const handleConfigChange = (e) => {
    const { name, value, type, checked } = e.target;
    setConfig(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tight">Referral Management</h1>
          <p className="text-white/30 text-sm font-medium mt-1">Configure user incentive programs and track payouts</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-400 text-white rounded-xl text-[0.6rem] font-black uppercase tracking-widest transition-all shadow-lg shadow-teal-500/20">
            <Save className="w-4 h-4" /> Save Settings
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {referralStats.map((s, i) => (
          <div key={i} className="bg-[#0d1526] border border-white/5 rounded-2xl p-6 group">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg bg-white/5 ${s.color}`}>
                <s.icon className="w-4 h-4" />
              </div>
              <p className="text-white/30 text-[0.6rem] font-black uppercase tracking-widest">{s.label}</p>
            </div>
            <p className="text-white font-black text-2xl tracking-tight">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Settings Panel */}
        <div className="bg-[#0d1526] border border-white/5 rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-400">
              <Settings className="w-5 h-5" />
            </div>
            <h3 className="text-white font-black text-sm uppercase tracking-widest">Incentive Settings</h3>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-white/2 rounded-2xl border border-white/5">
              <div>
                <p className="text-white text-xs font-black uppercase tracking-widest">Referral Program</p>
                <p className="text-white/30 text-[0.6rem] mt-1 font-medium">Allow users to earn by referring others</p>
              </div>
              <button 
                onClick={() => setConfig(prev => ({ ...prev, enabled: !prev.enabled }))}
                className={`w-12 h-6 rounded-full transition-all relative ${config.enabled ? 'bg-teal-500' : 'bg-white/10'}`}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${config.enabled ? 'left-7' : 'left-1'}`} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-white/30 text-[0.6rem] font-black uppercase tracking-widest ml-1">Commission Type</label>
                <select 
                  name="bonusType"
                  value={config.bonusType}
                  onChange={handleConfigChange}
                  className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-4 text-white text-[0.7rem] font-black uppercase tracking-widest focus:border-teal-500/50 outline-none transition-all"
                >
                  <option value="percentage">PERCENTAGE (%)</option>
                  <option value="fixed">FIXED AMOUNT</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-white/30 text-[0.6rem] font-black uppercase tracking-widest ml-1">Commission Val</label>
                <input 
                  type="number"
                  name="percentage"
                  value={config.percentage}
                  onChange={handleConfigChange}
                  className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-4 text-white text-[0.7rem] font-black uppercase tracking-widest focus:border-teal-500/50 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-white/30 text-[0.6rem] font-black uppercase tracking-widest ml-1">Minimum Payout (₦)</label>
              <input 
                type="number"
                name="minPayout"
                value={config.minPayout}
                onChange={handleConfigChange}
                className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-4 text-white text-[0.7rem] font-black uppercase tracking-widest focus:border-teal-500/50 outline-none transition-all"
              />
            </div>

            <div className="flex items-center gap-3 p-4 bg-amber-500/5 border border-amber-500/10 rounded-2xl">
              <RefreshCw className="w-5 h-5 text-amber-500 flex-shrink-0 animate-spin-slow" />
              <p className="text-amber-500/80 text-[0.6rem] font-bold leading-relaxed uppercase tracking-widest">
                Changes will take effect for new referrals instantly. Existing payouts are not affected.
              </p>
            </div>
          </div>
        </div>

        {/* Recent Referrals */}
        <div className="bg-[#0d1526] border border-white/5 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                <UserPlus className="w-5 h-5" />
              </div>
              <h3 className="text-white font-black text-sm uppercase tracking-widest">Recent Activity</h3>
            </div>
            <button className="text-white/20 hover:text-white text-[0.6rem] font-black uppercase tracking-widest">View History</button>
          </div>

          <div className="space-y-4">
            {recentReferrals.map((r, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white/2 rounded-2xl border border-white/5 group hover:border-teal-500/20 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500/20 to-blue-500/20 flex items-center justify-center text-white/40 font-black text-[0.6rem] uppercase tracking-tighter">
                    {r.referrer.slice(0, 2)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                       <span className="text-white text-xs font-black tracking-tight">{r.referrer}</span>
                       <ChevronRight className="w-3 h-3 text-white/20" />
                       <span className="text-white/40 text-[0.65rem] font-bold">{r.referee}</span>
                    </div>
                    <p className="text-white/20 text-[0.55rem] font-black uppercase tracking-widest mt-1">Earnings: <span className="text-teal-400">{r.bonus}</span> • {r.date}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-lg text-[0.5rem] font-black uppercase tracking-widest ${r.status === 'Approved' ? 'bg-teal-500/10 text-teal-400' : 'bg-amber-500/10 text-amber-400'}`}>
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralControl;
