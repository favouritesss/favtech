import React, { useState } from 'react';
import { Search, Download, Filter, CheckCircle, XCircle, RefreshCw, Eye } from 'lucide-react';

const MOCK_TRANSACTIONS = [
  { id: 'TXN-001', user: 'favour_o', type: 'deposit', amount: 10000, method: 'Paystack', status: 'success', date: '2026-04-08 00:12' },
  { id: 'TXN-002', user: 'john_d', type: 'deduction', amount: 2500, method: 'Order #8490', status: 'success', date: '2026-04-07 23:45' },
  { id: 'TXN-003', user: 'biz_acct', type: 'deposit', amount: 50000, method: 'Paystack', status: 'pending', date: '2026-04-07 22:30' },
  { id: 'TXN-004', user: 'mary_k', type: 'refund', amount: 3000, method: 'Order #8480', status: 'success', date: '2026-04-07 21:00' },
  { id: 'TXN-005', user: 'creator_x', type: 'deposit', amount: 1000, method: 'Card', status: 'failed', date: '2026-04-07 20:15' },
  { id: 'TXN-006', user: 'favour_o', type: 'deduction', amount: 750, method: 'Order #8489', status: 'success', date: '2026-04-07 19:30' },
];

const typeColors = { deposit: 'text-green-400', deduction: 'text-red-400', refund: 'text-blue-400' };
const statusColors = { success: 'bg-green-500/15 text-green-400', pending: 'bg-amber-500/15 text-amber-400', failed: 'bg-red-500/15 text-red-400' };

const Transactions = () => {
  const [txns, setTxns] = useState(MOCK_TRANSACTIONS);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [selected, setSelected] = useState(null);

  const filtered = txns.filter(t =>
    (t.user.includes(search) || t.id.includes(search)) &&
    (filterStatus === 'all' || t.status === filterStatus) &&
    (filterType === 'all' || t.type === filterType)
  );

  const totalRevenue = txns.filter(t => t.type === 'deposit' && t.status === 'success').reduce((a, t) => a + t.amount, 0);
  const totalRefunds = txns.filter(t => t.type === 'refund').reduce((a, t) => a + t.amount, 0);
  const pendingAmt = txns.filter(t => t.status === 'pending').reduce((a, t) => a + t.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tight">Transactions</h1>
          <p className="text-white/30 text-xs font-medium mt-1">Financial overview and payment control</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-white/5 text-white/60 hover:text-white border border-white/10 font-black text-xs uppercase tracking-widest rounded-xl transition-all">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Collected', value: `₦${totalRevenue.toLocaleString()}`, color: 'text-teal-400' },
          { label: 'Pending Approval', value: `₦${pendingAmt.toLocaleString()}`, color: 'text-amber-400' },
          { label: 'Total Refunds', value: `₦${totalRefunds.toLocaleString()}`, color: 'text-red-400' },
        ].map(s => (
          <div key={s.label} className="bg-[#0d1526] border border-white/5 rounded-2xl p-5">
            <p className="text-white/30 text-[0.6rem] font-bold uppercase tracking-widest mb-2">{s.label}</p>
            <p className={`font-black text-xl ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#0d1526] border border-white/5 rounded-xl flex-1 min-w-48">
          <Search className="w-4 h-4 text-white/20" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by ID or user..." className="bg-transparent text-xs text-white outline-none placeholder-white/20 w-full" />
        </div>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="px-4 py-2.5 bg-[#0d1526] border border-white/5 rounded-xl text-xs text-white/40 outline-none">
          <option value="all">All Status</option>
          <option value="success">Success</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
        <select value={filterType} onChange={e => setFilterType(e.target.value)} className="px-4 py-2.5 bg-[#0d1526] border border-white/5 rounded-xl text-xs text-white/40 outline-none">
          <option value="all">All Types</option>
          <option value="deposit">Deposit</option>
          <option value="deduction">Deduction</option>
          <option value="refund">Refund</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-[#0d1526] border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-white/5">
              <tr>
                {['TX ID', 'User', 'Type', 'Amount', 'Method', 'Status', 'Date', 'Actions'].map(h => (
                  <th key={h} className="text-left px-5 py-4 text-[0.55rem] font-black text-white/20 uppercase tracking-widest whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(t => (
                <tr key={t.id} className="border-b border-white/5 hover:bg-white/2 transition-all">
                  <td className="px-5 py-3 text-teal-400 text-xs font-black">{t.id}</td>
                  <td className="px-5 py-3 text-white/60 text-xs font-medium">{t.user}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs font-black capitalize ${typeColors[t.type]}`}>{t.type}</span>
                  </td>
                  <td className="px-5 py-3 text-white font-black text-xs">₦{t.amount.toLocaleString()}</td>
                  <td className="px-5 py-3 text-white/40 text-xs font-medium">{t.method}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-1 rounded-lg text-[0.55rem] font-black uppercase tracking-widest ${statusColors[t.status]}`}>{t.status}</span>
                  </td>
                  <td className="px-5 py-3 text-white/30 text-xs whitespace-nowrap">{t.date}</td>
                  <td className="px-5 py-3">
                    <div className="flex gap-2">
                      {t.status === 'pending' && (
                        <>
                          <button onClick={() => setTxns(x => x.map(r => r.id === t.id ? { ...r, status: 'success' } : r))} className="w-7 h-7 rounded-lg bg-green-500/15 text-green-400 flex items-center justify-center hover:bg-green-500/30 transition-all" title="Approve">
                            <CheckCircle className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => setTxns(x => x.map(r => r.id === t.id ? { ...r, status: 'failed' } : r))} className="w-7 h-7 rounded-lg bg-red-500/15 text-red-400 flex items-center justify-center hover:bg-red-500/30 transition-all" title="Reject">
                            <XCircle className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}
                      {t.status === 'failed' && (
                        <button className="w-7 h-7 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center hover:bg-blue-500/30 transition-all" title="Refund">
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
    </div>
  );
};

export default Transactions;
