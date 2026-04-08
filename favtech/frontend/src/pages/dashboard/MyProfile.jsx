import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { User, Mail, Shield, Camera, X } from 'lucide-react';

const MyProfile = () => {
  const { user = {} } = useOutletContext() || {};
  const [profile, setProfile] = useState({ name: user.name || '', email: user.email || '', bio: 'Power User' });
  const [editing, setEditing] = useState(false);

  const stats = [
    { label: 'Active Orders', value: '0' },
    { label: 'Total Spending', value: `₦${Number(user.wallet_balance || 0).toLocaleString()}` },
    { label: 'Account Tier', value: 'Standard' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-black text-navy uppercase tracking-tight">Public Profile</h1>
        <p className="text-sm text-slate-400 font-medium">Customize how others see you on the platform.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Left Column: Avatar & Summary */}
        <div className="md:col-span-1 space-y-4">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(20,184,166,0.05),transparent_60%)]" />
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-3xl flex items-center justify-center text-white font-black text-3xl mx-auto mb-4 relative shadow-xl shadow-teal-500/20">
                {profile.name.charAt(0).toUpperCase()}
                <button className="absolute -bottom-2 -right-2 p-2 bg-white rounded-xl text-navy shadow-lg border border-slate-100 hover:text-teal-500 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <h2 className="font-black text-navy text-lg uppercase tracking-tight">{profile.name}</h2>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{profile.bio}</p>
            </div>
          </div>

          <div className="bg-navy p-8 rounded-[2.5rem] text-white">
             <div className="space-y-4">
                {stats.map(s => (
                  <div key={s.label}>
                    <p className="text-[0.6rem] font-black uppercase tracking-widest text-white/30 mb-1">{s.label}</p>
                    <p className="text-sm font-black text-teal-400">{s.value}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Right Column: Settings */}
        <div className="md:col-span-2 space-y-8">
           <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-50 pb-6">
                 <h3 className="font-black text-navy text-sm uppercase tracking-widest flex items-center gap-2">
                    <User className="w-4 h-4 text-teal-500" /> Account Settings
                 </h3>
                 <button onClick={() => setEditing(!editing)} className="text-[0.65rem] font-black text-teal-600 uppercase tracking-widest hover:text-teal-400 transition-colors">
                    {editing ? 'Cancel' : 'Edit Details'}
                 </button>
              </div>

              <div className="space-y-6">
                 <div>
                    <label className="block text-[0.6rem] font-black text-slate-400 uppercase tracking-widest mb-3">Full Legal Name</label>
                    <div className="flex items-center gap-3 px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl">
                      <User className="w-4 h-4 text-slate-300" />
                      <input 
                        readOnly={!editing}
                        value={profile.name}
                        onChange={e => setProfile(n => ({ ...n, name: e.target.value }))}
                        className="bg-transparent text-sm font-bold text-navy outline-none w-full disabled:opacity-50"
                      />
                    </div>
                 </div>

                 <div>
                    <label className="block text-[0.6rem] font-black text-slate-400 uppercase tracking-widest mb-3">Professional Email Address</label>
                    <div className="flex items-center gap-3 px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl">
                      <Mail className="w-4 h-4 text-slate-300" />
                      <input 
                        readOnly={!editing}
                        value={profile.email}
                        onChange={e => setProfile(n => ({ ...n, email: e.target.value }))}
                        className="bg-transparent text-sm font-bold text-navy outline-none w-full disabled:opacity-50"
                      />
                    </div>
                 </div>

                 {editing && (
                   <button className="w-full py-4 bg-teal-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-teal-400 transition-all shadow-xl shadow-teal-500/20">
                     Submit Profile Update
                   </button>
                 )}
              </div>
           </div>

           <div className="p-8 border-2 border-dashed border-slate-100 rounded-[2.5rem] bg-slate-50/50">
              <h4 className="font-black text-navy text-[0.65rem] uppercase tracking-widest mb-2 flex items-center gap-2">
                 <Shield className="w-4 h-4 text-teal-500" /> Data Protection
              </h4>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                Your data is encrypted and never shared. We follow strict security guidelines to ensure your privacy is respected at all times.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
