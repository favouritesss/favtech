import React, { useState, useEffect } from 'react';
import { Save, Mail, TestTube, CheckCircle, RefreshCw, AlertCircle, XCircle } from 'lucide-react';
import { adminService } from '../../services/api';

const SMTPSettings = () => {
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await adminService.getSettings();
      setForm(res.data);
    } catch (err) {
      showMsg('error', 'Failed to load SMTP config');
    } finally {
      setLoading(false);
    }
  };

  const showMsg = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 4000);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await adminService.updateSettings(form);
      showMsg('success', 'SMTP Settings updated!');
    } catch (err) {
      showMsg('error', 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  const handleTest = async () => {
    const testEmail = prompt("Enter email address to send test to:", form.support_email);
    if (!testEmail) return;

    try {
      setTesting(true);
      await adminService.testEmail({ email: testEmail });
      showMsg('success', `Test email sent to ${testEmail}`);
    } catch (err) {
      showMsg('error', err.response?.data?.error || 'Test failed');
    } finally {
      setTesting(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-64">
      <RefreshCw className="w-8 h-8 text-teal-400 animate-spin" />
    </div>
  );

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tight">SMTP / Gateway</h1>
          <p className="text-white/30 text-xs font-medium mt-1">Configure global email delivery protocols</p>
        </div>
        {message.text && (
            <div className={`px-4 py-2 rounded-xl flex items-center gap-2 animate-in fade-in slide-in-from-right-4 
              ${message.type === 'success' ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
              {message.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
              <span className="text-[0.65rem] font-bold uppercase tracking-widest">{message.text}</span>
            </div>
          )}
      </div>

      <div className="bg-[#0d1526] border border-white/5 rounded-[2rem] p-8 space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { label: 'SMTP Host', key: 'smtp_host', placeholder: 'smtp.gmail.com' },
            { label: 'Port', key: 'smtp_port', placeholder: '587' },
            { label: 'Username', key: 'smtp_user', placeholder: 'apikey@sendgrid.com' },
            { label: 'Password', key: 'smtp_pass', placeholder: '••••••••', type: 'password' },
          ].map(f => (
            <div key={f.key}>
              <label className="text-white/20 text-[0.6rem] font-black uppercase tracking-widest block mb-2">{f.label}</label>
              <input 
                type={f.type || 'text'} 
                value={form[f.key] || ''} 
                onChange={e => setForm(x => ({ ...x, [f.key]: e.target.value }))} 
                placeholder={f.placeholder}
                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white text-sm outline-none focus:border-teal-500/50" 
              />
            </div>
          ))}

          <div>
            <label className="text-white/20 text-[0.6rem] font-black uppercase tracking-widest block mb-2">Encryption Method</label>
            <select 
              value={form.smtp_encryption} 
              onChange={e => setForm(x => ({ ...x, smtp_encryption: e.target.value }))}
              className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white text-sm outline-none cursor-pointer"
            >
              <option value="none" className="bg-slate-900">None (Plain Text)</option>
              <option value="ssl" className="bg-slate-900">SSL (Port 465)</option>
              <option value="tls" className="bg-slate-900">TLS (Port 587)</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 pt-4">
          <button 
            onClick={handleTest} 
            disabled={testing}
            className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-white/5 hover:bg-white/10 text-white font-black text-[0.65rem] uppercase tracking-widest rounded-2xl border border-white/10 transition-all disabled:opacity-50"
          >
            {testing ? <RefreshCw className="w-5 h-5 animate-spin" /> : <TestTube className="w-5 h-5" />}
            {testing ? 'Verifying...' : 'Test Connection'}
          </button>
          
          <button 
            onClick={handleSave} 
            disabled={saving}
            className="flex-1 flex items-center justify-center gap-3 px-10 py-4 bg-teal-500 hover:bg-teal-400 text-white font-black text-[0.65rem] uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-teal-500/20 disabled:opacity-50"
          >
            {saving ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            {saving ? 'Syncing...' : 'Apply SMTP Config'}
          </button>
        </div>
      </div>

      <div className="p-6 bg-amber-500/5 border border-amber-500/20 rounded-2xl flex items-start gap-4">
        <AlertCircle className="w-6 h-6 text-amber-500 flex-shrink-0" />
        <div>
          <p className="text-amber-500 text-[0.65rem] font-black uppercase tracking-widest">Configuration Note</p>
          <p className="text-white/40 text-[0.6rem] mt-1 leading-relaxed">
            Using Gmail? Make sure to use an "App Password" rather than your main account password. Two-factor authentication must be enabled on your Google account first.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SMTPSettings;
