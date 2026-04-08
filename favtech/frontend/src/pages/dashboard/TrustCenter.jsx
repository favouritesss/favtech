import React, { useState } from 'react';
import { BadgeCheck, ShieldCheck, Smartphone, Download, UserCheck, Shield, ChevronRight, Zap, Target } from 'lucide-react';

const TrustCenter = () => {
  const [activeTab, setActiveTab] = useState('verification');
  const [level, setLevel] = useState(2); // Tier 2 user

  const levels = [
    { rank: 1, name: 'Guest', desc: 'Limited orders, manual review.', icon: <Shield className="w-5 h-5 text-slate-400" /> },
    { rank: 2, name: 'Standard Member', desc: 'Instant fulfillment, API access.', icon: <ShieldCheck className="w-5 h-5 text-teal-500" /> },
    { rank: 3, name: 'Diamond Affiliate', desc: 'Wholesale pricing, prioritized support.', icon: <BadgeCheck className="w-5 h-5 text-amber-500" /> },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-navy uppercase tracking-tight mb-2">Trust Governance</h1>
          <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">Verify your identity and elevate your operating tier.</p>
        </div>
        <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl w-fit">
           <button onClick={() => setActiveTab('verification')} className={`px-6 py-3 rounded-xl text-[0.65rem] font-black uppercase tracking-widest transition-all ${activeTab === 'verification' ? 'bg-white text-navy shadow-lg' : 'text-slate-400'}`}>Verification</button>
           <button onClick={() => setActiveTab('app')} className={`px-6 py-3 rounded-xl text-[0.65rem] font-black uppercase tracking-widest transition-all ${activeTab === 'app' ? 'bg-white text-navy shadow-lg' : 'text-slate-400'}`}>PWA Installation</button>
        </div>
      </div>

      {activeTab === 'verification' ? (
        <div className="grid lg:grid-cols-3 gap-8">
           {/* Level Progress */}
           <div className="lg:col-span-2 space-y-8">
              <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden group">
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(20,184,166,0.05),transparent_60%)]" />
                 <div className="relative z-10">
                    <div className="flex items-center justify-between mb-8">
                       <h2 className="font-black text-navy text-sm uppercase tracking-widest flex items-center gap-3">
                          <Target className="w-5 h-5 text-teal-500" /> Tier Progression
                       </h2>
                       <span className="text-[0.6rem] font-black text-teal-600 uppercase tracking-widest bg-teal-50 px-3 py-1.5 rounded-xl">Next Level: Diamond</span>
                    </div>

                    <div className="space-y-6">
                       {levels.map(l => (
                         <div key={l.rank} className={`flex items-start gap-6 p-6 rounded-[2rem] border transition-all
                           ${level >= l.rank ? 'bg-teal-50/50 border-teal-100' : 'bg-white border-slate-50 opacity-40'}`}>
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg
                               ${level >= l.rank ? 'bg-teal-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                               {l.icon}
                            </div>
                            <div className="flex-1">
                               <div className="flex items-center justify-between mb-1">
                                  <h3 className="font-black text-navy text-sm uppercase tracking-tight">{l.name}</h3>
                                  {level >= l.rank && <UserCheck className="w-5 h-5 text-teal-500" />}
                               </div>
                               <p className="text-xs text-slate-400 font-medium leading-relaxed">{l.desc}</p>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>

           {/* Verify Action */}
           <div className="lg:col-span-1 space-y-8">
              <div className="bg-navy p-10 rounded-[3rem] text-white space-y-6 relative overflow-hidden group">
                 <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-transparent translate-x-32" />
                 <h3 className="font-black text-xs uppercase tracking-[0.4em] mb-4 opacity-30 relative z-10">Verification Hub</h3>
                 <div className="p-6 bg-white/5 border border-white/10 rounded-3xl relative z-10 hover:bg-white/10 transition-all cursor-pointer group">
                    <div className="flex items-center justify-between mb-4">
                       <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/20">
                          <ShieldCheck className="w-5 h-5" />
                       </div>
                       <ChevronRight className="w-4 h-4 text-white/30 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <p className="font-black text-sm uppercase mb-1">Identity KYB</p>
                    <p className="text-[0.6rem] text-white/30 font-bold uppercase tracking-widest">Enabled • Verified</p>
                 </div>
                 
                 <div className="p-6 bg-white/5 border border-white/10 rounded-3xl relative z-10 hover:bg-white/10 transition-all cursor-pointer group">
                    <div className="flex items-center justify-between mb-4">
                       <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                          <smartphone className="w-5 h-5 text-white/30" />
                       </div>
                       <ChevronRight className="w-4 h-4 text-white/30 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <p className="font-black text-sm uppercase mb-1 text-white/40">Secure Phone</p>
                    <p className="text-[0.6rem] text-amber-500/50 font-black uppercase tracking-widest">Pending Sync</p>
                 </div>
              </div>

              <div className="p-8 border-2 border-dashed border-slate-100 rounded-[2.5rem] bg-slate-50/50">
                 <h4 className="text-[0.65rem] font-black text-navy uppercase tracking-widest flex items-center gap-2 mb-4">
                    <Zap className="w-4 h-4 text-teal-500" /> Trust Index
                 </h4>
                 <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-500 rounded-full" style={{ width: '65%' }} />
                 </div>
                 <p className="text-[0.55rem] font-black text-slate-400 uppercase tracking-widest mt-3">65% Progress to Diamond Tier</p>
              </div>
           </div>
        </div>
      ) : (
        /* PWA Install Hub */
        <div className="bg-white p-12 lg:p-20 rounded-[4rem] border border-slate-100 shadow-sm text-center relative overflow-hidden group">
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(20,184,166,0.1),transparent_70%)]" />
           <div className="relative z-10 max-w-2xl mx-auto space-y-10">
              <div className="w-32 h-32 bg-navy rounded-[2.5rem] flex items-center justify-center text-white mx-auto shadow-2xl relative">
                 <TrendingUp className="w-16 h-16" />
                 <div className="absolute -bottom-4 -right-4 p-4 bg-teal-500 rounded-2xl shadow-xl">
                    <Smartphone className="w-6 h-6" />
                 </div>
              </div>
              
              <div className="space-y-4">
                 <h2 className="text-4xl font-black text-navy uppercase tracking-tighter">Your Dashboard, Anywhere.</h2>
                 <p className="text-base text-slate-400 font-medium leading-relaxed">
                   Experience the future of SMM on your desktop or mobile home screen. Our Progressive Web App (PWA) offers offline capabilities, lightning-fast transitions, and native deep-os notifications.
                 </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                 <button className="w-full sm:w-auto px-12 py-5 bg-navy text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:shadow-2xl transition-all flex items-center justify-center gap-3">
                    <Download className="w-5 h-5 flex-shrink-0" /> Install For Desktop
                 </button>
                 <button className="w-full sm:w-auto px-12 py-5 bg-teal-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:shadow-2xl hover:shadow-teal-500/20 transition-all flex items-center justify-center gap-3">
                    <Smartphone className="w-5 h-5 flex-shrink-0" /> Launch Mobile
                 </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-slate-50">
                 {[
                   { label: 'Latency', value: '-60%', desc: 'Faster loads' },
                   { label: 'Storage', value: '<2MB', desc: 'Ultra-light' },
                   { label: 'Secure', value: 'SSL', desc: 'Encrypted' },
                   { label: 'Update', value: 'AUTO', desc: 'Real-time' },
                 ].map(s => (
                   <div key={s.label}>
                      <h4 className="text-lg font-black text-navy leading-none mb-1 uppercase tracking-tight">{s.value}</h4>
                      <p className="text-[0.5rem] font-black text-teal-600 uppercase tracking-widest mb-1">{s.label}</p>
                      <p className="text-[0.6rem] text-slate-300 font-bold uppercase">{s.desc}</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default TrustCenter;
