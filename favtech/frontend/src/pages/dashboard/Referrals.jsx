import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Copy, Users, TrendingUp, Gift, Award, Share2, Check } from 'lucide-react';

const Referrals = () => {
  const { user = {} } = useOutletContext() || {};
  const [copied, setCopied] = useState(false);
  const referralLink = `https://favtech.smm/register?ref=${user.id || '123'}`;

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const leaderboard = [
    { rank: 1, name: 'Favour O.', earnings: '₦125,400', referrals: 412 },
    { rank: 2, name: 'Samson K.', earnings: '₦98,200', referrals: 308 },
    { rank: 3, name: 'Aishat M.', earnings: '₦72,000', referrals: 245 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-navy uppercase tracking-tight">Referral Program</h1>
          <p className="text-sm text-slate-400 font-medium">Earn 5% lifelong commission from every referral.</p>
        </div>
        <div className="hidden sm:flex items-center gap-3 p-3 bg-teal-50 rounded-2xl border border-teal-100">
          <Gift className="w-5 h-5 text-teal-600" />
          <p className="text-xs font-black text-teal-700 uppercase tracking-widest">Share the Love</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Referral Stats */}
        {[
          { label: 'Total Referrals', value: '0', icon: <Users className="w-5 h-5" />, color: 'bg-blue-50 text-blue-500' },
          { label: 'Total Earnings', value: '₦0.00', icon: <TrendingUp className="w-5 h-5" />, color: 'bg-teal-50 text-teal-500' },
          { label: 'Bonus Milestone', value: '0/10', icon: <Gift className="w-5 h-5" />, color: 'bg-amber-50 text-amber-500' },
        ].map(stat => (
          <div key={stat.label} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
              {stat.icon}
            </div>
            <p className="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-2xl font-black text-navy uppercase tracking-tight">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Link Share */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#0f172a] to-navy p-8 rounded-[2.5rem] text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(20,184,166,0.15),transparent_60%)]" />
            <div className="relative z-10">
              <h3 className="font-black text-lg uppercase tracking-widest mb-2 flex items-center gap-2">
                <Share2 className="w-5 h-5 text-teal-400" /> Your Magic Link
              </h3>
              <p className="text-sm text-white/40 font-medium mb-6">Send this link to friends and colleagues to start earning commissions.</p>
              
              <div className="relative">
                <input 
                  readOnly 
                  value={referralLink}
                  className="w-full bg-white/5 border border-white/10 p-5 pr-16 rounded-2xl text-xs font-bold text-teal-400 outline-none backdrop-blur-md"
                />
                <button 
                  onClick={copyLink}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-teal-500 rounded-xl hover:bg-teal-400 transition-all shadow-lg"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          <div className="p-8 border-2 border-dashed border-slate-100 rounded-[2.5rem] bg-slate-50/30">
            <h4 className="font-black text-navy text-xs uppercase tracking-widest mb-4">How it works</h4>
            <div className="space-y-4">
              {[
                { step: '01', text: 'Share your link everywhere' },
                { step: '02', text: 'They register and fund account' },
                { step: '03', text: 'You get 5% on every deposit' },
              ].map(s => (
                <div key={s.step} className="flex items-center gap-3">
                  <span className="text-xs font-black text-teal-500 font-mono tracking-widest">{s.step}</span>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
           <div className="flex items-center justify-between mb-8">
              <h3 className="font-black text-navy text-sm uppercase tracking-widest flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" /> Leaderboard
              </h3>
              <span className="text-[0.6rem] font-bold text-slate-300 uppercase tracking-widest">Monthly Rank</span>
           </div>
           
           <div className="space-y-4">
              {leaderboard.map(u => (
                <div key={u.rank} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl hover:bg-teal-50 transition-all group">
                   <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs
                        ${u.rank === 1 ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-400 group-hover:bg-teal-100 group-hover:text-teal-600'}`}>
                        {u.rank}
                      </div>
                      <div>
                        <p className="font-black text-navy text-sm uppercase">{u.name}</p>
                        <p className="text-[0.6rem] text-slate-400 font-bold uppercase">{u.referrals} Referrals</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="font-black text-teal-600 text-sm tracking-tight">{u.earnings}</p>
                   </div>
                </div>
              ))}
           </div>

           <div className="mt-8 p-6 bg-navy rounded-3xl text-white text-center">
              <p className="text-[0.5rem] font-black uppercase tracking-widest text-teal-400 mb-2">Your Current Rank</p>
              <h4 className="font-black text-lg uppercase">Not Ranked Yet</h4>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Referrals;
