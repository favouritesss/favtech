import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Zap, Link as LinkIcon, Hash, Star, Clock } from 'lucide-react';
import { userService } from '../services/api';

const PLATFORMS = [
  {
    name: 'Instagram', id: 'instagram', color: '#E1306C',
    icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>,
    services: ['Followers', 'Likes', 'Views', 'Comments', 'Shares', 'Saves', 'Story Views', 'IGTV Views', 'Reels Views', 'Impressions']
  },
  {
    name: 'TikTok', id: 'tiktok', color: '#000000',
    icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.12-3.44-3.17-3.8-5.46-.4-2.51.56-5.23 2.67-6.78 1.27-.93 2.87-1.43 4.45-1.42.02 0 .04.01.06.01v4.06c-1.1-.06-2.22.25-3.04.9A3.333 3.333 0 005.12 18.5c.34 1.53 1.83 2.62 3.37 2.65 1.5.02 2.88-.93 3.35-2.36.19-.57.3-1.17.3-1.78.01-4.1-.01-8.2.02-12.3.01-1.56-.02-3.13.01-4.69z"/></svg>,
    services: ['Followers', 'Likes', 'Views', 'Comments', 'Shares', 'Live Views', 'Saves']
  },
  {
    name: 'YouTube', id: 'youtube', color: '#FF0000',
    icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
    services: ['Subscribers', 'Views', 'Likes', 'Comments', 'Shares', 'Watch Time (Hours)', 'Dislikes Removal']
  },
  {
    name: 'Facebook', id: 'facebook', color: '#1877F2',
    icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
    services: ['Page Likes', 'Followers', 'Post Likes', 'Comments', 'Shares', 'Reactions', 'Video Views', 'Event Attendees']
  },
  {
    name: 'Twitter / X', id: 'twitter', color: '#000000',
    icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>,
    services: ['Followers', 'Likes', 'Retweets', 'Comments', 'Quotes', 'Impressions', 'Poll Votes', 'Profile Visits']
  },
];

const PRICING = { base: 2.5, multiplier: { followers: 1.5, likes: 0.8, views: 0.5, comments: 2, shares: 1.2, default: 1 } };

const NewOrder = () => {
  const navigate = useNavigate();
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [platformOpen, setPlatformOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [link, setLink] = useState('');
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('fav_services') || '[]'));
  const [quantity, setQuantity] = useState(1000);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [comments, setComments] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const reorderData = localStorage.getItem('reorder');
    if (reorderData) {
      try {
        const parsed = JSON.parse(reorderData);
        if (parsed.service) setSelectedService(parsed.service);
        if (parsed.link) setLink(parsed.link);
        if (parsed.quantity) setQuantity(parsed.quantity);
        localStorage.removeItem('reorder');
      } catch (e) {}
    }
  }, []);

  const toggleFavorite = (service) => {
    let newFavs = [...favorites];
    if (newFavs.includes(service)) {
      newFavs = newFavs.filter(s => s !== service);
    } else {
      newFavs.push(service);
    }
    setFavorites(newFavs);
    localStorage.setItem('fav_services', JSON.stringify(newFavs));
  };

  const getPrice = () => {
    if (!selectedService || !quantity) return '0.00';
    const key = String(selectedService).toLowerCase().split(' ')[0];
    const multiplier = PRICING.multiplier[key] || PRICING.multiplier.default;
    return ((quantity / 1000) * PRICING.base * multiplier).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const getPricePer1k = () => {
    if (!selectedService) return '0.00';
    const key = String(selectedService).toLowerCase().split(' ')[0];
    const multiplier = PRICING.multiplier[key] || PRICING.multiplier.default;
    return (PRICING.base * multiplier).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPlatform || !selectedService || !link) return;
    setSubmitting(true);
    setError('');
    
    try {
      await userService.newOrder({
        service_id: 1, 
        link,
        quantity
      });
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Order failed. Check balance.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20">
      <div>
        <h1 className="text-2xl font-black text-navy uppercase tracking-tight mb-1">Place Order</h1>
        <p className="text-sm text-slate-400 font-medium">Select platform, service, and enter details.</p>
      </div>

      {submitted ? (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-12 text-center">
          <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Zap className="w-10 h-10 text-teal-500" />
          </div>
          <h2 className="text-xl font-black text-navy uppercase mb-3 tracking-widest">Order Initiated!</h2>
          <p className="text-slate-400 font-medium mb-8">Your request for <strong>{selectedService}</strong> is being processed by our providers.</p>
          <div className="flex gap-4 justify-center">
            <button onClick={() => navigate('/dashboard/orders')} className="px-8 py-3 bg-navy text-white font-black text-xs uppercase tracking-widest rounded-xl">
              Track Order
            </button>
            <button onClick={() => { setSubmitted(false); setSelectedPlatform(null); setSelectedService(''); setLink(''); setQuantity(1000); }} className="px-8 py-3 bg-slate-100 text-navy font-black text-xs uppercase tracking-widest rounded-xl">
              New Order
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8">
            <label className="block text-[0.65rem] font-black text-navy uppercase tracking-widest mb-4">
              1. Platform Selection
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setPlatformOpen(!platformOpen)}
                className="w-full flex items-center justify-between px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-navy hover:border-teal-400 transition-all shadow-inner"
              >
                {selectedPlatform ? (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: selectedPlatform.color }}>
                      {selectedPlatform.icon}
                    </div>
                    {selectedPlatform.name}
                  </div>
                ) : (
                  <span className="text-slate-300">Choose platform...</span>
                )}
                <ChevronDown className={`w-4 h-4 text-slate-300 transition-transform ${platformOpen ? 'rotate-180' : ''}`} />
              </button>
              {platformOpen && (
                <div className="absolute top-16 left-0 right-0 bg-white border border-slate-100 rounded-3xl shadow-2xl z-50 max-h-80 overflow-y-auto p-2">
                  {PLATFORMS.map(p => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => { setSelectedPlatform(p); setSelectedService(''); setPlatformOpen(false); }}
                      className={`w-full flex items-center gap-4 px-5 py-3 hover:bg-slate-50 rounded-2xl transition-all text-left ${selectedPlatform?.id === p.id ? 'bg-teal-50' : ''}`}
                    >
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white flex-shrink-0" style={{ backgroundColor: p.color }}>
                        {p.icon}
                      </div>
                      <span className="font-bold text-sm text-navy">{p.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {selectedPlatform && (
              <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-[0.65rem] font-black text-navy uppercase tracking-widest">
                    2. Service Type
                  </label>
                  {favorites.length > 0 && <span className="text-[0.55rem] font-black text-teal-600 uppercase">Favorites Synced</span>}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {selectedPlatform.services.map(service => (
                    <div key={service} className="relative group">
                      <button
                        type="button"
                        onClick={() => setSelectedService(service)}
                        className={`w-full px-5 py-3.5 rounded-2xl border text-[0.6rem] font-black uppercase tracking-widest transition-all text-left pr-10
                          ${selectedService === service ? 'border-teal-400 bg-teal-50 text-teal-700 shadow-lg shadow-teal-500/10' : 'border-slate-50 bg-slate-50/50 text-slate-400 hover:border-teal-300'}`}
                      >
                        {service}
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleFavorite(service)}
                        className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all
                          ${favorites.includes(service) ? 'text-amber-500' : 'text-slate-100 hover:text-amber-300 opacity-0 group-hover:opacity-100'}`}
                      >
                        <Star className={`w-3.5 h-3.5 ${favorites.includes(service) ? 'fill-amber-500' : ''}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {selectedService && (
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
              {/* Service Description Section */}
              <div className="p-6 md:p-8 border-b border-slate-100">
                <h3 className="text-lg font-bold text-navy mb-5">Service Description</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-navy mb-2">Service Name</label>
                    <div className="px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 text-sm">{selectedPlatform.name} {selectedService}</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-navy mb-2">Minimum Amount</label>
                      <div className="px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 text-sm">50</div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-navy mb-2">Maximum Amount</label>
                      <div className="px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 text-sm">100000</div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-navy mb-2">Price Per 1k</label>
                    <div className="flex px-4 py-0 bg-slate-50 border border-slate-100 rounded-xl overflow-hidden">
                      <div className="flex-1 py-3 text-slate-700 text-sm">{getPricePer1k()}</div>
                      <div className="bg-slate-100/50 px-4 py-3 border-l border-slate-100 text-slate-500 text-sm font-bold">NGN</div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-navy mb-2">Avg Time</label>
                    <div className="px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 text-sm">N/A</div>
                  </div>
                </div>
              </div>

              {/* Order Form Elements */}
              <div className="p-6 md:p-8 space-y-5">
                <div>
                  <label className="block text-sm font-bold text-navy mb-2">Link</label>
                  <input required value={link} onChange={e => setLink(e.target.value)} placeholder="www.example.com/your_profile_identity" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 text-sm outline-none focus:border-teal-400 focus:bg-white transition-colors" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-navy mb-2">Quantity</label>
                  <input type="number" required min="50" max="100000" value={quantity} onChange={e => setQuantity(Number(e.target.value) || '')} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 text-sm outline-none focus:border-teal-400 focus:bg-white transition-colors" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-navy mb-2">Price</label>
                  <div className="flex bg-slate-50 border border-slate-100 rounded-xl overflow-hidden">
                    <div className="flex-1 px-4 py-3 text-slate-700 text-sm">{getPrice()}</div>
                    <div className="bg-slate-100/50 px-4 py-3 border-l border-slate-100 text-slate-500 text-sm font-bold">NGN</div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-navy mb-2">Comments <span className="text-xs font-normal text-slate-400">(Optional)</span></label>
                  <textarea value={comments} onChange={e => setComments(e.target.value)} rows="3" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 text-sm outline-none focus:border-teal-400 focus:bg-white transition-colors resize-none" />
                </div>

                <div className="pt-2 flex items-center justify-start gap-3">
                  <input type="checkbox" id="confirmOrder" checked={confirmed} onChange={e => setConfirmed(e.target.checked)} className="w-4 h-4 rounded border-slate-300 text-teal-500 focus:ring-teal-500" />
                  <label htmlFor="confirmOrder" className="text-sm font-medium text-slate-600 select-none">Yes, i have confirmed the order!</label>
                </div>

                {error && <p className="text-red-500 text-sm font-bold bg-red-50 p-3 rounded-xl">{error}</p>}

                <button disabled={submitting || !confirmed} type="submit" className="w-full py-4 bg-teal-500 text-white font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-teal-400 transition-all shadow-lg shadow-teal-500/20 disabled:opacity-50 disabled:cursor-not-allowed mt-4 mb-6">
                  {submitting ? 'Processing...' : 'Place order'}
                </button>

                <div className="pt-6 border-t border-slate-100">
                  <label className="block text-sm font-bold text-navy mb-3">Service Description</label>
                  <div className="p-5 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 text-sm leading-relaxed space-y-3 shadow-inner">
                    <p className="font-medium">1. IF YOU HAVE PURCHASED THIS SERVICE ALREADY AND WANT TO PURCHASE AGAIN, MAKE SURE YOUR PREVIOUS ORDER IS COMPLETED ALREADY !!</p>
                    <p className="font-medium">2. Make sure the account is not private, and don't change the accounts username while operation is active!</p>
                    <p className="font-medium">3. Almost no drop in engagements!</p>
                    <p className="font-medium">4. Average quality means a shorter guarantee length, semi-real looking accounts/engagements, and average drops.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default NewOrder;
