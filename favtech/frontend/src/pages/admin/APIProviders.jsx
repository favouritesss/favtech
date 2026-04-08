import React, { useState } from 'react';
import { Plus, TestTube, Edit, Trash2, ToggleLeft, ToggleRight, X, CheckCircle, XCircle, Globe } from 'lucide-react';

const MOCK_PROVIDERS = [
  { id: 1, name: 'Voke API', url: 'https://voke.io/api/v2', key: 'voke_key_****', status: 'active', balance: '$142.50', services: 48 },
  { id: 2, name: 'SMM King', url: 'https://smmking.io/api', key: 'smmk_key_****', status: 'inactive', balance: '$0.00', services: 0 },
  { id: 3, name: 'Panel Plus', url: 'https://panelplus.co/api', key: 'pp_key_****', status: 'active', balance: '$23.80', services: 12 },
];

const APIProviders = () => {
  const [providers, setProviders] = useState(MOCK_PROVIDERS);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ name: '', url: '', key: '' });
  const [testResult, setTestResult] = useState({});
  const [testing, setTesting] = useState(null);

  const toggleStatus = (id) => setProviders(p => p.map(x => x.id === id ? { ...x, status: x.status === 'active' ? 'inactive' : 'active' } : x));
  const deleteProvider = (id) => setProviders(p => p.filter(x => x.id !== id));

  const testConnection = async (id) => {
    setTesting(id);
    await new Promise(r => setTimeout(r, 1500));
    setTestResult(t => ({ ...t, [id]: Math.random() > 0.3 ? 'success' : 'failed' }));
    setTesting(null);
  };

  const addProvider = () => {
    setProviders(p => [...p, { ...form, id: Date.now(), status: 'inactive', balance: '$0.00', services: 0 }]);
    setModal(null);
    setForm({ name: '', url: '', key: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tight">API Providers</h1>
          <p className="text-white/30 text-xs font-medium mt-1">Manage SMM API connections</p>
        </div>
        <button onClick={() => setModal('add')} className="flex items-center gap-2 px-5 py-2.5 bg-teal-500 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-teal-400 transition-all">
          <Plus className="w-4 h-4" /> Add Provider
        </button>
      </div>

      {/* Provider Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {providers.map(p => (
          <div key={p.id} className="bg-[#0d1526] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all">
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-500/10 rounded-xl flex items-center justify-center">
                  <Globe className="w-5 h-5 text-teal-400" />
                </div>
                <div>
                  <p className="text-white font-black text-sm">{p.name}</p>
                  <p className={`text-[0.55rem] font-bold uppercase tracking-widest ${p.status === 'active' ? 'text-teal-400' : 'text-white/20'}`}>{p.status}</p>
                </div>
              </div>
              <button onClick={() => toggleStatus(p.id)} className="text-white/20 hover:text-teal-400 transition-all">
                {p.status === 'active' ? <ToggleRight className="w-6 h-6 text-teal-400" /> : <ToggleLeft className="w-6 h-6" />}
              </button>
            </div>

            <div className="space-y-3 mb-5">
              <div>
                <p className="text-white/20 text-[0.5rem] font-bold uppercase tracking-widest mb-1">API URL</p>
                <p className="text-white/50 text-xs font-medium truncate">{p.url}</p>
              </div>
              <div className="flex gap-4">
                <div>
                  <p className="text-white/20 text-[0.5rem] font-bold uppercase tracking-widest mb-1">Balance</p>
                  <p className="text-teal-400 font-black text-sm">{p.balance}</p>
                </div>
                <div>
                  <p className="text-white/20 text-[0.5rem] font-bold uppercase tracking-widest mb-1">Services</p>
                  <p className="text-white font-black text-sm">{p.services}</p>
                </div>
              </div>
            </div>

            {/* Test Result */}
            {testResult[p.id] && (
              <div className={`flex items-center gap-2 p-2 rounded-lg mb-3 ${testResult[p.id] === 'success' ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                {testResult[p.id] === 'success' ? <CheckCircle className="w-4 h-4 text-green-400" /> : <XCircle className="w-4 h-4 text-red-400" />}
                <span className={`text-[0.6rem] font-black uppercase tracking-widest ${testResult[p.id] === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                  {testResult[p.id] === 'success' ? 'Connection Successful' : 'Connection Failed'}
                </span>
              </div>
            )}

            <div className="flex gap-2">
              <button onClick={() => testConnection(p.id)} disabled={testing === p.id} className="flex-1 py-2.5 bg-white/5 text-white/40 hover:text-teal-400 hover:bg-teal-500/10 font-black text-[0.6rem] uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                <TestTube className="w-3.5 h-3.5" />
                {testing === p.id ? 'Testing...' : 'Test'}
              </button>
              <button onClick={() => { setForm({ name: p.name, url: p.url, key: p.key }); setModal('edit'); }} className="py-2.5 px-3 bg-white/5 text-white/40 hover:text-white hover:bg-white/10 rounded-xl transition-all">
                <Edit className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => deleteProvider(p.id)} className="py-2.5 px-3 bg-white/5 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0d1526] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <h3 className="text-white font-black text-sm uppercase tracking-widest">{modal === 'add' ? 'Add API Provider' : 'Edit Provider'}</h3>
              <button onClick={() => setModal(null)} className="text-white/30 hover:text-white"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-6 space-y-4">
              {[
                { label: 'Provider Name', key: 'name', placeholder: 'e.g. Voke API' },
                { label: 'Base URL', key: 'url', placeholder: 'https://provider.com/api' },
                { label: 'API Key', key: 'key', placeholder: 'your_api_key_here' },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-white/30 text-[0.6rem] font-black uppercase tracking-widest block mb-2">{f.label}</label>
                  <input value={form[f.key]} onChange={e => setForm(x => ({ ...x, [f.key]: e.target.value }))} placeholder={f.placeholder}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm outline-none focus:border-teal-500/50 placeholder-white/20" />
                </div>
              ))}
              <button onClick={addProvider} className="w-full py-3 bg-teal-500 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-teal-400 transition-all mt-2">
                {modal === 'add' ? 'Add Provider' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default APIProviders;
