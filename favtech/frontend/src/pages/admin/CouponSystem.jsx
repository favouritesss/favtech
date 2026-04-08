import React, { useState } from 'react';
import { Tag, Plus, Trash2, X } from 'lucide-react';

const CouponSystem = () => {
  const [coupons, setCoupons] = useState([
    { id: 1, code: 'WELCOME20', discount: 20, type: 'percent', uses: 45, maxUses: 100, expiry: '2026-06-30', active: true },
    { id: 2, code: 'FLAT500', discount: 500, type: 'fixed', uses: 12, maxUses: 50, expiry: '2026-05-15', active: true },
    { id: 3, code: 'VIP30', discount: 30, type: 'percent', uses: 8, maxUses: 20, expiry: '2026-04-30', active: false },
  ]);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ code: '', discount: 10, type: 'percent', maxUses: 100, expiry: '' });

  const add = () => { setCoupons(c => [...c, { ...form, id: Date.now(), uses: 0, active: true }]); setModal(false); };
  const del = (id) => setCoupons(c => c.filter(x => x.id !== id));
  const toggle = (id) => setCoupons(c => c.map(x => x.id === id ? { ...x, active: !x.active } : x));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tight">Coupon System</h1>
          <p className="text-white/30 text-xs font-medium mt-1">Create and manage discount codes</p>
        </div>
        <button onClick={() => setModal(true)} className="flex items-center gap-2 px-5 py-2.5 bg-teal-500 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-teal-400 transition-all">
          <Plus className="w-4 h-4" /> Create Coupon
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {coupons.map(c => (
          <div key={c.id} className={`bg-[#0d1526] border rounded-2xl p-6 transition-all ${c.active ? 'border-white/5 hover:border-teal-500/20' : 'border-white/5 opacity-50'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-teal-400" />
                <span className="text-teal-400 font-black text-sm font-mono">{c.code}</span>
              </div>
              <span className={`px-2 py-0.5 rounded-lg text-[0.55rem] font-black uppercase tracking-widest ${c.active ? 'bg-green-500/15 text-green-400' : 'bg-white/5 text-white/20'}`}>{c.active ? 'Active' : 'Off'}</span>
            </div>
            <p className="text-white font-black text-2xl mb-1">{c.type === 'percent' ? `${c.discount}%` : `₦${c.discount}`} off</p>
            <div className="flex justify-between text-xs font-medium mb-4">
              <span className="text-white/30">{c.uses}/{c.maxUses} used</span>
              <span className="text-white/30">Exp: {c.expiry}</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full mb-4">
              <div className="h-full bg-teal-500 rounded-full" style={{ width: `${(c.uses/c.maxUses)*100}%` }} />
            </div>
            <div className="flex gap-2">
              <button onClick={() => toggle(c.id)} className="flex-1 py-2 bg-white/5 text-white/40 hover:text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all">{c.active ? 'Disable' : 'Enable'}</button>
              <button onClick={() => del(c.id)} className="py-2 px-3 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0d1526] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <h3 className="text-white font-black text-sm uppercase tracking-widest">Create Coupon</h3>
              <button onClick={() => setModal(false)} className="text-white/30 hover:text-white"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-white/30 text-[0.6rem] font-black uppercase tracking-widest block mb-2">Coupon Code</label>
                <input value={form.code} onChange={e => setForm(x => ({ ...x, code: e.target.value.toUpperCase() }))} placeholder="e.g. SAVE20" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm font-mono outline-none focus:border-teal-500/50 placeholder-white/20" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-white/30 text-[0.6rem] font-black uppercase tracking-widest block mb-2">Discount Type</label>
                  <select value={form.type} onChange={e => setForm(x => ({ ...x, type: e.target.value }))} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm outline-none">
                    <option value="percent" className="bg-gray-900">Percentage (%)</option>
                    <option value="fixed" className="bg-gray-900">Fixed Amount (₦)</option>
                  </select>
                </div>
                <div>
                  <label className="text-white/30 text-[0.6rem] font-black uppercase tracking-widest block mb-2">Discount Value</label>
                  <input type="number" value={form.discount} onChange={e => setForm(x => ({ ...x, discount: Number(e.target.value) }))} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm outline-none focus:border-teal-500/50" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-white/30 text-[0.6rem] font-black uppercase tracking-widest block mb-2">Max Uses</label>
                  <input type="number" value={form.maxUses} onChange={e => setForm(x => ({ ...x, maxUses: Number(e.target.value) }))} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm outline-none focus:border-teal-500/50" />
                </div>
                <div>
                  <label className="text-white/30 text-[0.6rem] font-black uppercase tracking-widest block mb-2">Expiry Date</label>
                  <input type="date" value={form.expiry} onChange={e => setForm(x => ({ ...x, expiry: e.target.value }))} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm outline-none focus:border-teal-500/50" />
                </div>
              </div>
              <button onClick={add} className="w-full py-3 bg-teal-500 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-teal-400 transition-all">Create Coupon</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CouponSystem;
