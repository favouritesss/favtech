import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { MessageSquare, Plus, Send, Clock, User, ShieldCheck, X } from 'lucide-react';
import { userService } from '../../services/api';

const SupportTickets = () => {
  const { user = {} } = useOutletContext() || {};
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [newTicket, setNewTicket] = useState({ subject: '', message: '', priority: 'medium' });
  const [reply, setReply] = useState('');

  const fetchTickets = async () => {
    try {
      const res = await userService.getTickets();
      setTickets(res.data);
    } catch (err) {
      console.error('Failed to fetch tickets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await userService.createTicket(newTicket);
      setShowCreate(false);
      setNewTicket({ subject: '', message: '', priority: 'medium' });
      fetchTickets();
    } catch (err) {
      alert('Failed to create ticket');
    }
  };

  const statusColors = {
    open: 'bg-green-100 text-green-700',
    pending: 'bg-amber-100 text-amber-700',
    resolved: 'bg-blue-100 text-blue-700',
    closed: 'bg-slate-100 text-slate-500',
  };

  if (loading) return <div className="p-20 text-center text-navy/20 uppercase font-black text-xs tracking-widest">Accessing Support Hub...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-navy uppercase tracking-tight">Support Tickets</h1>
          <p className="text-sm text-slate-400 font-medium">Need help? Join the conversation with our agents.</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 px-6 py-3 bg-teal-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-teal-400 transition-all shadow-xl shadow-teal-500/20">
          <Plus className="w-4 h-4" /> New Ticket
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Ticket List */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest px-1">Inbox</h2>
          {tickets.length === 0 ? (
            <div className="p-10 border-2 border-dashed border-slate-100 rounded-3xl text-center">
              <MessageSquare className="w-12 h-12 text-slate-100 mx-auto mb-4" />
              <p className="font-black text-navy text-xs uppercase">No conversations</p>
            </div>
          ) : (
            tickets.map(t => (
              <button
                key={t.id}
                onClick={() => setSelectedTicket(t)}
                className={`w-full text-left p-5 rounded-3xl border transition-all relative overflow-hidden group
                  ${selectedTicket?.id === t.id ? 'bg-navy border-navy text-white shadow-xl shadow-navy/20' : 'bg-white border-slate-100 hover:border-teal-300'}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`px-2 py-0.5 rounded-lg text-[0.5rem] font-black uppercase tracking-widest ${selectedTicket?.id === t.id ? 'bg-white/10 text-white' : statusColors[t.status]}`}>
                    {t.status}
                  </span>
                  <span className={`text-[0.6rem] font-medium ${selectedTicket?.id === t.id ? 'text-white/40' : 'text-slate-400'}`}>
                    {new Date(t.created_at).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="font-bold text-sm mb-1 line-clamp-1">{t.subject}</h3>
                <p className={`text-[0.65rem] line-clamp-1 ${selectedTicket?.id === t.id ? 'text-white/40' : 'text-slate-400'}`}>
                  Ticket ID: #{t.id} • {t.priority.toUpperCase()} Priority
                </p>
              </button>
            ))
          )}
        </div>

        {/* Conversation View */}
        <div className="lg:col-span-2 bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
          {selectedTicket ? (
            <>
              <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-navy text-sm uppercase tracking-tight">{selectedTicket.subject}</h3>
                    <p className="text-[0.65rem] text-slate-400 font-bold uppercase tracking-widest">Active Investigation</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-[0.6rem] font-black uppercase tracking-widest ${statusColors[selectedTicket.status]}`}>
                  {selectedTicket.status}
                </span>
              </div>

              <div className="flex-1 p-6 space-y-6 overflow-y-auto bg-slate-50/30">
                {/* Initial Query */}
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center text-white text-xs font-bold">
                    {user?.name?.charAt(0) || <User className="w-4 h-4" />}
                  </div>
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm max-w-[80%]">
                    <p className="text-sm text-slate-600 leading-relaxed">I am experiencing delays with my Instagram followers order. Could you please check the status?</p>
                    <p className="text-[0.6rem] text-slate-400 font-bold mt-2">SENT AT {new Date(selectedTicket.created_at).toLocaleTimeString()}</p>
                  </div>
                </div>

                {/* System/Agent Response */}
                <div className="flex gap-4 items-start flex-row-reverse">
                  <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="bg-teal-500 text-white p-4 rounded-2xl rounded-tr-none shadow-lg shadow-teal-500/10 max-w-[80%]">
                    <p className="text-sm leading-relaxed font-medium">Hello! Our team is currently reviewing your order with the provider. We will update you shortly.</p>
                    <p className="text-[0.6rem] text-white/50 font-bold mt-2 text-right">AGENT • JUST NOW</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white border-t border-slate-50">
                <div className="relative">
                  <input
                    placeholder="Type your response..."
                    value={reply}
                    onChange={e => setReply(e.target.value)}
                    className="w-full pl-6 pr-14 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium text-navy outline-none focus:border-teal-400 transition-all"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-teal-500 text-white rounded-xl flex items-center justify-center hover:bg-teal-400 transition-all shadow-lg shadow-teal-500/20">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-12">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                <MessageSquare className="w-10 h-10 text-slate-200" />
              </div>
              <h3 className="font-black text-navy text-base uppercase tracking-widest mb-2">Select a Conversation</h3>
              <p className="text-sm text-slate-400 font-medium max-w-[250px]">Choose a ticket from the left or create a new one to speak with an agent.</p>
            </div>
          )}
        </div>
      </div>

      {/* Create Ticket Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/60 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] border border-white/20 w-full max-w-lg shadow-2xl overflow-hidden scale-in-center">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-black text-navy text-lg uppercase tracking-tight">Create New Ticket</h3>
              <button onClick={() => setShowCreate(false)} className="text-slate-300 hover:text-navy transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleCreate} className="p-8 space-y-6">
              <div>
                <label className="block text-[0.65rem] font-black text-slate-400 uppercase tracking-widest mb-3">Topic / Subject</label>
                <input
                  required
                  value={newTicket.subject}
                  onChange={e => setNewTicket(n => ({ ...n, subject: e.target.value }))}
                  placeholder="e.g. Order #123 Delay"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-navy outline-none focus:border-teal-400"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {['low', 'medium', 'high'].map(p => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setNewTicket(n => ({ ...n, priority: p }))}
                    className={`py-3 rounded-xl text-[0.6rem] font-black uppercase tracking-widest border transition-all
                      ${newTicket.priority === p ? 'bg-navy text-white border-navy' : 'bg-white text-slate-400 border-slate-100 hover:border-navy'}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-[0.65rem] font-black text-slate-400 uppercase tracking-widest mb-3">Your Message</label>
                <textarea
                  required
                  rows="4"
                  value={newTicket.message}
                  onChange={e => setNewTicket(n => ({ ...n, message: e.target.value }))}
                  placeholder="Provide as much detail as possible..."
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium text-navy outline-none focus:border-teal-400 resize-none"
                ></textarea>
              </div>
              <button type="submit" className="w-full py-4 bg-teal-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-teal-400 transition-all shadow-xl shadow-teal-500/20">
                Submit Ticket
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportTickets;
