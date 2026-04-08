import React, { useState } from 'react';
import { useBrand } from '../context/BrandContext';

const AdminSettings = () => {
  const { settings, updateSettings } = useBrand();
  const [form, setForm] = useState(settings);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSettings(form);
    alert('Global Identity Updated Successfully!');
  };

  return (
    <div className="p-10 max-w-4xl mx-auto animate-fade-in space-y-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black text-navy mb-4 tracking-tighter uppercase">Brand Master Console</h1>
        <p className="text-slate-dark font-bold opacity-60 leading-relaxed uppercase tracking-[0.4em] italic text-xs">Propagating global identity changes across the platform node</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-16 rounded-[4rem] border border-slate-100 shadow-2xl space-y-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full bg-seafoam"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-ice opacity-40 blur-3xl rounded-full -mr-32 -mb-32"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4">
             <label className="text-xs font-black text-navy uppercase tracking-widest ml-4">Application Identity Name</label>
             <input 
              type="text" 
              className="w-full p-6 bg-ice border border-slate-100 rounded-3xl outline-none focus:ring-4 focus:ring-seafoam/10 font-black text-navy uppercase placeholder:opacity-30" 
              value={form.name}
              onChange={(e) => setForm({...form, name: e.target.value})}
             />
          </div>

          <div className="space-y-4">
             <label className="text-xs font-black text-navy uppercase tracking-widest ml-4">Corporate Tagline</label>
             <input 
              type="text" 
              className="w-full p-6 bg-ice border border-slate-100 rounded-3xl outline-none focus:ring-4 focus:ring-seafoam/10 font-bold text-slate-dark" 
              value={form.tagline}
              onChange={(e) => setForm({...form, tagline: e.target.value})}
             />
          </div>

          <div className="space-y-4">
             <label className="text-xs font-black text-navy uppercase tracking-widest ml-4">Primary Brand Tone (HEX)</label>
             <input 
              type="text" 
              className="w-full p-6 bg-ice border border-slate-100 rounded-3xl outline-none focus:ring-4 focus:ring-seafoam/10 font-bold" 
              value={form.logoColor}
              onChange={(e) => setForm({...form, logoColor: e.target.value})}
             />
          </div>

          <div className="space-y-4">
             <label className="text-xs font-black text-navy uppercase tracking-widest ml-4">Administrative Support Email</label>
             <input 
              type="email" 
              className="w-full p-6 bg-ice border border-slate-100 rounded-3xl outline-none focus:ring-4 focus:ring-seafoam/10 font-bold" 
              value={form.supportEmail}
              onChange={(e) => setForm({...form, supportEmail: e.target.value})}
             />
          </div>
        </div>

        <div className="pt-10 border-t border-slate-100 flex items-center justify-between">
           <div className="text-left">
              <p className="text-xs font-black text-navy uppercase tracking-widest mb-1 italic">Real-Time Refresh Active</p>
              <p className="text-[0.6rem] font-bold text-slate-dark opacity-50 uppercase tracking-widest leading-none">Changes take effect globally upon persistence.</p>
           </div>
           <button type="submit" className="px-16 py-6 bg-navy text-white text-sm font-black rounded-3xl shadow-2xl shadow-navy/20 hover:bg-slate-800 transition-all uppercase tracking-widest hover:scale-105 active:scale-95">Save & Propagate Brand</button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;
