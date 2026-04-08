import React, { useState } from 'react';
import { 
  Shield, Lock, Globe, List, 
  Trash2, Plus, Info, CheckCircle, 
  XSquare, Server, Terminal, Save, 
  AlertTriangle, Key, Clock
} from 'lucide-react';

const SecuritySettings = () => {
  const [securityStates, setSecurityStates] = useState({
    admin2fa: true,
    user2fa: false,
    sessionPersistence: '1h',
    maintenanceMode: false,
    ipBanOnFailed: true,
  });

  const ipWhitelist = [
    { ip: '192.168.1.1', desc: 'Home Network', user: 'admin', date: 'Oct 23, 2026' },
    { ip: '10.0.0.45', desc: 'Office (VPN)', user: 'admin', date: 'Jan 15, 2026' },
    { ip: '172.16.2.2', desc: 'Primary Server (Cron)', user: 'system', date: 'May 04, 2026' },
  ];

  const handleToggle = (key) => {
    setSecurityStates(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const ConfigToggle = ({ label, detail, isActive, onToggle, alert = false }) => (
    <div className={`p-6 rounded-3xl border transition-all ${isActive && alert ? 'bg-amber-500/5 border-amber-500/20' : 'bg-white/2 border-white/5'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border ${isActive ? 'bg-teal-500/10 text-teal-400 border-teal-500/20' : 'bg-red-500/10 text-red-500/50 border-red-500/20'}`}>
            {isActive ? <Shield className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
          </div>
          <div>
            <p className="text-white text-xs font-black uppercase tracking-widest leading-none">{label}</p>
            <p className="text-white/30 text-[0.6rem] font-bold uppercase mt-2 tracking-wider">{detail}</p>
          </div>
        </div>
        <button 
          onClick={onToggle}
          className={`w-12 h-6 rounded-full transition-all relative ${isActive ? 'bg-teal-500' : 'bg-white/10'}`}
        >
          <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${isActive ? 'left-7' : 'left-1'}`} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tight">Security & Resilience</h1>
          <p className="text-white/30 text-sm font-medium mt-1">Armor the platform against unauthorized access and attacks</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-400 text-white rounded-xl text-[0.6rem] font-black uppercase tracking-widest transition-all shadow-lg shadow-teal-500/20">
            <Save className="w-4 h-4" /> Commit Hardening
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Core Security */}
        <div className="space-y-4">
          <div className="bg-[#0d1526] border border-white/5 rounded-3xl p-8 h-full">
            <div className="flex items-center gap-3 mb-8">
               <div className="w-10 h-10 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-400">
                 <Shield className="w-5 h-5" />
               </div>
               <h3 className="text-white font-black text-sm uppercase tracking-widest">Global Governance</h3>
            </div>

            <div className="space-y-4">
              <ConfigToggle 
                label="Enforce Admin 2FA" 
                detail="Mandatory WebAuthn or Google Authenticator for login"
                isActive={securityStates.admin2fa}
                onToggle={() => handleToggle('admin2fa')}
              />
              <ConfigToggle 
                label="Mandatory User 2FA" 
                detail="Force all users to set up 2FA for account security"
                isActive={securityStates.user2fa}
                onToggle={() => handleToggle('user2fa')}
              />
              <ConfigToggle 
                label="Automatic IP Banning" 
                detail="Block IPs after 5 failed login attempts per hour"
                isActive={securityStates.ipBanOnFailed}
                onToggle={() => handleToggle('ipBanOnFailed')}
              />
              <ConfigToggle 
                label="Maintenance Mode" 
                detail="Redirect all non-admin users to maintenance page"
                isActive={securityStates.maintenanceMode}
                onToggle={() => handleToggle('maintenanceMode')}
                alert
              />
            </div>
          </div>
        </div>

        {/* IP Access Control & Session */}
        <div className="space-y-6">
          {/* IP Whitelist */}
          <div className="bg-[#0d1526] border border-white/5 rounded-3xl p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                  <Globe className="w-5 h-5" />
                </div>
                <h3 className="text-white font-black text-sm uppercase tracking-widest">IP Whitelisting</h3>
              </div>
              <button className="flex items-center gap-2 p-3 bg-white/5 hover:bg-white/10 text-white/40 hover:text-white rounded-xl transition-all">
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {ipWhitelist.map((ip, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white/2 rounded-2xl border border-white/5 hover:border-blue-500/20 transition-all group">
                  <div>
                    <p className="text-white text-xs font-black tracking-widest">{ip.ip}</p>
                    <p className="text-white/20 text-[0.55rem] font-bold uppercase mt-1 tracking-widest">{ip.desc} • {ip.date}</p>
                  </div>
                  <button className="text-red-500/40 hover:text-red-500 transition-colors p-2">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Session Management */}
          <div className="bg-[#0d1526] border border-white/5 rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-8">
               <div className="w-10 h-10 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                 <Clock className="w-5 h-5" />
               </div>
               <h3 className="text-white font-black text-sm uppercase tracking-widest">Session Control</h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-white/30 text-[0.6rem] font-black uppercase tracking-widest ml-1">Admin Session Lifetime</label>
                <select 
                  value={securityStates.sessionPersistence}
                  onChange={(e) => setSecurityStates(prev => ({ ...prev, sessionPersistence: e.target.value }))}
                  className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-4 text-white text-[0.7rem] font-black uppercase tracking-widest focus:border-teal-500/50 outline-none transition-all appearance-none"
                >
                  <option value="15m">15 MINUTES</option>
                  <option value="1h">1 HOUR</option>
                  <option value="8h">8 HOURS</option>
                  <option value="24h">24 HOURS</option>
                </select>
              </div>

              <div className="p-4 bg-red-400/5 border border-red-500/10 rounded-2xl flex items-start gap-4">
                 <AlertTriangle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                 <div>
                   <p className="text-red-500 text-[0.6rem] font-black uppercase tracking-widest leading-none">Security Risk Warning</p>
                   <p className="text-red-400/50 text-[0.55rem] font-medium leading-relaxed mt-1 uppercase tracking-widest">
                     Session durations over 8 hours increase risk of hijacked terminal access in shared environments.
                   </p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
