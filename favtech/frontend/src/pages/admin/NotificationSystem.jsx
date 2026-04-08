import React, { useState } from 'react';
import { Bell, Send, Users, User } from 'lucide-react';

const NotificationSystem = () => {
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [target, setTarget] = useState('all');
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const logs = [
    { title: 'System Maintenance', msg: 'Scheduled maintenance on April 10, 2026', target: 'all', date: '2026-04-05 10:00', reach: 1284 },
    { title: 'New Feature: Threads', msg: 'You can now order Threads followers!', target: 'all', date: '2026-04-02 14:00', reach: 1284 },
    { title: 'Bonus Credits', msg: 'You have received ₦500 bonus!', target: 'user', date: '2026-03-28 09:00', reach: 320 },
  ];

  const handleSend = async () => {
    if (!title || !message) return;
    setSending(true);
    await new Promise(r => setTimeout(r, 1500));
    setSending(false);
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setTitle(''); setMessage('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white uppercase tracking-tight">Notification System</h1>
        <p className="text-white/30 text-xs font-medium mt-1">Send broadcasts and alerts to users</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Send Form */}
        <div className="bg-[#0d1526] border border-white/5 rounded-2xl p-6 space-y-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-teal-500/15 rounded-xl flex items-center justify-center">
              <Bell className="w-5 h-5 text-teal-400" />
            </div>
            <h2 className="text-white font-black text-sm uppercase tracking-widest">Send Broadcast</h2>
          </div>

          <div>
            <label className="text-white/30 text-[0.6rem] font-black uppercase tracking-widest block mb-2">Target Audience</label>
            <div className="flex gap-3">
              {[
                { value: 'all', label: 'All Users', icon: Users },
                { value: 'active', label: 'Active Only', icon: User },
              ].map(t => {
                const Icon = t.icon;
                return (
                  <button key={t.value} onClick={() => setTarget(t.value)} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border text-xs font-black uppercase tracking-widest transition-all
                    ${target === t.value ? 'border-teal-500 bg-teal-500/10 text-teal-400' : 'border-white/10 text-white/30 hover:text-white'}`}>
                    <Icon className="w-4 h-4" /> {t.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="text-white/30 text-[0.6rem] font-black uppercase tracking-widest block mb-2">Notification Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. New Feature Alert" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm outline-none focus:border-teal-500/50 placeholder-white/20" />
          </div>

          <div>
            <label className="text-white/30 text-[0.6rem] font-black uppercase tracking-widest block mb-2">Message</label>
            <textarea value={message} onChange={e => setMessage(e.target.value)} rows={4} placeholder="Enter your message to users..." className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm outline-none focus:border-teal-500/50 placeholder-white/20 resize-none" />
          </div>

          {sent && (
            <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-xl">
              <p className="text-green-400 text-xs font-bold">Broadcast sent successfully to {target === 'all' ? '1,284' : '892'} users!</p>
            </div>
          )}

          <button onClick={handleSend} disabled={sending || !title || !message} className="w-full py-3 bg-teal-500 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-teal-400 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
            {sending ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send className="w-4 h-4" />}
            {sending ? 'Sending...' : 'Send Broadcast'}
          </button>
        </div>

        {/* Sent History */}
        <div className="bg-[#0d1526] border border-white/5 rounded-2xl p-6">
          <h2 className="text-white font-black text-sm uppercase tracking-widest mb-5">Broadcast History</h2>
          <div className="space-y-4">
            {logs.map((l, i) => (
              <div key={i} className="p-4 bg-white/2 rounded-xl border border-white/5 hover:border-white/10 transition-all">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-white font-black text-sm">{l.title}</p>
                  <span className={`px-2 py-0.5 rounded-lg text-[0.5rem] font-black uppercase tracking-widest ${l.target === 'all' ? 'bg-teal-500/15 text-teal-400' : 'bg-blue-500/15 text-blue-400'}`}>{l.target}</span>
                </div>
                <p className="text-white/40 text-xs font-medium mb-3">{l.msg}</p>
                <div className="flex items-center justify-between">
                  <span className="text-white/20 text-[0.55rem] font-bold">{l.date}</span>
                  <span className="text-teal-400 text-[0.55rem] font-black">{l.reach.toLocaleString()} reached</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSystem;
