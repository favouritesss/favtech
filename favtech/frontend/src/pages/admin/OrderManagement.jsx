import React, { useState } from 'react';
import { Search, CheckCircle, XCircle, RefreshCw, Eye, X } from 'lucide-react';

const MOCK_ORDERS = [
  { id: 8491, user: 'favour_o', platform: 'Instagram', service: 'Followers', qty: 5000, price: 2500, status: 'Processing', link: 'https://instagram.com/favour_o', date: '2026-04-08 00:12', apiResp: '{"order":84910,"status":"In progress"}' },
  { id: 8490, user: 'john_d', platform: 'TikTok', service: 'Views', qty: 10000, price: 500, status: 'Completed', link: 'https://tiktok.com/@john_d', date: '2026-04-07 23:45', apiResp: '{"order":84900,"status":"Completed"}' },
  { id: 8489, user: 'mary_k', platform: 'YouTube', service: 'Subscribers', qty: 500, price: 1500, status: 'Pending', link: 'https://youtube.com/@mary_k', date: '2026-04-07 22:00', apiResp: null },
  { id: 8488, user: 'biz_acct', platform: 'Twitter', service: 'Followers', qty: 2000, price: 800, status: 'Cancelled', link: 'https://twitter.com/biz_acct', date: '2026-04-07 20:30', apiResp: '{"error":"Cancelled by user"}' },
  { id: 8487, user: 'creator_x', platform: 'Facebook', service: 'Page Likes', qty: 1000, price: 1200, status: 'Pending', link: 'https://facebook.com/creator_x', date: '2026-04-07 19:00', apiResp: null },
];

const statusColors = {
  Completed: 'bg-green-500/15 text-green-400',
  Processing: 'bg-blue-500/15 text-blue-400',
  Pending: 'bg-amber-500/15 text-amber-400',
  Cancelled: 'bg-red-500/15 text-red-400',
};

const OrderManagement = () => {
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const updateStatus = (id, status) => setOrders(o => o.map(x => x.id === id ? { ...x, status } : x));

  const filtered = orders.filter(o =>
    (filter === 'All' || o.status === filter) &&
    (String(o.id).includes(search) || o.user.includes(search) || o.service.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black uppercase tracking-tight" style={{ color: 'var(--admin-text-primary)' }}>Order Management</h1>
        <p style={{ color: 'var(--admin-text-secondary)' }} className="text-xs font-medium mt-1">Control all platform orders</p>
      </div>

      {/* Status filters */}
      <div className="flex flex-wrap gap-2">
        {['All', 'Pending', 'Processing', 'Completed', 'Cancelled'].map(s => (
          <button key={s} onClick={() => setFilter(s)} 
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all 
              ${filter === s ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/20' : 'bg-white/5 opacity-60 hover:opacity-100 hover:bg-white/10'}`}
            style={{ color: filter === s ? 'white' : 'var(--admin-text-secondary)' }}
          >{s}</button>
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ backgroundColor: 'var(--admin-card-bg)', border: '1px solid var(--admin-border)' }}>
        <Search className="w-4 h-4" style={{ color: 'var(--admin-text-muted)' }} />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by order ID, user, or service..." className="bg-transparent text-xs outline-none w-full" style={{ color: 'var(--admin-text-primary)' }} />
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden shadow-xl" style={{ backgroundColor: 'var(--admin-card-bg)', border: '1px solid var(--admin-border)' }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ borderBottom: '1px solid var(--admin-border)' }}>
              <tr>
                {['ID', 'User', 'Platform', 'Service', 'Qty', 'Price', 'Status', 'Date', 'Actions'].map(h => (
                  <th key={h} className="text-left px-5 py-4 text-[0.55rem] font-black uppercase tracking-widest whitespace-nowrap" style={{ color: 'var(--admin-text-muted)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(o => (
                <tr key={o.id} className="border-b border-white/5 hover:bg-white/2 transition-all">
                  <td className="px-5 py-3 text-teal-400 font-black text-xs">#{o.id}</td>
                  <td className="px-5 py-3 text-white/60 text-xs">{o.user}</td>
                  <td className="px-5 py-3 text-white/60 text-xs">{o.platform}</td>
                  <td className="px-5 py-3 text-white/40 text-xs">{o.service}</td>
                  <td className="px-5 py-3 text-white/60 text-xs font-bold">{o.qty.toLocaleString()}</td>
                  <td className="px-5 py-3 text-white/60 text-xs font-bold">₦{o.price.toLocaleString()}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-1 rounded-lg text-[0.55rem] font-black uppercase tracking-widest ${statusColors[o.status]}`}>{o.status}</span>
                  </td>
                  <td className="px-5 py-3 text-white/30 text-xs whitespace-nowrap">{o.date}</td>
                  <td className="px-5 py-3">
                    <div className="flex gap-1.5">
                      <button onClick={() => setSelected(o)} className="w-7 h-7 rounded-lg bg-white/5 text-white/40 hover:text-blue-400 hover:bg-blue-500/15 flex items-center justify-center transition-all" title="View Details">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      {o.status !== 'Completed' && (
                        <button onClick={() => updateStatus(o.id, 'Completed')} className="w-7 h-7 rounded-lg bg-white/5 text-white/40 hover:text-green-400 hover:bg-green-500/15 flex items-center justify-center transition-all" title="Mark Complete">
                          <CheckCircle className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {o.status !== 'Cancelled' && (
                        <button onClick={() => updateStatus(o.id, 'Cancelled')} className="w-7 h-7 rounded-lg bg-white/5 text-white/40 hover:text-red-400 hover:bg-red-500/15 flex items-center justify-center transition-all" title="Cancel">
                          <XCircle className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {o.status === 'Cancelled' && (
                        <button onClick={() => updateStatus(o.id, 'Pending')} className="w-7 h-7 rounded-lg bg-white/5 text-white/40 hover:text-amber-400 hover:bg-amber-500/15 flex items-center justify-center transition-all" title="Retry">
                          <RefreshCw className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0d1526] border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <h3 className="text-white font-black text-sm uppercase tracking-widest">Order #{selected.id}</h3>
              <button onClick={() => setSelected(null)} className="text-white/30 hover:text-white"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-6 space-y-4">
              {[
                { l: 'User', v: selected.user }, { l: 'Platform', v: selected.platform },
                { l: 'Service', v: selected.service }, { l: 'Quantity', v: selected.qty.toLocaleString() },
                { l: 'Price', v: `₦${selected.price.toLocaleString()}` }, { l: 'Status', v: selected.status },
                { l: 'Date', v: selected.date }, { l: 'Link', v: selected.link },
              ].map(i => (
                <div key={i.l} className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-white/30 text-xs font-bold uppercase tracking-widest">{i.l}</span>
                  <span className="text-white text-xs font-black truncate ml-4 max-w-[200px]">{i.v}</span>
                </div>
              ))}
              {selected.apiResp && (
                <div>
                  <p className="text-white/30 text-[0.6rem] font-black uppercase tracking-widest mb-2">API Response</p>
                  <pre className="bg-black/40 text-teal-400 text-xs p-4 rounded-xl overflow-x-auto">{selected.apiResp}</pre>
                </div>
              )}
              <div className="flex gap-3 pt-2">
                <button onClick={() => { updateStatus(selected.id, 'Completed'); setSelected(null); }} className="flex-1 py-2.5 bg-green-500/15 text-green-400 font-black text-xs uppercase tracking-widest rounded-xl">Complete</button>
                <button onClick={() => { updateStatus(selected.id, 'Cancelled'); setSelected(null); }} className="flex-1 py-2.5 bg-red-500/15 text-red-400 font-black text-xs uppercase tracking-widest rounded-xl">Cancel & Refund</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
