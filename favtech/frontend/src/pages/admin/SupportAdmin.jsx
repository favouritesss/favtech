import React, { useState } from 'react';
import { MessageSquare, X, CheckCircle, Clock } from 'lucide-react';

const SupportAdmin = () => {
  const [tickets, setTickets] = useState([
    { id: 'TKT-001', user: 'favour_o', subject: 'Order #8489 not delivered', status: 'open', priority: 'high', date: '2026-04-08', replies: [] },
    { id: 'TKT-002', user: 'john_d', subject: 'Payment not reflecting', status: 'resolved', priority: 'medium', date: '2026-04-05', replies: [{ from: 'admin', msg: 'Resolved. Funds credited.', time: '2hr ago' }] },
    { id: 'TKT-003', user: 'biz_acct', subject: 'Need invoice for bulk orders', status: 'pending', priority: 'low', date: '2026-04-04', replies: [] },
  ]);
  const [selected, setSelected] = useState(null);
  const [reply, setReply] = useState('');

  const addReply = () => {
    if (!reply.trim()) return;
    setTickets(t => t.map(x => x.id === selected.id ? { ...x, status: 'resolved', replies: [...x.replies, { from: 'admin', msg: reply, time: 'Just now' }] } : x));
    setSelected(t => ({ ...t, status: 'resolved', replies: [...t.replies, { from: 'admin', msg: reply, time: 'Just now' }] }));
    setReply('');
  };

  const statusColors = { open: 'bg-amber-500/15 text-amber-400', resolved: 'bg-green-500/15 text-green-400', pending: 'bg-blue-500/15 text-blue-400' };
  const prioColors = { high: 'text-red-400', medium: 'text-amber-400', low: 'text-white/30' };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black text-white uppercase tracking-tight">Support Tickets</h1>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-3">
          {tickets.map(t => (
            <div key={t.id} onClick={() => setSelected(t)} className={`bg-[#0d1526] border rounded-2xl p-5 cursor-pointer hover:border-teal-500/30 transition-all ${selected?.id === t.id ? 'border-teal-500/30' : 'border-white/5'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-teal-400 font-black text-xs">{t.id}</span>
                <span className={`px-2 py-0.5 rounded-lg text-[0.55rem] font-black uppercase tracking-widest ${statusColors[t.status]}`}>{t.status}</span>
              </div>
              <p className="text-white font-bold text-sm mb-1">{t.subject}</p>
              <div className="flex items-center justify-between">
                <span className="text-white/30 text-xs">{t.user}</span>
                <span className={`text-[0.6rem] font-black ${prioColors[t.priority]}`}>{t.priority}</span>
              </div>
            </div>
          ))}
        </div>

        {selected ? (
          <div className="bg-[#0d1526] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-white font-black text-sm uppercase tracking-widest">{selected.id}</h2>
              <button onClick={() => setSelected(null)} className="text-white/30 hover:text-white"><X className="w-4 h-4" /></button>
            </div>
            <p className="text-white font-bold mb-1">{selected.subject}</p>
            <p className="text-white/30 text-xs mb-5">By: {selected.user} • {selected.date}</p>
            <div className="space-y-3 mb-5">
              {selected.replies.map((r, i) => (
                <div key={i} className={`p-4 rounded-xl ${r.from === 'admin' ? 'bg-teal-500/10 border border-teal-500/20' : 'bg-white/5'}`}>
                  <p className={`text-[0.6rem] font-black uppercase tracking-widest mb-1 ${r.from === 'admin' ? 'text-teal-400' : 'text-white/40'}`}>{r.from === 'admin' ? 'Support Team' : 'User'} • {r.time}</p>
                  <p className="text-white text-sm">{r.msg}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <textarea value={reply} onChange={e => setReply(e.target.value)} rows={3} placeholder="Type your reply..." className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm outline-none focus:border-teal-500/50 resize-none placeholder-white/20" />
            </div>
            <div className="flex gap-3 mt-3">
              <button onClick={addReply} className="flex-1 py-2.5 bg-teal-500 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-teal-400 transition-all">Reply & Resolve</button>
              <button onClick={() => setTickets(t => t.map(x => x.id === selected.id ? { ...x, status: 'resolved' } : x))} className="px-5 py-2.5 bg-green-500/15 text-green-400 font-black text-xs uppercase tracking-widest rounded-xl">Close</button>
            </div>
          </div>
        ) : (
          <div className="bg-[#0d1526] border border-white/5 rounded-2xl flex items-center justify-center p-16">
            <div className="text-center">
              <MessageSquare className="w-12 h-12 text-white/10 mx-auto mb-4" />
              <p className="text-white/20 text-xs font-bold uppercase tracking-widest">Select a ticket to view</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportAdmin;
