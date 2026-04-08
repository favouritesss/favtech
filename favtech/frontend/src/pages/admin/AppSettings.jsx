import React, { useState, useEffect } from 'react';
import { 
  Save, Upload, Palette, Globe, AlertTriangle, 
  RefreshCw, CheckCircle2, ShieldAlert, Layers,
  CreditCard, Mail, Lock, ShieldCheck, Server
} from 'lucide-react';
import { useBrand } from '../../context/BrandContext';
import { adminService } from '../../services/api';
import { useAdminTheme } from '../../context/AdminThemeContext';

const AppSettings = () => {
  const { refreshSettings } = useBrand();
  const { isDarkMode } = useAdminTheme();
  const [form, setForm] = useState({
    site_name: '',
    site_title: '',
    support_email: '',
    google_client_id: '',
    google_client_secret: '',
    currency_symbol: '₦',
    currency_code: 'NGN',
    enable_registration: true,
    maintenance_mode: false,
    site_domain: '',
    voke_api_url: '',
    voke_api_key: '',
    global_margin: 0,
    paystack_public_key: '',
    paystack_secret_key: '',
    paystack_enabled: true,
    smtp_host: '',
    smtp_port: 587,
    smtp_user: '',
    smtp_pass: '',
    smtp_encryption: 'tls',
    minimum_deposit: 0,
    referral_commission: 0,
    logo_url: null
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [tab, setTab] = useState('general');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await adminService.getSettings();
      if (res?.data) {
        setForm(f => ({ ...f, ...res.data }));
      }
    } catch (err) {
      showMsg('error', 'Failed to load settings');
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
      await refreshSettings();
      showMsg('success', 'System parameters synchronized!');
    } catch (err) {
      showMsg('error', 'Update failed. Check system logs.');
    } finally {
      setSaving(false);
    }
  };

  const handleTestEmail = async () => {
    const email = prompt('Enter recipient email for SMTP test:');
    if (!email) return;

    try {
      setSaving(true);
      await adminService.testEmail({ email });
      showMsg('success', 'Test email dispatched successfully!');
    } catch (err) {
      showMsg('error', err.response?.data?.error || 'Mailing node failure.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('logo', file);

    try {
      setUploading(true);
      const res = await adminService.uploadLogo(formData);
      setForm(prev => ({ ...prev, logo_url: res.data.logoUrl }));
      await refreshSettings();
      showMsg('success', 'Corporate identity updated!');
    } catch (err) {
      showMsg('error', err.response?.data?.error || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
      <RefreshCw className="w-10 h-10 text-teal-400 animate-spin" />
      <p style={{ color: 'var(--admin-text-muted)' }} className="text-[0.6rem] font-black uppercase tracking-[0.4em]">Syncing Master Config...</p>
    </div>
  );

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight" style={{ color: 'var(--admin-text-primary)' }}>System Control</h1>
          <p style={{ color: 'var(--admin-text-secondary)' }} className="text-xs font-medium mt-1">Centralized platform architecture & gateway management</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          {message.text && (
            <div className={`px-5 py-2.5 rounded-2xl flex items-center gap-2 animate-in fade-in slide-in-from-right-4 
              ${message.type === 'success' ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-[0.7rem] font-black uppercase tracking-widest">{message.text}</span>
            </div>
          )}
          <button 
            onClick={handleSave} 
            disabled={saving}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-4 bg-teal-500 text-white font-black text-[0.7rem] uppercase tracking-widest rounded-[1.5rem] hover:bg-teal-400 disabled:opacity-50 transition-all shadow-xl shadow-teal-500/25 active:scale-95"
          >
            {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Syncing...' : 'Apply Changes'}
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 p-1 border rounded-[2rem] w-fit" style={{ backgroundColor: 'var(--admin-card-bg)', borderColor: 'var(--admin-border)' }}>
        {[
          { id: 'general', label: 'Identity', icon: Globe },
          { id: 'branding', label: 'Branding', icon: Palette },
          { id: 'gateways', label: 'Gateways', icon: CreditCard },
          { id: 'mailing', label: 'Mailing', icon: Mail },
          { id: 'operations', label: 'API Node', icon: Server },
          { id: 'economics', label: 'Budget', icon: ShieldAlert }
        ].map(t => (
          <button 
            key={t.id} 
            onClick={() => setTab(t.id)} 
            className={`flex items-center gap-2 px-6 py-3 rounded-[1.5rem] text-[0.65rem] font-black uppercase tracking-widest transition-all
              ${tab === t.id ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/20' : 'hover:bg-gray-500/5'}`}
            style={{ color: tab === t.id ? '' : 'var(--admin-text-muted)' }}
          >
            <t.icon className="w-4 h-4" />
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {tab === 'general' && (
            <div className="border rounded-[3rem] p-10 space-y-8" style={{ backgroundColor: 'var(--admin-card-bg)', borderColor: 'var(--admin-border)' }}>
               <h2 className="font-black text-sm uppercase tracking-widest flex items-center gap-3" style={{ color: 'var(--admin-text-primary)' }}>
                 <Globe className="w-5 h-5 text-teal-400" /> Platform Identity
               </h2>
               <div className="grid md:grid-cols-2 gap-8">
                 <div className="space-y-2">
                   <label style={{ color: 'var(--admin-text-muted)' }} className="text-[0.65rem] font-black uppercase tracking-widest ml-1">Site Title</label>
                   <input value={form?.site_name} onChange={e => setForm(f => ({ ...f, site_name: e.target.value }))} className="w-full px-6 py-5 border rounded-3xl text-sm outline-none font-bold" style={{ backgroundColor: 'var(--admin-bg)', borderColor: 'var(--admin-border)', color: 'var(--admin-text-primary)' }} />
                 </div>
                 <div className="space-y-2">
                   <label style={{ color: 'var(--admin-text-muted)' }} className="text-[0.65rem] font-black uppercase tracking-widest ml-1">SEO Descriptor</label>
                   <input value={form?.site_title} onChange={e => setForm(f => ({ ...f, site_title: e.target.value }))} className="w-full px-6 py-5 border rounded-3xl text-sm outline-none" style={{ backgroundColor: 'var(--admin-bg)', borderColor: 'var(--admin-border)', color: 'var(--admin-text-primary)' }} />
                 </div>
               </div>
               <div className="grid md:grid-cols-2 gap-8">
                 <div className="space-y-2">
                   <label style={{ color: 'var(--admin-text-muted)' }} className="text-[0.65rem] font-black uppercase tracking-widest ml-1">Google Client ID</label>
                   <input value={form?.google_client_id} onChange={e => setForm(f => ({ ...f, google_client_id: e.target.value }))} className="w-full px-6 py-4 border rounded-2xl text-xs outline-none font-mono" style={{ backgroundColor: 'var(--admin-bg)', borderColor: 'var(--admin-border)', color: 'var(--admin-text-primary)' }} />
                 </div>
                 <div className="space-y-2">
                   <label style={{ color: 'var(--admin-text-muted)' }} className="text-[0.65rem] font-black uppercase tracking-widest ml-1">Google Secret</label>
                   <input type="password" value={form?.google_client_secret} onChange={e => setForm(f => ({ ...f, google_client_secret: e.target.value }))} className="w-full px-6 py-4 border rounded-2xl text-xs outline-none font-mono" style={{ backgroundColor: 'var(--admin-bg)', borderColor: 'var(--admin-border)', color: 'var(--admin-text-primary)' }} />
                 </div>
               </div>
               <div className="grid md:grid-cols-2 gap-8 pt-4">
                  <div className={`p-6 rounded-[2rem] border transition-all ${form?.enable_registration ? 'border-teal-500/40 bg-teal-500/5' : 'border-gray-500/10'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-black text-[0.7rem] uppercase tracking-widest" style={{ color: 'var(--admin-text-primary)' }}>Registrar Access</span>
                      <button onClick={() => setForm(f => ({ ...f, enable_registration: !f.enable_registration }))} className={`w-12 h-6 rounded-full relative transition-all ${form?.enable_registration ? 'bg-teal-500' : 'bg-gray-400'}`}>
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${form?.enable_registration ? 'left-7' : 'left-1'}`} />
                      </button>
                    </div>
                    <p style={{ color: 'var(--admin-text-secondary)' }} className="text-[0.6rem] font-medium leading-relaxed">Toggle public account generation nodes.</p>
                  </div>
                  <div className={`p-6 rounded-[2rem] border transition-all ${form?.maintenance_mode ? 'border-red-500/40 bg-red-500/5' : 'border-gray-500/10'}`}>
                     <div className="flex items-center justify-between mb-2">
                        <span className="text-red-400 font-black text-[0.7rem] uppercase tracking-widest">Mainframe Lock</span>
                        <button onClick={() => setForm(f => ({ ...f, maintenance_mode: !f.maintenance_mode }))} className={`w-12 h-6 rounded-full relative transition-all ${form?.maintenance_mode ? 'bg-red-500' : 'bg-gray-400'}`}>
                          <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${form?.maintenance_mode ? 'left-7' : 'left-1'}`} />
                        </button>
                     </div>
                     <p style={{ color: 'var(--admin-text-secondary)' }} className="text-[0.6rem] font-medium leading-relaxed">Engage maintenance protocols for all system nodes.</p>
                  </div>
               </div>
            </div>
          )}

          {tab === 'branding' && (
            <div className="border rounded-[3rem] p-10 space-y-10" style={{ backgroundColor: 'var(--admin-card-bg)', borderColor: 'var(--admin-border)' }}>
               <h2 className="font-black text-sm uppercase tracking-widest flex items-center gap-3" style={{ color: 'var(--admin-text-primary)' }}>
                 <Palette className="w-5 h-5 text-teal-400" /> Branding Architecture
               </h2>
               <div className="grid md:grid-cols-2 gap-10">
                 <div className="space-y-4">
                    <label style={{ color: 'var(--admin-text-muted)' }} className="text-[0.65rem] font-black uppercase tracking-widest ml-1">Vector Logo</label>
                    <div className="relative aspect-video border-2 border-dashed rounded-[2rem] flex items-center justify-center p-8 transition-all group overflow-hidden" style={{ backgroundColor: 'var(--admin-bg)', borderColor: 'var(--admin-border)' }}>
                      {form?.logo_url ? (
                        <div className="relative group/logo w-full h-full flex items-center justify-center">
                          <img src={`http://localhost:5000${form.logo_url}`} className="max-h-full object-contain" alt="Brand" />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/logo:opacity-100 transition-all flex items-center justify-center backdrop-blur-sm"><Upload className="w-8 h-8 text-white" /></div>
                        </div>
                      ) : (
                        <div className="text-center opacity-30"><Upload className="w-10 h-10 mx-auto mb-4" style={{ color: 'var(--admin-text-primary)' }} /><p style={{ color: 'var(--admin-text-primary)' }} className="text-[0.65rem] font-black uppercase tracking-widest">Upload Asset</p></div>
                      )}
                      <input type="file" accept="image/*" onChange={handleLogoUpload} disabled={uploading} className="absolute inset-0 opacity-0 cursor-pointer" />
                    </div>
                 </div>
                 <div className="space-y-6">
                    <div className="space-y-2">
                       <label style={{ color: 'var(--admin-text-muted)' }} className="text-[0.65rem] font-black uppercase tracking-widest">Currency Symbol</label>
                       <input value={form?.currency_symbol} onChange={e => setForm(f => ({ ...f, currency_symbol: e.target.value }))} className="w-full px-6 py-5 border rounded-2xl text-2xl font-black italic shadow-inner" style={{ backgroundColor: 'var(--admin-bg)', borderColor: 'var(--admin-border)', color: 'var(--admin-text-primary)' }} />
                    </div>
                    <div className="space-y-2">
                       <label style={{ color: 'var(--admin-text-muted)' }} className="text-[0.65rem] font-black uppercase tracking-widest">Global ISO Code</label>
                       <input value={form?.currency_code} onChange={e => setForm(f => ({ ...f, currency_code: e.target.value }))} className="w-full px-6 py-4 border rounded-2xl text-sm font-black uppercase" style={{ backgroundColor: 'var(--admin-bg)', borderColor: 'var(--admin-border)', color: 'var(--admin-text-primary)' }} />
                    </div>
                 </div>
               </div>
            </div>
          )}

          {tab === 'gateways' && (
            <div className="border rounded-[3rem] p-10 space-y-8" style={{ backgroundColor: 'var(--admin-card-bg)', borderColor: 'var(--admin-border)' }}>
               <div className="flex items-center justify-between">
                  <h2 className="font-black text-sm uppercase tracking-widest flex items-center gap-3" style={{ color: 'var(--admin-text-primary)' }}>
                    <CreditCard className="w-5 h-5 text-teal-400" /> Paystack Gateway
                  </h2>
                  <button onClick={() => setForm(f => ({ ...f, paystack_enabled: !f.paystack_enabled }))} className={`px-4 py-2 rounded-xl text-[0.6rem] font-black uppercase tracking-[0.2em] transition-all border ${form?.paystack_enabled ? 'bg-teal-500 text-white border-teal-400' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                    {form?.paystack_enabled ? 'Active' : 'Offline'}
                  </button>
               </div>
               <div className="space-y-6">
                 <div className="space-y-2">
                    <label style={{ color: 'var(--admin-text-muted)' }} className="text-[0.65rem] font-black uppercase tracking-widest ml-1">Public Key (Live)</label>
                    <input value={form?.paystack_public_key} onChange={e => setForm(f => ({ ...f, paystack_public_key: e.target.value }))} className="w-full px-6 py-4 border rounded-2xl text-xs outline-none font-mono" style={{ backgroundColor: 'var(--admin-bg)', borderColor: 'var(--admin-border)', color: 'var(--admin-text-primary)' }} placeholder="pk_live_xxxxxxxxxxxxxxxxxxxxxxxxxx" />
                 </div>
                 <div className="space-y-2">
                    <label style={{ color: 'var(--admin-text-muted)' }} className="text-[0.65rem] font-black uppercase tracking-widest ml-1">Secret Key (Live)</label>
                    <input type="password" value={form?.paystack_secret_key} onChange={e => setForm(f => ({ ...f, paystack_secret_key: e.target.value }))} className="w-full px-6 py-4 border rounded-2xl text-xs outline-none font-mono" style={{ backgroundColor: 'var(--admin-bg)', borderColor: 'var(--admin-border)', color: 'var(--admin-text-primary)' }} placeholder="sk_live_xxxxxxxxxxxxxxxxxxxxxxxxxx" />
                 </div>
               </div>
               <div className="p-6 bg-amber-500/10 rounded-[1.5rem] border border-amber-500/20 flex gap-4">
                  <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0" />
                  <p className="text-[0.6rem] text-amber-400 font-medium leading-relaxed uppercase tracking-wider">Warning: Ensure your Paystack dashboard is set to 'Live' mode before applying these credentials. Webhook synchronization will be handled automatically.</p>
               </div>
            </div>
          )}

          {tab === 'mailing' && (
            <div className="border rounded-[3rem] p-10 space-y-8" style={{ backgroundColor: 'var(--admin-card-bg)', borderColor: 'var(--admin-border)' }}>
               <h2 className="font-black text-sm uppercase tracking-widest flex items-center gap-3" style={{ color: 'var(--admin-text-primary)' }}>
                 <Mail className="w-5 h-5 text-teal-400" /> SMTP Configuration
               </h2>
               <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 bg-teal-500/5 border border-teal-500/10 rounded-[1.5rem]">
                  <div>
                    <p className="font-black text-[0.6rem] uppercase tracking-widest text-teal-400">Diagnostic Hub</p>
                    <p style={{ color: 'var(--admin-text-secondary)' }} className="text-[0.55rem] font-medium leading-relaxed">Validate your SMTP credentials by sending a test dispatch.</p>
                  </div>
                  <button onClick={handleTestEmail} className="px-6 py-2.5 bg-teal-500 text-white font-black text-[0.6rem] uppercase tracking-widest rounded-xl hover:bg-teal-400 border border-teal-400 active:scale-95 shadow-lg shadow-teal-500/20">Test Dispatch</button>
               </div>
               <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                     <label style={{ color: 'var(--admin-text-muted)' }} className="text-[0.65rem] font-black uppercase tracking-widest ml-1">SMTP Host</label>
                     <input value={form?.smtp_host} onChange={e => setForm(f => ({ ...f, smtp_host: e.target.value }))} className="w-full px-6 py-4 border rounded-2xl text-xs outline-none" style={{ backgroundColor: 'var(--admin-bg)', borderColor: 'var(--admin-border)', color: 'var(--admin-text-primary)' }} placeholder="smtp.gmail.com" />
                  </div>
                  <div className="space-y-2">
                     <label style={{ color: 'var(--admin-text-muted)' }} className="text-[0.65rem] font-black uppercase tracking-widest ml-1">SMTP Port</label>
                     <input type="number" value={form?.smtp_port} onChange={e => setForm(f => ({ ...f, smtp_port: e.target.value }))} className="w-full px-6 py-4 border rounded-2xl text-xs outline-none" style={{ backgroundColor: 'var(--admin-bg)', borderColor: 'var(--admin-border)', color: 'var(--admin-text-primary)' }} />
                  </div>
               </div>
               <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                     <label style={{ color: 'var(--admin-text-muted)' }} className="text-[0.65rem] font-black uppercase tracking-widest ml-1">Username / Auth</label>
                     <input value={form?.smtp_user} onChange={e => setForm(f => ({ ...f, smtp_user: e.target.value }))} className="w-full px-6 py-4 border rounded-2xl text-xs outline-none" style={{ backgroundColor: 'var(--admin-bg)', borderColor: 'var(--admin-border)', color: 'var(--admin-text-primary)' }} />
                  </div>
                  <div className="space-y-2">
                     <label style={{ color: 'var(--admin-text-muted)' }} className="text-[0.65rem] font-black uppercase tracking-widest ml-1">Password / App Key</label>
                     <input type="password" value={form?.smtp_pass} onChange={e => setForm(f => ({ ...f, smtp_pass: e.target.value }))} className="w-full px-6 py-4 border rounded-2xl text-xs outline-none" style={{ backgroundColor: 'var(--admin-bg)', borderColor: 'var(--admin-border)', color: 'var(--admin-text-primary)' }} />
                  </div>
               </div>
               <div className="flex gap-4 p-2 border rounded-2xl w-fit" style={{ borderColor: 'var(--admin-border)', backgroundColor: 'var(--admin-bg)' }}>
                  {['ssl', 'tls', 'none'].map(enc => (
                    <button key={enc} onClick={() => setForm(f => ({ ...f, smtp_encryption: enc }))} className={`px-6 py-2 rounded-xl text-[0.6rem] font-black uppercase tracking-widest transition-all ${form?.smtp_encryption === enc ? 'bg-teal-500 text-white shadow-lg' : 'opacity-40 hover:opacity-100'}`}>{enc}</button>
                  ))}
               </div>
            </div>
          )}

          {tab === 'operations' && (
            <div className="border rounded-[3rem] p-10 space-y-8" style={{ backgroundColor: 'var(--admin-card-bg)', borderColor: 'var(--admin-border)' }}>
               <h2 className="font-black text-sm uppercase tracking-widest flex items-center gap-3" style={{ color: 'var(--admin-text-primary)' }}>
                 <Server className="w-5 h-5 text-teal-400" /> SMM API Node (Voke.io)
               </h2>
               <div className="space-y-6">
                 <div className="space-y-2">
                   <label style={{ color: 'var(--admin-text-muted)' }} className="text-[0.65rem] font-black uppercase tracking-widest ml-1">API Node URL</label>
                   <input value={form?.voke_api_url} onChange={e => setForm(f => ({ ...f, voke_api_url: e.target.value }))} className="w-full px-6 py-4 border rounded-2xl text-xs outline-none font-mono" style={{ backgroundColor: 'var(--admin-bg)', borderColor: 'var(--admin-border)', color: 'var(--admin-text-primary)' }} />
                 </div>
                 <div className="space-y-2">
                   <label style={{ color: 'var(--admin-text-muted)' }} className="text-[0.65rem] font-black uppercase tracking-widest ml-1">Master API Key</label>
                   <input type="password" value={form?.voke_api_key} onChange={e => setForm(f => ({ ...f, voke_api_key: e.target.value }))} className="w-full px-6 py-4 border rounded-2xl text-xs outline-none font-mono" style={{ backgroundColor: 'var(--admin-bg)', borderColor: 'var(--admin-border)', color: 'var(--admin-text-primary)' }} />
                 </div>
               </div>
               <div className="grid md:grid-cols-2 gap-8 pt-4">
                  <div className="p-6 rounded-[2rem] border" style={{ borderColor: 'var(--admin-border)', backgroundColor: 'var(--admin-bg)' }}>
                     <p style={{ color: 'var(--admin-text-primary)' }} className="text-[0.7rem] font-black uppercase tracking-widest mb-1">API Status: <span className="text-teal-400">SYNCED</span></p>
                     <p style={{ color: 'var(--admin-text-secondary)' }} className="text-[0.6rem] font-medium leading-relaxed">Real-time connection with Voke provider nodes is active.</p>
                  </div>
                  <div className="p-6 rounded-[2rem] border" style={{ borderColor: 'var(--admin-border)', backgroundColor: 'var(--admin-bg)' }}>
                     <p style={{ color: 'var(--admin-text-primary)' }} className="text-[0.7rem] font-black uppercase tracking-widest mb-1">Balance: <span className="text-yellow-500">$452.70</span></p>
                     <p style={{ color: 'var(--admin-text-secondary)' }} className="text-[0.6rem] font-medium leading-relaxed">Current available balance on your master API provider account.</p>
                  </div>
               </div>
            </div>
          )}

          {tab === 'economics' && (
            <div className="border rounded-[3rem] p-10 space-y-8" style={{ backgroundColor: 'var(--admin-card-bg)', borderColor: 'var(--admin-border)' }}>
               <h2 className="font-black text-sm uppercase tracking-widest flex items-center gap-3" style={{ color: 'var(--admin-text-primary)' }}>
                 <ShieldAlert className="w-5 h-5 text-teal-400" /> Economic Thresholds
               </h2>
               <div className="grid md:grid-cols-2 gap-10">
                 <div className="space-y-4">
                    <label style={{ color: 'var(--admin-text-muted)' }} className="text-[0.65rem] font-black uppercase tracking-widest ml-1">Master Profit Margin (%)</label>
                    <input type="number" value={form?.global_margin} onChange={e => setForm(f => ({ ...f, global_margin: e.target.value }))} className="w-full px-8 py-6 border rounded-3xl text-2xl font-black outline-none font-mono tracking-tighter shadow-inner" style={{ backgroundColor: 'var(--admin-bg)', borderColor: 'var(--admin-border)', color: 'var(--admin-text-primary)' }} />
                    <p style={{ color: 'var(--admin-text-secondary)' }} className="text-[0.55rem] font-medium leading-relaxed uppercase tracking-widest ml-1 italic">Applied automatically as a markup to all provider service rates.</p>
                 </div>
                 <div className="space-y-4">
                    <label style={{ color: 'var(--admin-text-muted)' }} className="text-[0.65rem] font-black uppercase tracking-widest ml-1">Referral Reward Cluster (%)</label>
                    <input type="number" value={form?.referral_commission} onChange={e => setForm(f => ({ ...f, referral_commission: e.target.value }))} className="w-full px-8 py-6 border rounded-3xl text-2xl font-black outline-none font-mono tracking-tighter shadow-inner" style={{ backgroundColor: 'var(--admin-bg)', borderColor: 'var(--admin-border)', color: 'var(--admin-text-primary)' }} />
                    <p style={{ color: 'var(--admin-text-secondary)' }} className="text-[0.55rem] font-medium leading-relaxed uppercase tracking-widest ml-1 italic">Calculated automatically on every successful deposit node.</p>
                 </div>
               </div>
               <div className="space-y-4">
                  <label style={{ color: 'var(--admin-text-muted)' }} className="text-[0.65rem] font-black uppercase tracking-widest ml-1">Min. Deposit Allowed ({form?.currency_symbol})</label>
                  <input type="number" value={form?.minimum_deposit} onChange={e => setForm(f => ({ ...f, minimum_deposit: e.target.value }))} className="px-8 py-4 border rounded-2xl text-xl font-black outline-none font-mono" style={{ backgroundColor: 'var(--admin-bg)', borderColor: 'var(--admin-border)', color: 'var(--admin-text-primary)' }} />
               </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-[3rem] p-10 text-white shadow-2xl shadow-teal-500/30 relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-6">Master Synchronization</h3>
              <p className="text-[0.7rem] font-medium leading-relaxed opacity-90 mb-8 font-mono">Platform cluster nodes are currently locked and synchronized with redundant MySQL master arrays.</p>
              <div className="space-y-5">
                {[
                  { label: 'Identity Node', status: 'LOCKED', icon: ShieldCheck },
                  { label: 'Gateway Node', status: 'ACTIVE', icon: Lock },
                  { label: 'API Cluster', status: 'SYNCED', icon: RefreshCw }
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-4 py-4 border-b border-white/10 last:border-0 group-hover:translate-x-1 transition-transform">
                    <item.icon className={`w-4 h-4 ${item.label === 'API Cluster' ? 'animate-spin' : ''}`} />
                    <span className="text-[0.65rem] font-black uppercase tracking-widest flex-1">{item.label}</span>
                    <span className="text-[0.55rem] font-black px-2 py-1 bg-white/10 rounded-lg">{item.status}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-[80px]" />
          </div>

          <div className="border rounded-[2.5rem] p-8 space-y-6" style={{ backgroundColor: 'var(--admin-header-bg)', borderColor: 'var(--admin-border)' }}>
             <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <p style={{ color: 'var(--admin-text-primary)' }} className="font-black text-[0.7rem] uppercase tracking-widest">Architectural Note</p>
             </div>
             <p style={{ color: 'var(--admin-text-secondary)' }} className="text-[0.65rem] font-medium leading-relaxed">System-wide modifications take effect across all edge nodes instantly. For advanced SSL or PORT config, access the CLI directly.</p>
             <button className="w-full py-3.5 border rounded-2xl text-[0.6rem] font-black uppercase tracking-widest transition-all hover:bg-teal-500 hover:text-white" style={{ borderColor: 'var(--admin-border)', color: 'var(--admin-text-primary)' }}>Terminal Documentation</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppSettings;
