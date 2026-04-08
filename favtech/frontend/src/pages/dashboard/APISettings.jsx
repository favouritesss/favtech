import React, { useState } from 'react';
import { Key, Copy, RefreshCw, Terminal, Globe, Code, Check } from 'lucide-react';

const APISettings = () => {
  const [apiKey, setApiKey] = useState('ft_7294_v2_9a8s7d6f');
  const [copied, setCopied] = useState(false);

  const copyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const docs = [
    { method: 'POST', endpoint: '/api/v2/order', desc: 'Create a new order' },
    { method: 'GET', endpoint: '/api/v2/status', desc: 'Get order status' },
    { method: 'GET', endpoint: '/api/v2/balance', desc: 'Get wallet balance' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-navy uppercase tracking-tight">API Governance</h1>
          <p className="text-sm text-slate-400 font-medium">Integrate FavTech into your own application or panel.</p>
        </div>
        <div className="p-3 bg-teal-50 rounded-2xl border border-teal-100 flex items-center gap-3">
          <Terminal className="w-5 h-5 text-teal-600" />
          <p className="text-[0.65rem] font-black text-teal-700 uppercase tracking-widest hidden sm:block">API Status: Online</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Key Management */}
        <div className="space-y-6">
           <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
              <div className="flex items-center gap-4 mb-2">
                 <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center">
                    <Key className="w-5 h-5" />
                 </div>
                 <h3 className="font-black text-navy text-sm uppercase tracking-widest">Master API Key</h3>
              </div>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">Your API key provides full access to your wallet and orders. Keep it secure and never share it.</p>
              
              <div className="relative">
                <input 
                  readOnly 
                  value={apiKey}
                  className="w-full bg-slate-50 border border-slate-100 p-5 pr-20 rounded-2xl text-xs font-black text-navy outline-none font-mono"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                  <button onClick={copyKey} className="p-2.5 bg-white text-navy border border-slate-100 rounded-xl hover:text-teal-600 transition-all shadow-sm">
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <button onClick={() => setApiKey(`ft_${Math.floor(Math.random()*9000+1000)}_v2_${Math.random().toString(36).substring(7)}`)} className="p-2.5 bg-navy text-white rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-navy/20">
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>
           </div>

           <div className="p-8 border-2 border-dashed border-slate-100 rounded-[2.5rem] bg-slate-50/50 space-y-4">
              <div className="flex items-center gap-3">
                 <Globe className="w-5 h-5 text-teal-500" />
                 <h4 className="font-black text-navy text-xs uppercase tracking-widest">API Endpoint</h4>
              </div>
              <p className="text-[0.6rm] font-black text-teal-600 break-all bg-white px-4 py-3 rounded-xl border border-slate-100">https://favtech.smm/api/v2</p>
           </div>
        </div>

        {/* Documentation Snippet */}
        <div className="bg-navy p-8 rounded-[2.5rem] text-white space-y-8 relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 blur-[100px] rounded-full" />
           <div className="flex items-center justify-between px-1 relative z-10">
              <h3 className="font-black text-sm uppercase tracking-widest flex items-center gap-2">
                 <Code className="w-5 h-5 text-teal-400" /> Implementation Docs
              </h3>
              <button className="text-[0.6rem] font-black text-teal-400 uppercase tracking-widest border border-teal-400/20 px-4 py-2 rounded-xl hover:bg-teal-400 hover:text-white transition-all">Download .yaml</button>
           </div>

           <div className="space-y-4 relative z-10">
              {docs.map((d, i) => (
                <div key={i} className="p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
                   <div className="flex items-center justify-between mb-2">
                      <span className={`text-[0.55rem] font-black uppercase px-2 py-0.5 rounded-lg
                        ${d.method === 'POST' ? 'bg-teal-500/20 text-teal-400' : 'bg-blue-500/20 text-blue-400'}`}>
                        {d.method}
                      </span>
                      <span className="text-[0.6rem] font-mono text-white/30 truncate max-w-[120px]">{d.endpoint}</span>
                   </div>
                   <p className="text-[0.7rem] font-medium text-white/60">{d.desc}</p>
                </div>
              ))}
           </div>

           <div className="bg-black/20 p-5 rounded-2xl border border-white/5 relative z-10">
              <h4 className="text-[0.6rem] font-black uppercase text-teal-400 mb-3">Example Request (Node.js)</h4>
              <div className="font-mono text-[0.6rem] text-white/40 space-y-1">
                 <p className="text-teal-400">const<span className="text-white"> response = </span>await<span className="text-white"> axios.post(</span>'https://api/v2'</p>
                 <p className="pl-4 text-white/60">key: <span className="text-teal-400">'{apiKey.slice(0,8)}...'</span>,</p>
                 <p className="pl-4 text-white/60">action: <span className="text-teal-400">'add'</span>,</p>
                 <p className="pl-4 text-white/60">service: <span className="text-teal-400">1</span></p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default APISettings;
