import React, { useState } from 'react';
import { Shield, Smartphone, Lock, AlertTriangle, Key, History, Trash2, ShieldCheck, X } from 'lucide-react';

const Security = () => {
  const [tfa, setTfa] = useState(false);
  const [showActivity, setShowActivity] = useState(false);

  const loginActivity = [
    { device: 'iPhone 15 Pro', ip: '192.168.1.12', time: 'Just Now', location: 'Lagos, Nigeria', status: 'current' },
    { device: 'Chrome / Windows', ip: '102.16.45.122', time: '2 hours ago', location: 'Abuja, Nigeria', status: 'active' },
    { device: 'Unrecognized Device', ip: '45.168.13.2', time: '3 days ago', location: 'London, UK', status: 'closed' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-navy uppercase tracking-tight">Security Center</h1>
          <p className="text-sm text-slate-400 font-medium">Govern your security protocols and sessions.</p>
        </div>
        <div className="p-3 bg-teal-50 rounded-2xl border border-teal-100 flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-teal-600" />
          <p className="text-[0.65rem] font-black text-teal-700 uppercase tracking-widest hidden sm:block">Status: Protected</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Core Controls */}
        <div className="space-y-6">
           {/* Password Control */}
           <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6 group">
              <div className="flex items-center gap-4 mb-2">
                 <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center">
                    <Lock className="w-5 h-5" />
                 </div>
                 <h3 className="font-black text-navy text-sm uppercase tracking-widest">Update Credentials</h3>
              </div>
              <div className="space-y-4">
                 <div>
                    <label className="block text-[0.6rem] font-black text-slate-400 uppercase tracking-widest mb-2">Current Key</label>
                    <input type="password" placeholder="••••••••" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-navy outline-none focus:border-blue-400 transition-all" />
                 </div>
                 <div>
                    <label className="block text-[0.6rem] font-black text-slate-400 uppercase tracking-widest mb-2">New Key</label>
                    <input type="password" placeholder="••••••••" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-navy outline-none focus:border-blue-400 transition-all" />
                 </div>
                 <button className="w-full py-4 bg-navy text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-navy/20">
                   Submit Change
                 </button>
              </div>
           </div>

           {/* Session Control */}
           <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-8 px-1">
                 <h3 className="font-black text-navy text-sm uppercase tracking-widest flex items-center gap-2">
                    <History className="w-5 h-5 text-teal-500" /> Active Sessions
                 </h3>
                 <button onClick={() => setShowActivity(!showActivity)} className="text-[0.65rem] font-black text-teal-600 uppercase tracking-widest hover:text-teal-400 transition-colors">
                    {showActivity ? 'Hide Activity' : 'View Full Logs'}
                 </button>
              </div>

              <div className="space-y-4">
                 {loginActivity.map((session, i) => (
                   <div key={i} className={`p-5 rounded-2xl border flex items-center justify-between transition-all group
                     ${session.status === 'current' ? 'bg-teal-50 border-teal-100 shadow-sm' : 'bg-white border-slate-50 hover:border-slate-100'}`}>
                      <div className="flex items-center gap-4">
                         <Smartphone className={`w-5 h-5 ${session.status === 'current' ? 'text-teal-600' : 'text-slate-300'}`} />
                         <div>
                            <p className="font-black text-navy text-xs uppercase">{session.device}</p>
                            <p className="text-[0.6rem] text-slate-400 font-bold uppercase">{session.location} • {session.time}</p>
                         </div>
                      </div>
                      {session.status !== 'current' && (
                        <button className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white">
                           <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {session.status === 'current' && <span className="text-[0.55rem] font-black uppercase text-teal-600 bg-white px-2 py-1 rounded-lg">Current</span>}
                   </div>
                 ))}
                 <button className="w-full py-4 text-red-500 font-black text-xs uppercase tracking-widest border-2 border-dashed border-red-50 rounded-2xl hover:bg-red-50 transition-all">
                    Terminar All Other Sessions
                 </button>
              </div>
           </div>
        </div>

        {/* Global Security Features */}
        <div className="space-y-6">
           <div className={`bg-gradient-to-br p-8 rounded-[2.5rem] text-white overflow-hidden relative transition-all duration-500
              ${tfa ? 'from-teal-600 to-teal-800' : 'from-[#0f172a] to-navy'}`}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(20,184,166,0.15),transparent_60%)]" />
              <div className="relative z-10">
                 <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md mb-6">
                    <Smartphone className="w-6 h-6 text-teal-400" />
                 </div>
                 <h3 className="font-black text-lg uppercase tracking-tight mb-2">Two-Factor Authentication (2FA)</h3>
                 <p className="text-sm text-white/50 font-medium mb-8 leading-relaxed">Add an extra layer of protection to your account with a secondary verification protocol.</p>
                 
                 <div className="flex items-center gap-6">
                    <button 
                      onClick={() => setTfa(!tfa)}
                      className={`w-14 h-8 rounded-full p-1 transition-all duration-300 relative
                        ${tfa ? 'bg-teal-400' : 'bg-white/10'}`}
                    >
                      <div className={`w-6 h-6 rounded-full bg-white shadow-lg transition-all duration-300
                        ${tfa ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                    <span className="text-xs font-black uppercase tracking-widest">{tfa ? 'Enabled' : 'Disabled'}</span>
                 </div>
              </div>
           </div>

           <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
              <div className="flex items-center gap-4 mb-2">
                 <div className="w-10 h-10 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center">
                    <Key className="w-5 h-5" />
                 </div>
                 <h3 className="font-black text-navy text-sm uppercase tracking-widest">Login Keys</h3>
              </div>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                 Manage your dynamic login keys for external authentication and reseller integrations.
              </p>
              <button className="flex items-center gap-2 text-xs font-black text-navy uppercase tracking-widest hover:text-teal-600 transition-colors">
                Regenerate Master Key <X className="w-4 h-4 rotate-45" />
              </button>
           </div>

           <div className="p-8 bg-red-500/5 border border-red-500/10 rounded-[2.5rem] flex items-start gap-5">
              <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0" />
              <div>
                <h4 className="font-black text-red-700 text-[0.65rem] uppercase tracking-widest mb-1">Warning Center</h4>
                <p className="text-[0.65rem] text-red-500 font-black uppercase tracking-tight leading-relaxed">
                  Never share your account credentials with anyone. FavTech agents will never ask for your password or 2FA codes.
                </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Security;
