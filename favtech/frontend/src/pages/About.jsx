import React from 'react';
import { useBrand } from '../context/BrandContext';

const About = () => {
  const { settings } = useBrand();

  return (
    <div className="pb-20 bg-white selection:bg-seafoam selection:text-white min-h-screen">
      {/* Hero Header */}
      <section className="py-20 md:py-32 px-6 bg-[#f8fafc] border-b border-slate-100 overflow-hidden relative">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center space-x-3 px-5 py-1.5 bg-white border border-slate-100 rounded-full mb-10 animate-fade-in shadow-lg shadow-navy/5">
            <span className="w-2 h-2 bg-seafoam rounded-full animate-ping" />
            <span className="text-[0.6rem] font-black text-navy uppercase tracking-[0.3em]">Who We Are</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-navy mb-8 tracking-tighter uppercase italic leading-[1.1]" style={{ fontFamily: 'Times New Roman, serif' }}>
            Elevating Your <br/> <span className="text-seafoam not-italic">Presence.</span>
          </h1>
          <p className="text-lg font-bold text-slate-dark max-w-2xl mx-auto opacity-70 leading-relaxed uppercase tracking-widest">
            {settings.site_name} is the premier destination for high-quality social media growth. We help influencers, businesses, and creators dominate their space.
          </p>
        </div>
      </section>

      {/* Main Story Content */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <h2 className="text-3xl font-black text-navy uppercase italic">Our Story & Mission</h2>
            <div className="space-y-6 text-slate-dark font-medium leading-loose text-lg opacity-80">
              <p>Founded in 2018, {settings.site_name} was created to solve one problem: the difficulty of getting noticed in an increasingly crowded social media landscape.</p>
              <p>We realized that quality engagement was hard to find and even harder to maintain. That's why we built a platform that delivers real results—fast, safe, and reliable.</p>
              <p>Whether you need thousands of Instagram followers, a boost in TikTok views, or higher engagement on Twitter, we provide the tools you need to succeed.</p>
            </div>
            <div className="pt-10 border-t border-slate-100">
               <h4 className="text-navy font-black text-sm uppercase mb-2">Our Promise</h4>
               <p className="text-slate-500 font-bold uppercase text-xs tracking-[0.2em]">Quality Services. Fast Delivery. Full Security.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
             <div className="aspect-square bg-navy rounded-[2rem] p-8 flex flex-col justify-end text-white">
                <p className="text-4xl font-black italic mb-2">1M+</p>
                <p className="text-[0.6rem] font-black uppercase tracking-widest opacity-50">Users Boosted</p>
             </div>
             <div className="aspect-square bg-white border border-slate-100 rounded-[2rem] p-8 flex flex-col justify-end text-navy">
                <p className="text-4xl font-black italic mb-2">100%</p>
                <p className="text-[0.6rem] font-black uppercase tracking-widest opacity-50">Privacy Safe</p>
             </div>
             <div className="aspect-square bg-seafoam rounded-[2rem] p-8 flex flex-col justify-end text-white">
                <p className="text-4xl font-black italic mb-2">24h</p>
                <p className="text-[0.6rem] font-black uppercase tracking-widest opacity-50">Order Tracking</p>
             </div>
             <div className="aspect-square bg-ghost rounded-[2rem] p-8 flex flex-col justify-end text-navy">
                <p className="text-4xl font-black italic mb-2">99%</p>
                <p className="text-[0.6rem] font-black uppercase tracking-widest opacity-50">Success Rate</p>
             </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 px-6 bg-ghost border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-black text-navy uppercase italic mb-4">The FavTech Standards</h2>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Why we are different</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: 'Premium Quality', desc: 'All our followers and likes are sourced from high-quality profiles to ensure your account looks natural and professional.' },
              { title: 'Global Reach', desc: 'We offer services across all major platforms including Facebook, Instagram, TikTok, YouTube, Twitter, and LinkedIn.' },
              { title: 'Secure Payments', desc: 'Your financial information is never stored. We use industry-standard encryption for all transactions.' }
            ].map(item => (
              <div key={item.title} className="bg-white p-12 rounded-[3rem] shadow-xl border border-slate-50">
                <h4 className="text-xl font-black text-navy uppercase mb-6 italic">{item.title}</h4>
                <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section Preview */}
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-black text-navy uppercase italic mb-8">Ready to grow your brand?</h2>
          <p className="text-slate-500 font-medium leading-relaxed mb-12">
            Join thousands of satisfied clients who have scaled their presence with {settings.site_name}. 
            Whether you're an established business or just starting out, we have the perfect package for you.
          </p>
          <div className="flex justify-center gap-6">
            <button className="px-12 py-5 bg-navy text-white font-black rounded-2xl shadow-xl hover:translate-y-[-2px] transition-all text-xs uppercase tracking-widest">Start Now</button>
            <button className="px-12 py-5 border border-slate-100 text-navy font-black rounded-2xl hover:bg-slate-50 transition-all text-xs uppercase tracking-widest">View Services</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
