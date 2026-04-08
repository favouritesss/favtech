import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import Services from '../components/Services';
import { motion } from 'framer-motion';
import AuthOverlay from '../components/AuthOverlay';

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const overlay = searchParams.get('overlay');

  const testimonials = [
    { name: "Sarah J.", role: "Influencer", text: "FavTech helped me grow my Instagram from 2k to 50k in just three months. The engagement is real and consistent!" },
    { name: "Michael R.", role: "Brand Manager", text: "The fastest delivery I've ever seen. Their TikTok views service is a game changer for our marketing campaigns." },
    { name: "David L.", role: "Solo Creator", text: "Simple, effective, and reliable. I no longer worry about my social media reach. Highly recommended!" },
  ];

  return (
    <div className="bg-white selection:bg-seafoam selection:text-white pb-20">
      <AuthOverlay 
        isOpen={overlay === 'login' || overlay === 'register'} 
        initialView={overlay === 'login' ? 'login' : 'register'}
        onClose={() => navigate('/')} 
      />
      <Hero />
      
      {/* Platform Icons Section */}
      <section className="py-10 bg-ice/50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 overflow-hidden flex items-center justify-around opacity-40">
           {['INSTAGRAM', 'TIKTOK', 'FACEBOOK', 'TWITTER', 'YOUTUBE', 'LINKEDIN'].map(p => (
             <span key={p} className="text-[0.6rem] font-black tracking-[0.5em]">{p}</span>
           ))}
        </div>
      </section>
      
      {/* Services Section */}
      <div className="reveal">
        <Services />
      </div>

      {/* Why Choose Us - Long Content */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="reveal">
              <h2 className="text-4xl md:text-5xl font-black mb-8 uppercase italic leading-tight" style={{ fontFamily: 'Times New Roman, serif' }}>
                Why Professionals <br/> <span className="text-seafoam not-italic">Choose Us.</span>
              </h2>
              <div className="space-y-10">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-navy flex-shrink-0 flex items-center justify-center text-white font-black">01</div>
                  <div>
                    <h4 className="text-lg font-black text-navy uppercase mb-2">Instant Delivery</h4>
                    <p className="text-slate-500 font-medium">As soon as you place an order, our system begins processing it. No waiting for manual approvals.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-seafoam flex-shrink-0 flex items-center justify-center text-white font-black">02</div>
                  <div>
                    <h4 className="text-lg font-black text-navy uppercase mb-2">Safe & Discreet</h4>
                    <p className="text-slate-500 font-medium">We use advanced protection algorithms to ensure your account remains safe and within platform guidelines.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-navy flex-shrink-0 flex items-center justify-center text-white font-black">03</div>
                  <div>
                    <h4 className="text-lg font-black text-navy uppercase mb-2">24/7 Support</h4>
                    <p className="text-slate-500 font-medium">Our team is always available to help you with any questions or issues with your orders.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="reveal relative">
               <div className="aspect-video bg-navy rounded-[3rem] overflow-hidden shadow-2xl relative">
                  <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-60" alt="Social Media Growth" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-seafoam flex items-center justify-center animate-pulse cursor-pointer">
                      <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[15px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                    </div>
                  </div>
               </div>
               <div className="absolute -bottom-10 -right-10 p-10 bg-white border border-slate-100 rounded-3xl shadow-xl hidden md:block">
                  <p className="text-3xl font-black text-navy">+500k</p>
                  <p className="text-[0.6rem] font-black text-slate-400 uppercase tracking-widest">Successful Boosts</p>
               </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Animated Testimonials */}
      <section className="py-32 bg-ice/30 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-20">
          <div className="text-center reveal">
            <h2 className="text-3xl font-black text-navy uppercase tracking-widest mb-4 italic">Client Success</h2>
            <p className="text-slate-500 font-bold uppercase tracking-[0.2em]">What they say about us</p>
          </div>
        </div>
        
        <div className="relative flex whitespace-nowrap overflow-hidden">
          <div className="flex animate-marquee py-10 space-x-10">
            {[...testimonials, ...testimonials].map((t, i) => (
              <div key={i} className="w-[400px] flex-shrink-0 bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-50">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-navy rounded-full flex items-center justify-center text-white font-black text-xl">
                    {t.name[0]}
                  </div>
                  <div>
                    <h4 className="font-black text-navy uppercase text-sm">{t.name}</h4>
                    <p className="text-[0.6rem] font-black text-seafoam uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
                <p className="text-slate-600 font-medium italic whitespace-normal leading-relaxed">"{t.text}"</p>
                <div className="mt-6 flex text-yellow-400">
                  {'★★★★★'.split('').map((s, j) => <span key={j}>{s}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Power Stats */}
      <section className="py-32 bg-navy relative reveal">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { val: 'Instantly', label: 'Delivery Speed' },
              { val: 'Secure', label: 'Payment Gateway' },
              { val: '24/7', label: 'Support Access' },
              { val: '100%', label: 'Privacy Control' },
            ].map(stat => (
              <div key={stat.label}>
                <p className="text-4xl font-black text-seafoam mb-4 italic" style={{ fontFamily: 'Times New Roman, serif' }}>{stat.val}</p>
                <p className="text-[0.6rem] font-black text-white/40 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Action Section */}
      <section className="py-32 bg-white reveal">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-7xl font-black text-navy mb-8 uppercase italic leading-tight" style={{ fontFamily: 'Times New Roman, serif' }}>
            Ready to <span className="text-seafoam not-italic">Grow?</span>
          </h2>
          <p className="text-lg text-slate-500 font-bold mb-12 uppercase tracking-widest leading-loose">
            Join thousands of satisfied Nigerian creators who have scaled their presence with FavTech SMM. The most trusted SMM panel in Africa.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button onClick={() => navigate('/register')} className="px-12 py-6 bg-navy text-white font-black rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all text-sm uppercase tracking-[0.3em]">
               Initialize Account
            </button>
            <button onClick={() => navigate('/services')} className="px-12 py-6 border-2 border-slate-100 text-navy font-black rounded-2xl hover:bg-slate-50 transition-all text-sm uppercase tracking-[0.3em]">
               Pricing Matrix
            </button>
          </div>
          <div className="mt-20 pt-20 border-t border-slate-50">
             <h3 className="text-[0.65rem] font-black text-slate-300 uppercase tracking-[0.4em] mb-10">Trusted Across Nigeria</h3>
             <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 grayscale opacity-30 font-black text-xs text-navy tracking-widest">
                <span>LAGOS</span>
                <span>ABUJA</span>
                <span>PORT HARCOURT</span>
                <span>KANO</span>
                <span>IBADAN</span>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
