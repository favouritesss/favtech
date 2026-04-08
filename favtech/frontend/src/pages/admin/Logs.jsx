import React, { useState } from 'react';
import { 
  Activity, Shield, User, ShoppingBag, 
  AlertTriangle, CheckCircle, Info, XCircle, 
  Search, Filter, Download, Terminal, 
  Cpu, Database, Clock
} from 'lucide-react';

const LogItem = ({ type, action, detail, user, time, status }) => {
  const icons = {
    auth: Shield,
    order: ShoppingBag,
    user: User,
    system: Cpu,
    db: Database,
  };
  
  const statusColors = {
    success: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    error: 'bg-red-500/10 text-red-400 border-red-500/20',
    info: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  };

  const Icon = icons[type] || Info;

  return (
    <div className="flex items-center gap-4 p-4 bg-white/2 hover:bg-white/5 border border-white/5 rounded-2xl transition-all group">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${statusColors[status]} border`}>
        <Icon className="w-5 h-5" />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-white font-black text-xs uppercase tracking-widest">{action}</span>
          <span className={`px-1.5 py-0.5 rounded-lg text-[0.5rem] font-black uppercase tracking-widest border ${statusColors[status]}`}>
            {status}
          </span>
        </div>
        <p className="text-white/40 text-[0.65rem] font-medium truncate">{detail}</p>
      </div>

      <div className="text-right flex-shrink-0 hidden sm:block">
        <p className="text-white/60 text-xs font-bold font-mono lowercase tracking-tighter">@{user}</p>
        <p className="text-white/20 text-[0.55rem] font-bold uppercase mt-1 flex items-center justify-end gap-1">
          <Clock className="w-2.5 h-2.5" /> {time}
        </p>
      </div>
    </div>
  );
};

const Logs = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const logs = [
    { type: 'auth', action: 'Admin Login', detail: 'Successful login from IP 192.168.1.45 (Lagos, Nigeria)', user: 'admin', time: '2m ago', status: 'success' },
    { type: 'order', action: 'API Error', detail: 'Voke API returned 402 Payment Required for Order #8441', user: 'system', time: '15m ago', status: 'error' },
    { type: 'user', action: 'User Update', detail: 'Changed balance for user king_favour (REF: WALLET_TOPUP)', user: 'admin', time: '22m ago', status: 'success' },
    { type: 'system', action: 'Backup Success', detail: 'Full database backup stored in Cloud Storage (S3-Lagos-Primary)', user: 'system', time: '1h ago', status: 'success' },
    { type: 'db', action: 'Query Warning', detail: 'Slow query detected on table "orders": Execution time 1.2s', user: 'db_monitor', time: '3h ago', status: 'warning' },
    { type: 'auth', action: 'Pass Reset', detail: 'Password reset link sent to user jessica_p@example.com', user: 'system', time: '4h ago', status: 'info' },
    { type: 'system', action: 'SMTP Delay', detail: 'Email delivery delay of 45s detected in queue', user: 'smtp_relay', time: '6h ago', status: 'warning' },
    { type: 'order', action: 'Refund Issued', detail: 'Refund of ₦4,500 issued for cancelled order #8410', user: 'support_admin', time: '8h ago', status: 'success' },
    { type: 'auth', action: 'Block IP', detail: 'IP 45.2.1.2 blocked after 15 failed login attempts', user: 'security_bot', time: '12h ago', status: 'error' },
    { type: 'user', action: 'New Manager', detail: 'Assigned "Support Agent" role to user micheal_t', user: 'admin', time: '14h ago', status: 'success' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tight">System Logs</h1>
          <p className="text-white/30 text-sm font-medium mt-1">Real-time audit trails and activity monitoring</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-[0.6rem] font-black uppercase tracking-widest transition-all">
            <Download className="w-3.5 h-3.5" /> Export CSV
          </button>
          <button className="flex items-center gap-2 px-5 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-[0.6rem] font-black uppercase tracking-widest transition-all">
            <XCircle className="w-3.5 h-3.5" /> Clear Audit
          </button>
        </div>
      </div>

      {/* Control Bar */}
      <div className="grid lg:grid-cols-4 gap-4 p-6 bg-[#0d1526] border border-white/5 rounded-3xl">
        <div className="lg:col-span-2 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
          <input 
            type="text" 
            placeholder="SEARCH LOGS, ACTIONS, OR DETAILS..."
            className="w-full bg-white/5 border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-white text-[0.65rem] font-black uppercase tracking-widest focus:border-teal-500/50 outline-none transition-all placeholder:text-white/10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
          <select 
            className="w-full bg-white/5 border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-white text-[0.65rem] font-black uppercase tracking-widest focus:border-teal-500/50 outline-none transition-all appearance-none"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">ALL ENTITIES</option>
            <option value="auth">SECURITY</option>
            <option value="order">FINANCIAL</option>
            <option value="user">USER MGMT</option>
            <option value="system">INFRASTRUCTURE</option>
          </select>
        </div>
        <button className="flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-white rounded-2xl text-[0.6rem] font-black uppercase tracking-widest transition-all p-3 shadow-lg shadow-teal-500/20">
          <Terminal className="w-4 h-4" /> Go Live
        </button>
      </div>

      {/* Logs Feed */}
      <div className="bg-[#0d1526] border border-white/5 rounded-3xl overflow-hidden p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-teal-400" />
            <h3 className="text-white font-black text-sm uppercase tracking-widest">Audit Trail</h3>
          </div>
          <span className="px-3 py-1 bg-white/5 rounded-lg text-[0.55rem] font-black text-white/30 uppercase tracking-widest">
            Showing last 100 entries
          </span>
        </div>

        <div className="space-y-3">
          {logs.map((log, index) => (
            <LogItem key={index} {...log} />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button className="text-white/20 hover:text-teal-400 text-[0.6rem] font-black uppercase tracking-widest transition-all border border-white/5 px-6 py-3 rounded-2xl hover:bg-teal-500/5 hover:border-teal-500/20">
            Load Historical Logs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logs;
