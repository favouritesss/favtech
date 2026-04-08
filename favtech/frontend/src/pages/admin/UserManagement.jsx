import React, { useState, useEffect } from 'react';
import { Search, UserPlus, Shield, Ban, Trash2, Eye, Wallet, X } from 'lucide-react';
import { adminService } from '../../services/api';

const ROLES = ['user', 'admin', 'support', 'finance'];
const STATUSES = ['active', 'suspended', 'banned'];

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [modal, setModal] = useState(null); 
  const [walletAction, setWalletAction] = useState({ type: 'add', amount: '' });
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'user' });

  const fetchUsers = async () => {
    try {
      const response = await adminService.getUsers();
      setUsers(response.data);
    } catch (err) {
      console.error('Fetch error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateProfile = async (id, data) => {
    try {
      await adminService.updateUser(id, data);
      fetchUsers();
    } catch (err) {
      alert('Update failed');
    }
  };

  const applyWallet = async () => {
    if (!selectedUser || !walletAction.amount) return;
    const currentBalance = Number(selectedUser.wallet_balance || 0);
    const amount = Number(walletAction.amount);
    const newBal = walletAction.type === 'add' 
      ? currentBalance + amount 
      : Math.max(0, currentBalance - amount);
    
    await updateProfile(selectedUser.id, { ...selectedUser, wallet_balance: newBal });
    setModal(null);
    setWalletAction({ type: 'add', amount: '' });
  };

  const filtered = users.filter(u => {
    const matchSearch = String(u.name || '').toLowerCase().includes(search.toLowerCase()) || String(u.email || '').toLowerCase().includes(search.toLowerCase());
    const matchRole = filterRole === 'all' || u.role === filterRole;
    const matchStatus = filterStatus === 'all' || u.status === filterStatus;
    return matchSearch && matchRole && matchStatus;
  });

  const updateStatus = (id, status) => updateProfile(id, { ...users.find(u => u.id === id), status });
  const updateRole = (id, role) => updateProfile(id, { ...users.find(u => u.id === id), role });

  const statusColors = { active: 'bg-green-500/15 text-green-400', suspended: 'bg-amber-500/15 text-amber-400', banned: 'bg-red-500/15 text-red-400' };
  const roleColors = { admin: 'bg-violet-500/15 text-violet-400', user: 'bg-white/5 text-[var(--admin-text-muted)]', support: 'bg-blue-500/15 text-blue-400', finance: 'bg-teal-500/15 text-teal-400' };

  if (loading) return <div className="p-10 text-white/20 font-black uppercase tracking-widest text-center">Initalizing Database...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight" style={{ color: 'var(--admin-text-primary)' }}>User Management</h1>
          <p style={{ color: 'var(--admin-text-secondary)' }} className="text-xs font-medium mt-1">{users.length} total users registered</p>
        </div>
        <button onClick={() => setModal('add')} className="flex items-center gap-2 px-5 py-2.5 bg-teal-500 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-teal-400 transition-all">
          <UserPlus className="w-4 h-4" /> Add User
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl flex-1 min-w-[200px]" style={{ backgroundColor: 'var(--admin-card-bg)', border: '1px solid var(--admin-border)' }}>
          <Search className="w-4 h-4" style={{ color: 'var(--admin-text-muted)' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..." className="bg-transparent text-xs outline-none w-full" style={{ color: 'var(--admin-text-primary)' }} />
        </div>
        <select value={filterRole} onChange={e => setFilterRole(e.target.value)} className="px-4 py-2.5 rounded-xl text-xs outline-none" style={{ backgroundColor: 'var(--admin-card-bg)', border: '1px solid var(--admin-border)', color: 'var(--admin-text-secondary)' }}>
          <option value="all">All Roles</option>
          {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="px-4 py-2.5 rounded-xl text-xs outline-none" style={{ backgroundColor: 'var(--admin-card-bg)', border: '1px solid var(--admin-border)', color: 'var(--admin-text-secondary)' }}>
          <option value="all">All Status</option>
          {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="bg-[#0d1526] border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ borderBottom: '1px solid var(--admin-border)' }}>
              <tr>
                {['User', 'Role', 'Wallet', 'Orders', 'Status', 'Joined', 'Actions'].map(h => (
                  <th key={h} className="text-left px-5 py-4 text-[0.55rem] font-black uppercase tracking-widest whitespace-nowrap" style={{ color: 'var(--admin-text-muted)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u.id} className="border-b border-white/5 hover:bg-white/2 transition-all">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-teal-500/20 rounded-xl flex items-center justify-center text-teal-400 font-black text-xs flex-shrink-0">
                        {(u.name || 'U').charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-white font-bold text-xs">{u.name}</p>
                        <p className="text-white/30 text-[0.55rem]">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <select value={u.role} onChange={e => updateRole(u.id, e.target.value)} className={`px-2 py-1 rounded-lg text-[0.55rem] font-black uppercase tracking-widest border-0 outline-none cursor-pointer ${roleColors[u.role]}`} style={{ backgroundColor: 'transparent' }}>
                      {ROLES.map(r => <option key={r} value={r} className="bg-gray-900">{r}</option>)}
                    </select>
                  </td>
                  <td className="px-5 py-4 text-white/60 text-xs font-bold">₦{Number(u.wallet_balance || 0).toLocaleString()}</td>
                  <td className="px-5 py-4 text-white/60 text-xs font-bold">{u.orders || 0}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2 py-1 rounded-lg text-[0.55rem] font-black uppercase tracking-widest ${statusColors[u.status] || 'bg-white/5 text-white/20'}`}>{u.status}</span>
                  </td>
                  <td className="px-5 py-4 text-white/30 text-xs whitespace-nowrap">{new Date(u.created_at).toLocaleDateString()}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => { setSelectedUser(u); setModal('view'); }} className="w-7 h-7 rounded-lg bg-white/5 hover:bg-blue-500/20 hover:text-blue-400 text-white/40 flex items-center justify-center transition-all" title="View">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => { setSelectedUser(u); setModal('wallet'); }} className="w-7 h-7 rounded-lg bg-white/5 hover:bg-teal-500/20 hover:text-teal-400 text-white/40 flex items-center justify-center transition-all" title="Wallet">
                        <Wallet className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => updateStatus(u.id, u.status === 'active' ? 'suspended' : 'active')} className="w-7 h-7 rounded-lg bg-white/5 hover:bg-amber-500/20 hover:text-amber-400 text-white/40 flex items-center justify-center transition-all" title="Status Toggle">
                        <Ban className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0d1526] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <h3 className="text-white font-black text-sm uppercase tracking-widest">
                {modal === 'view' ? `${selectedUser?.name}` : modal === 'wallet' ? 'Wallet Control' : 'Add New User'}
              </h3>
              <button onClick={() => setModal(null)} className="text-white/30 hover:text-white"><X className="w-4 h-4" /></button>
            </div>

            {modal === 'view' && selectedUser && (
              <div className="p-6 space-y-4">
                {[
                  { l: 'Email', v: selectedUser.email },
                  { l: 'Role', v: selectedUser.role },
                  { l: 'Wallet Balance', v: `₦${Number(selectedUser.wallet_balance || 0).toLocaleString()}` },
                  { l: 'Status', v: selectedUser.status },
                  { l: 'Joined', v: new Date(selectedUser.created_at).toLocaleDateString() },
                ].map(i => (
                  <div key={i.l} className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-white/30 text-xs font-bold uppercase tracking-widest">{i.l}</span>
                    <span className="text-white text-xs font-black">{i.v}</span>
                  </div>
                ))}
              </div>
            )}

            {modal === 'wallet' && selectedUser && (
              <div className="p-6 space-y-5">
                <div className="p-4 bg-white/5 rounded-xl text-center">
                  <p className="text-white/30 text-xs font-bold uppercase tracking-widest">Current Balance</p>
                  <p className="text-white font-black text-2xl mt-1">₦{Number(selectedUser.wallet_balance || 0).toLocaleString()}</p>
                </div>
                <div className="flex gap-3">
                  {['add', 'deduct'].map(t => (
                    <button key={t} onClick={() => setWalletAction(a => ({ ...a, type: t }))} className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all
                      ${walletAction.type === t ? 'bg-teal-500 text-white' : 'bg-white/5 text-white/30'}`}>{t}</button>
                  ))}
                </div>
                <input type="number" placeholder="Amount (₦)" value={walletAction.amount} onChange={e => setWalletAction(a => ({ ...a, amount: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm outline-none placeholder-white/20 focus:border-teal-500/50" />
                <button onClick={applyWallet} className="w-full py-3 bg-teal-500 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-teal-400 transition-all">Apply</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
