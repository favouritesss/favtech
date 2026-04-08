import React from 'react';

const Privacy = () => {
  return (
    <div className="pt-10 pb-20 bg-white selection:bg-seafoam selection:text-white">
      {/* Hero Header */}
      <section className="py-24 px-6 bg-ice/50 border-b border-slate-100 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,_rgba(20,184,166,0.2)_0%,_transparent_70%)]"></div>
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="reveal">
            <h1 className="text-4xl md:text-6xl font-black text-navy mb-6 uppercase italic" style={{ fontFamily: 'Times New Roman, serif' }}>
              Privacy <span className="text-seafoam not-italic">Protocol.</span>
            </h1>
            <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[0.6rem] max-w-lg mx-auto leading-relaxed">
              How we protect your digital footprint and maintain industrial-grade data integrity standards.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
           <div className="grid grid-cols-1 gap-20">
              <div className="reveal">
                <div className="flex items-center gap-4 mb-8">
                  <span className="w-12 h-12 bg-navy text-white rounded-2xl flex items-center justify-center font-black italic">01</span>
                  <h2 className="text-2xl font-black text-navy uppercase italic">Data Encryption & Safety</h2>
                </div>
                <p className="text-slate-600 font-medium leading-loose pl-16">
                  At FavTech, we prioritize your security above all else. All data transmitted through our platform is encrypted using 256-bit SSL technology. We do not store sensitive payment information on our servers; all transactions are securely handled by our PCI-compliant payment partners like Paystack.
                </p>
              </div>

              <div className="reveal">
                <div className="flex items-center gap-4 mb-8">
                  <span className="w-12 h-12 bg-seafoam text-white rounded-2xl flex items-center justify-center font-black italic">02</span>
                  <h2 className="text-2xl font-black text-navy uppercase italic">Information Harvest</h2>
                </div>
                <p className="text-slate-600 font-medium leading-loose pl-16">
                  We collect minimal personal information necessary to facilitate order fulfillment and provide customer support. This typically includes your email address, name, and account preferences. We never request your social media passwords or private account access.
                </p>
              </div>

              <div className="reveal">
                <div className="flex items-center gap-4 mb-8">
                  <span className="w-12 h-12 bg-navy text-white rounded-2xl flex items-center justify-center font-black italic">03</span>
                  <h2 className="text-2xl font-black text-navy uppercase italic">Cookie Architecture</h2>
                </div>
                <p className="text-slate-600 font-medium leading-loose pl-16">
                  Our system utilizes cookies to enhance your browsing experience, remember your session details, and analyze traffic patterns. These small data files are essential for platform performance and personalized service delivery. You can manage cookie preferences through your browser settings.
                </p>
              </div>

              <div className="reveal">
                <div className="flex items-center gap-4 mb-8">
                  <span className="w-12 h-12 bg-seafoam text-white rounded-2xl flex items-center justify-center font-black italic">04</span>
                  <h2 className="text-2xl font-black text-navy uppercase italic">Third-Party Logistics</h2>
                </div>
                <p className="text-slate-600 font-medium leading-loose pl-16">
                  We engage with verified third-party service providers to execute orders on your behalf. These partners only receive the information strictly required for service delivery (e.g., your social media profile URL). We have strict Non-Disclosure Agreements in place to protect your identity.
                </p>
              </div>

              <div className="reveal">
                <div className="flex items-center gap-4 mb-8">
                  <span className="w-12 h-12 bg-navy text-white rounded-2xl flex items-center justify-center font-black italic">05</span>
                  <h2 className="text-2xl font-black text-navy uppercase italic">User Sovereignty</h2>
                </div>
                <p className="text-slate-600 font-medium leading-loose pl-16">
                  You maintain full control over your data. At any point, you may request to view, modify, or delete your personal information from our system. To exercise these rights, please contact our support desk through the dashboard ticket system.
                </p>
              </div>
           </div>
        </div>
      </section>

      {/* Footer Info Box */}
      <section className="py-24 px-6 bg-navy text-white relative">
        <div className="absolute inset-0 opacity-5 grayscale pointer-events-none">
           <div className="h-full w-full bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,rgba(255,255,255,0.1)_20px,rgba(255,255,255,0.1)_40px)]"></div>
        </div>
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <div className="reveal">
            <p className="text-[0.6rem] font-black uppercase tracking-[0.5em] text-seafoam mb-4">Last Updated: April 8, 2026</p>
            <p className="text-white font-bold uppercase tracking-[0.2em] text-[0.7rem] leading-relaxed">
              FavTech Global Data Protection Compliance Framework 2.1 <br/>
              <span className="opacity-40 font-medium lowercase">Directives applicable to all jurisdiction regions.</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
