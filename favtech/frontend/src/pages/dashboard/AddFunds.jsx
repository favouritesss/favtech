import React, { useState, useEffect } from 'react';
import { CreditCard, Wallet, History, CheckCircle, Download, Search, Filter, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { userService } from '../../services/api';
import { useOutletContext } from 'react-router-dom';

const AddFunds = () => {
  const { user = {} } = useOutletContext() || {};
  const [amount, setAmount] = useState('');
  const [processing, setProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState('fund');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('All');

  const presets = [500, 1000, 2000, 5000, 10000, 20000];

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const res = await userService.getTransactions();
      setTransactions(res.data);
    } catch (err) {
      console.error('Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'history') {
      fetchTransactions();
    }
  }, [activeTab]);

  const handlePayment = async () => {
    if (!amount || Number(amount) < 100) return;
    setProcessing(true);
    try {
      const res = await userService.fundWallet({ amount, email: user.email });
      if (res.data.data.authorization_url) {
        window.location.href = res.data.data.authorization_url;
      }
    } catch (err) {
      alert('Payment initialization failed');
    } finally {
      setProcessing(false);
    }
  };

  const filteredTransactions = transactions.filter(t => {
    if (filter === 'All') return true;
    return t.status.toLowerCase() === filter.toLowerCase();
  });

  const downloadReceipt = (tx) => {
    // Mock receipt generation
    const content = `FAVTECH RECEIPT\nReference: ${tx.reference}\nAmount: ₦${tx.amount}\nType: ${tx.type}\nStatus: ${tx.status}\nDate: ${new Date(tx.created_at).toLocaleString()}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt_${tx.reference}.txt`;
    a.click();
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-navy uppercase tracking-tight">Finance / Wallet</h1>
          <p className="text-sm text-slate-400 font-medium">Fund your account and track your spending.</p>
        </div>
        <div className="hidden sm:flex items-center gap-4 p-3 bg-teal-50 rounded-2xl border border-teal-100">
           <Wallet className="w-5 h-5 text-teal-600" />
           <p className="text-xs font-black text-teal-700 uppercase tracking-widest">₦{Number(user.wallet_balance || 0).toLocaleString()}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl w-fit">
        {[
          { id: 'fund', label: 'Add Funds', icon: <CreditCard className="w-4 h-4" /> },
          { id: 'history', label: 'History', icon: <History className="w-4 h-4" /> }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex items-center gap-2 px-6 py-3 text-[0.65rem] font-black uppercase tracking-widest rounded-xl transition-all
              ${activeTab === t.id ? 'bg-white text-navy shadow-sm' : 'text-slate-400 hover:text-navy'}`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {activeTab === 'fund' ? (
        <div className="grid lg:grid-cols-3 gap-8">
           {/* Funding Card */}
           <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                 <div>
                    <h3 className="font-black text-navy text-sm uppercase tracking-widest mb-4">Select Investment Amount</h3>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                      {presets.map(p => (
                        <button
                          key={p}
                          onClick={() => setAmount(String(p))}
                          className={`py-4 rounded-xl border text-[0.65rem] font-black uppercase tracking-widest transition-all
                            ${amount === String(p) ? 'border-teal-400 bg-teal-50 text-teal-700 shadow-md shadow-teal-500/10' : 'border-slate-50 bg-slate-50/50 text-slate-400 hover:border-teal-300'}`}
                        >
                          ₦{p >= 1000 ? `${p/1000}k` : p}
                        </button>
                      ))}
                    </div>
                 </div>

                 <div className="relative group">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-slate-300 text-xl">₦</div>
                    <input 
                      type="number"
                      value={amount}
                      onChange={e => setAmount(e.target.value)}
                      placeholder="Enter custom amount..."
                      className="w-full pl-12 pr-6 py-6 bg-slate-50 border border-slate-100 rounded-3xl text-xl font-black text-navy outline-none focus:border-teal-400 focus:bg-white transition-all shadow-inner"
                    />
                 </div>

                 <button 
                   onClick={handlePayment}
                   disabled={processing || !amount || Number(amount) < 100}
                   className="w-full py-5 bg-teal-500 text-white font-black text-xs uppercase tracking-widest rounded-3xl hover:bg-teal-400 transition-all shadow-2xl shadow-teal-500/20 disabled:opacity-50 flex items-center justify-center gap-3"
                 >
                   {processing ? 'Connecting Gateway...' : <><CreditCard className="w-5 h-5" /> Secure Checkout</>}
                 </button>

                 <div className="flex items-center justify-center gap-6 opacity-30 grayscale hover:grayscale-0 transition-all">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/Paystack_Logo.png" alt="Paystack" className="h-6 object-contain" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Visa_2014_logo_detail.svg/2560px-Visa_2014_logo_detail.svg.png" alt="Visa" className="h-4 object-contain" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-4 object-contain" />
                 </div>
              </div>
           </div>

           {/* Info / Sidebar */}
           <div className="space-y-6">
              <div className="bg-navy p-8 rounded-[2.5rem] text-white">
                 <h3 className="font-black text-xs uppercase tracking-widest border-b border-white/10 pb-4 mb-4">Payment Logic</h3>
                 <div className="space-y-4">
                    {[
                      { label: 'Minimum', value: '₦100' },
                      { label: 'Maximum', value: '₦1.5M' },
                      { label: 'Fee', value: '0% (We pay fees)' },
                      { label: 'Process', value: 'Instant Sync' }
                    ].map(i => (
                      <div key={i.label} className="flex justify-between items-center">
                        <span className="text-[0.6rem] font-bold text-white/30 uppercase tracking-widest">{i.label}</span>
                        <span className="text-[0.65rem] font-black text-teal-400">{i.value}</span>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      ) : (
        /* History View */
        <div className="space-y-6">
           <div className="flex flex-wrap gap-3">
              {['All', 'Pending', 'Completed', 'Failed'].map(s => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`px-5 py-2.5 rounded-xl text-[0.6rem] font-black uppercase tracking-widest border transition-all
                    ${filter === s ? 'bg-navy text-white border-navy shadow-lg' : 'bg-white text-slate-400 border-slate-100 hover:border-navy'}`}
                >
                  {s}
                </button>
              ))}
           </div>

           <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    {['Activity', 'Reference', 'Value', 'Status', 'Action'].map(h => (
                      <th key={h} className="text-left px-8 py-5 text-[0.55rem] font-black text-slate-400 uppercase tracking-widest">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {loading ? (
                    <tr><td colSpan={5} className="py-20 text-center text-xs font-black uppercase text-slate-300">Syncing ledger...</td></tr>
                  ) : filteredTransactions.length === 0 ? (
                    <tr><td colSpan={5} className="py-20 text-center text-xs font-black uppercase text-slate-300">No activity logged</td></tr>
                  ) : filteredTransactions.map(t => (
                    <tr key={t.id} className="hover:bg-slate-50/50 transition-all">
                      <td className="px-8 py-5 flex items-center gap-4">
                         <div className={`w-9 h-9 rounded-xl flex items-center justify-center
                            ${t.type === 'deposit' ? 'bg-teal-50 text-teal-500' : 'bg-red-50 text-red-500'}`}>
                            {t.type === 'deposit' ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                         </div>
                         <div>
                            <p className="text-[0.65rem] font-black uppercase text-navy">{t.type}</p>
                            <p className="text-[0.55rem] font-bold text-slate-400">{new Date(t.created_at).toLocaleDateString()}</p>
                         </div>
                      </td>
                      <td className="px-8 py-5 font-mono text-[0.6rem] text-slate-400 uppercase">{t.reference}</td>
                      <td className="px-8 py-5 font-black text-navy text-xs">₦{Number(t.amount).toLocaleString()}</td>
                      <td className="px-8 py-5">
                         <span className={`px-2.5 py-1 rounded-lg text-[0.55rem] font-black uppercase tracking-widest
                            ${t.status === 'completed' ? 'bg-green-100 text-green-700' : t.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                            {t.status}
                         </span>
                      </td>
                      <td className="px-8 py-5">
                         {t.status === 'completed' && (
                           <button onClick={() => downloadReceipt(t)} className="w-8 h-8 rounded-lg bg-slate-100 text-slate-400 flex items-center justify-center hover:bg-navy hover:text-white transition-all shadow-sm">
                             <Download className="w-3.5 h-3.5" />
                           </button>
                         )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
           </div>
        </div>
      )}
    </div>
  );
};

export default AddFunds;
