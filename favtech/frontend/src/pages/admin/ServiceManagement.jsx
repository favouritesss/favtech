import React, { useState } from 'react';
import { Plus, Edit, Trash2, ToggleLeft, ToggleRight, X } from 'lucide-react';

const CATEGORIES = ['Instagram', 'TikTok', 'YouTube', 'Facebook', 'Twitter', 'Threads', 'Snapchat'];

const MOCK_SERVICES = [
  { id: 1, name: 'Instagram Followers', category: 'Instagram', min: 100, max: 100000, price: 0.5, active: true, provider: 'Voke API' },
  { id: 2, name: 'TikTok Views', category: 'TikTok', min: 1000, max: 1000000, price: 0.1, active: true, provider: 'Voke API' },
  { id: 3, name: 'YouTube Subscribers', category: 'YouTube', min: 100, max: 50000, price: 3.0, active: true, provider: 'Panel Plus' },
  { id: 4, name: 'Facebook Page Likes', category: 'Facebook', min: 100, max: 50000, price: 0.8, active: false, provider: 'Voke API' },
];

const ServiceManagement = () => {
  const [services, setServices] = useState(MOCK_SERVICES);
  const [filter, setFilter] = useState('All');
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ name: '', category: 'Instagram', min: 100, max: 10000, price: 1.0, provider: 'Voke API' });

  const filtered = services.filter(s => filter === 'All' || s.category === filter);
  const toggle = (id) => setServices(s => s.map(x => x.id === id ? { ...x, active: !x.active } : x));
  const del = (id) => setServices(s => s.filter(x => x.id !== id));
  const add = () => { setServices(s => [...s, { ...form, id: Date.now(), active: true }]); setModal(null); setForm({ name: '', category: 'Instagram', min: 100, max: 10000, price: 1.0, provider: 'Voke API' }); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tight">Service Management</h1>
          <p className="text-white/30 text-xs font-medium mt-1">{services.length} services configured</p>
        </div>
        <button onClick={() => setModal('add')} className="flex items-center gap-2 px-5 py-2.5 bg-teal-500 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-teal-400 transition-all">
          <Plus className="w-4 h-4" /> Add Service
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {['All', ...CATEGORIES].map(c => (
          <button key={c} onClick={() => setFilter(c)} className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${filter === c ? 'bg-teal-500 text-white' : 'bg-white/5 text-white/30 hover:text-white'}`}>{c}</button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-[#0d1526] border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-white/5">
              <tr>
                {['Service', 'Category', 'Min', 'Max', 'Price/1k', 'Provider', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left px-5 py-4 text-[0.55rem] font-black text-white/20 uppercase tracking-widest whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id} className="border-b border-white/5 hover:bg-white/2 transition-all">
                  <td className="px-5 py-3 text-white font-bold text-xs">{s.name}</td>
                  <td className="px-5 py-3 text-white/40 text-xs">{s.category}</td>
                  <td className="px-5 py-3 text-white/40 text-xs">{s.min.toLocaleString()}</td>
                  <td className="px-5 py-3 text-white/40 text-xs">{s.max.toLocaleString()}</td>
                  <td className="px-5 py-3 text-teal-400 font-black text-xs">${s.price.toFixed(2)}</td>
                  <td className="px-5 py-3 text-white/40 text-xs">{s.provider}</td>
                  <td className="px-5 py-3">
                    <button onClick={() => toggle(s.id)}>
                      {s.active ? <ToggleRight className="w-6 h-6 text-teal-400" /> : <ToggleLeft className="w-6 h-6 text-white/20" />}
                    </button>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex gap-1.5">
                      <button className="w-7 h-7 rounded-lg bg-white/5 text-white/40 hover:text-blue-400 hover:bg-blue-500/15 flex items-center justify-center transition-all">
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => del(s.id)} className="w-7 h-7 rounded-lg bg-white/5 text-white/40 hover:text-red-400 hover:bg-red-500/15 flex items-center justify-center transition-all">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modal === 'add' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0d1526] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <h3 className="text-white font-black text-sm uppercase tracking-widest">Add Service</h3>
              <button onClick={() => setModal(null)} className="text-white/30 hover:text-white"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-6 space-y-4">
              {[{ label: 'Service Name', key: 'name', type: 'text' }].map(f => (
                <div key={f.key}>
                  <label className="text-white/30 text-[0.6rem] font-black uppercase tracking-widest block mb-2">{f.label}</label>
                  <input type={f.type} value={form[f.key]} onChange={e => setForm(x => ({ ...x, [f.key]: e.target.value }))} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm outline-none focus:border-teal-500/50" />
                </div>
              ))}
              <div>
                <label className="text-white/30 text-[0.6rem] font-black uppercase tracking-widest block mb-2">Category</label>
                <select value={form.category} onChange={e => setForm(x => ({ ...x, category: e.target.value }))} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm outline-none">
                  {CATEGORIES.map(c => <option key={c} value={c} className="bg-gray-900">{c}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[{ label: 'Min', key: 'min' }, { label: 'Max', key: 'max' }, { label: 'Price/1k ($)', key: 'price' }].map(f => (
                  <div key={f.key}>
                    <label className="text-white/30 text-[0.6rem] font-black uppercase tracking-widest block mb-2">{f.label}</label>
                    <input type="number" value={form[f.key]} onChange={e => setForm(x => ({ ...x, [f.key]: Number(e.target.value) }))} className="w-full px-3 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm outline-none focus:border-teal-500/50" />
                  </div>
                ))}
              </div>
              <button onClick={add} className="w-full py-3 bg-teal-500 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-teal-400 transition-all">Add Service</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceManagement;
