import React from 'react';

const Contact = () => {
  return (
    <div className="pb-20 bg-white min-h-screen">
      {/* Hero Header */}
      <section className="py-20 px-6 bg-[#f8fafc] border-b border-slate-100 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-3 px-5 py-1.5 bg-white border border-slate-100 rounded-full mb-8 shadow-lg shadow-navy/5">
            <span className="w-2 h-2 bg-seafoam rounded-full animate-ping" />
            <span className="text-[0.6rem] font-black text-navy uppercase tracking-[0.3em]">Get In Touch</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-navy mb-6 uppercase italic leading-tight" style={{ fontFamily: 'Times New Roman, serif' }}>
            We're Here <br/> <span className="text-seafoam not-italic">To Help.</span>
          </h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Reach out for support, partnerships, or custom orders</p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20">
          {/* Contact Details */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-black text-navy uppercase italic mb-8">Support Channels</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { channel: 'Email', detail: 'support@favtech.com', color: 'navy' },
                  { channel: 'WhatsApp', detail: '+234 812 345 6789', color: 'seafoam' },
                  { channel: 'Telegram', detail: '@favtech_support', color: 'navy' },
                  { channel: 'Live Chat', detail: 'Available 24/7', color: 'seafoam' }
                ].map(item => (
                  <div key={item.channel} className="p-8 border border-slate-100 rounded-3xl bg-white shadow-lg hover:shadow-xl transition-all">
                    <p className={`text-[0.6rem] font-black uppercase tracking-widest mb-2 ${item.color === 'seafoam' ? 'text-seafoam' : 'text-slate-400'}`}>{item.channel}</p>
                    <p className="text-lg font-black text-navy uppercase">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-10 bg-navy text-white rounded-[3rem] shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-seafoam/10 blur-3xl rounded-full -mr-16 -mt-16"></div>
               <h3 className="text-2xl font-black italic uppercase mb-4 text-seafoam">Quick Tip</h3>
               <p className="font-medium text-slate-300 leading-relaxed mb-6">
                 When contacting support regarding an order, please make sure to include your order ID and the link to the profile or post you boosted.
               </p>
               <button className="text-xs font-black uppercase tracking-widest text-white border-b border-seafoam pb-1">Read FAQ first</button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-10 md:p-16 border border-slate-100 rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(15,23,42,0.1)]">
            <h3 className="text-2xl font-black text-navy uppercase italic mb-8">Send a Message</h3>
            <form className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[0.6rem] font-black text-navy uppercase tracking-widest ml-4">Full Name</label>
                  <input type="text" placeholder="EX. SARAH SMITH" className="w-full p-5 bg-ice border border-slate-50 rounded-2xl outline-none focus:ring-4 focus:ring-seafoam/10 font-black text-xs uppercase" />
                </div>
                <div className="space-y-2">
                  <label className="text-[0.6rem] font-black text-navy uppercase tracking-widest ml-4">Email Address</label>
                  <input type="email" placeholder="SARAH@EMAIL.COM" className="w-full p-5 bg-ice border border-slate-50 rounded-2xl outline-none focus:ring-4 focus:ring-seafoam/10 font-black text-xs uppercase" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[0.6rem] font-black text-navy uppercase tracking-widest ml-4">Subject</label>
                <input type="text" placeholder="ORDER INQUIRY" className="w-full p-5 bg-ice border border-slate-50 rounded-2xl outline-none focus:ring-4 focus:ring-seafoam/10 font-black text-xs uppercase" />
              </div>
              <div className="space-y-2">
                <label className="text-[0.6rem] font-black text-navy uppercase tracking-widest ml-4">Your Message</label>
                <textarea rows="4" placeholder="HOW CAN WE HELP YOU?" className="w-full p-5 bg-ice border border-slate-50 rounded-2xl outline-none focus:ring-4 focus:ring-seafoam/10 font-black text-xs uppercase"></textarea>
              </div>
              <button className="w-full py-6 bg-navy text-white font-black text-sm rounded-2xl shadow-xl hover:translate-y-[-2px] active:scale-95 transition-all uppercase tracking-[0.3em]">
                Send Notification
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Locations - Added for Length */}
      <section className="py-32 px-6 bg-ghost border-t border-slate-100">
        <div className="max-w-5xl mx-auto text-center">
           <h2 className="text-2xl font-black text-navy uppercase italic mb-12">Our Global Presence</h2>
           <div className="grid grid-cols-2 md:grid-cols-3 gap-12 opacity-50">
             <div>
               <p className="text-lg font-black text-navy uppercase">Lagos, Nigeria</p>
               <p className="text-[0.6rem] font-black uppercase text-slate-400">HQ Africa</p>
             </div>
             <div>
               <p className="text-lg font-black text-navy uppercase">London, UK</p>
               <p className="text-[0.6rem] font-black uppercase text-slate-400">EU Support</p>
             </div>
             <div>
               <p className="text-lg font-black text-navy uppercase">Toronto, Canada</p>
               <p className="text-[0.6rem] font-black uppercase text-slate-400">Data Center</p>
             </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
