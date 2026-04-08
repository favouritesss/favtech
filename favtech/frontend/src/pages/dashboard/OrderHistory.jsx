import React, { useState, useEffect } from 'react';
import { Search, Filter, RefreshCw, Download, RotateCcw, LifeBuoy } from 'lucide-react';
import { userService } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const STATUS_COLORS = {
  Completed: 'bg-green-100 text-green-700',
  Processing: 'bg-blue-100 text-blue-700',
  Pending: 'bg-amber-100 text-amber-700',
  Cancelled: 'bg-red-100 text-red-700',
  'Partial': 'bg-purple-100 text-purple-700',
  'In progress': 'bg-cyan-100 text-cyan-700',
};

const OrderHistory = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await userService.getOrders();
        setOrders(res.data);
      } catch (err) {
        console.error('Orders fetch failed');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const filtered = orders.filter(o => {
    const matchFilter = filter === 'All' || o.status === filter;
    const matchSearch = String(o.id).includes(search) || String(o.service_id).includes(search) || String(o.link).toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const exportCSV = () => {
    const headers = ['Order ID,Service ID,Link,Quantity,Charge,Status,Date'];
    const rows = filtered.map(o => `${o.id},${o.service_id},"${o.link}",${o.quantity},${o.charge},${o.status},${o.created_at}`);
    const blob = new Blob([[headers, ...rows].join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders_${new Date().getTime()}.csv`;
    a.click();
  };

  const handleReorder = (order) => {
    localStorage.setItem('reorder', JSON.stringify({ service: order.service_id, link: order.link, quantity: order.quantity }));
    navigate('/dashboard/new-order');
  };

  if (loading) return (
    <div className="p-20 text-center flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-4 border-teal-500/20 border-t-teal-500 rounded-full animate-spin" />
      <span className="text-navy/20 font-black uppercase tracking-widest text-xs">Syncing Ledger...</span>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-navy uppercase tracking-tight">Order History</h1>
          <p className="text-sm text-slate-400 font-medium">Track and manage all your orders</p>
        </div>
        <div className="flex gap-2">
          <button onClick={exportCSV} className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 text-navy font-black text-xs uppercase tracking-widest rounded-xl hover:bg-slate-50 transition-all">
            <Download className="w-3.5 h-3.5" /> Export
          </button>
          <button onClick={() => window.location.reload()} className="flex items-center gap-2 px-5 py-2.5 bg-navy text-white font-black text-xs uppercase tracking-widest rounded-xl">
            <RefreshCw className="w-3 h-3" /> Refresh
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {['All', 'Pending', 'Processing', 'In progress', 'Completed', 'Cancelled'].map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border transition-all
              ${filter === s ? 'bg-navy text-white border-navy shadow-lg shadow-navy/20' : 'bg-white text-slate-500 border-slate-100 hover:border-navy'}`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 px-5 py-3 bg-white border border-slate-100 rounded-xl shadow-sm">
        <Search className="w-4 h-4 text-slate-400" />
        <input placeholder="Search orders..." value={search} onChange={e => setSearch(e.target.value)} className="flex-1 text-sm font-medium text-navy outline-none placeholder-slate-400 bg-transparent" />
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-50 bg-slate-50">
                {['ID', 'Service', 'Link', 'Qty', 'Price', 'Status', 'Date', 'Action'].map(h => (
                  <th key={h} className="text-left px-6 py-4 text-[0.6rem] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-20">
                    <Filter className="w-10 h-10 text-slate-100 mx-auto mb-4" />
                    <p className="font-black text-navy text-xs uppercase">No Matches Found</p>
                  </td>
                </tr>
              ) : filtered.map(o => (
                <tr key={o.id} className="border-b border-slate-50 hover:bg-slate-50 transition-all group">
                  <td className="px-6 py-4 font-black text-navy text-xs tracking-tighter">#{o.id}</td>
                  <td className="px-6 py-4">
                    <p className="text-[0.65rem] font-black text-slate-400 mb-1">{o.platform || 'Platform'}</p>
                    <p className="text-xs font-bold text-navy truncate max-w-[120px]">{o.service_name || `Service ID: ${o.service_id}`}</p>
                  </td>
                  <td className="px-6 py-4 text-[0.65rem] text-teal-600 font-bold truncate max-w-[100px] hover:text-teal-400 cursor-pointer">{o.link}</td>
                  <td className="px-6 py-4 font-black text-navy text-xs">{Number(o.quantity).toLocaleString()}</td>
                  <td className="px-6 py-4">
                     <p className="font-black text-navy text-xs">₦{Number(o.charge).toLocaleString()}</p>
                     <p className="text-[0.55rem] font-bold text-slate-300 uppercase">Paid Sync</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded-lg text-[0.55rem] font-black uppercase tracking-widest ${STATUS_COLORS[o.status] || 'bg-slate-100 text-slate-400'}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[0.65rem] text-slate-400 font-black uppercase tracking-widest whitespace-nowrap">{new Date(o.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all">
                       <button onClick={() => handleReorder(o)} className="w-8 h-8 bg-teal-50 text-teal-600 rounded-lg flex items-center justify-center hover:bg-teal-500 hover:text-white transition-all shadow-sm" title="Duplicate Order">
                         <RotateCcw className="w-3.5 h-3.5" />
                       </button>
                       {o.status === 'Completed' && (
                         <button className="w-8 h-8 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all shadow-sm" title="Trigger Refill">
                           <RefreshCw className="w-3.5 h-3.5" />
                         </button>
                       )}
                       <button onClick={() => navigate('/dashboard/tickets')} className="w-8 h-8 bg-slate-100 text-slate-400 rounded-lg flex items-center justify-center hover:bg-navy hover:text-white transition-all shadow-sm" title="Contact Agent">
                         <LifeBuoy className="w-3.5 h-3.5" />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
