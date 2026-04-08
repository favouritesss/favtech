import React from 'react';

const Terms = () => {
  return (
    <div className="pt-24 pb-20 bg-white selection:bg-seafoam selection:text-white">
      {/* Hero Header */}
      <section className="py-20 px-6 bg-navy text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black mb-6 uppercase italic" style={{ fontFamily: 'Times New Roman, serif' }}>
            Terms of <span className="text-seafoam not-italic">Service.</span>
          </h1>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Agreement for using FavTech boosting platform</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="reveal">
            <h2 className="text-2xl font-black text-navy uppercase italic mb-6">1. Acceptance of Terms</h2>
            <p className="text-slate-600 font-medium leading-loose">
              By accessing and using FavTech, you agree to comply with and be bound by these Terms of Service. If you do not agree with any part of these terms, you should not use our platform or purchase any services.
            </p>
          </div>

          <div className="reveal">
            <h2 className="text-2xl font-black text-navy uppercase italic mb-6">2. Service Guarantee</h2>
            <p className="text-slate-600 font-medium leading-loose">
              We strive to provide the highest quality services. Most orders are permanent, but social media platforms are subject to algorithm changes. In case of significant drops, we offer a refill guarantee for specified services within a certain timeframe.
            </p>
          </div>

          <div className="reveal">
            <h2 className="text-2xl font-black text-navy uppercase italic mb-6">3. Account Safety</h2>
            <p className="text-slate-600 font-medium leading-loose">
              Users are responsible for maintaining the privacy of their profile or post links. FavTech is not responsible for any platform penalties or account bans that may occur from misuse of services or non-compliance with social media platform rules.
            </p>
          </div>

          <div className="reveal">
            <h2 className="text-2xl font-black text-navy uppercase italic mb-6">4. Payment & Refunds</h2>
            <p className="text-slate-600 font-medium leading-loose">
              All payments must be made in full before an order is processed. Due to the digital nature of our boosting services, all sales are final. Refunds are only issued to your internal wallet if an order cannot be completed.
            </p>
          </div>

          <div className="reveal">
            <h2 className="text-2xl font-black text-navy uppercase italic mb-6">5. Ethical Use</h2>
            <p className="text-slate-600 font-medium leading-loose">
              Users agree not to use our services for malicious purposes, harassment, or illegal activities. We reserve the right to terminate accounts that violate our community standards or engage in fraudulent activities.
            </p>
          </div>

          <div className="reveal">
            <h2 className="text-2xl font-black text-navy uppercase italic mb-6">6. Platform Disclaimer</h2>
            <p className="text-slate-600 font-medium leading-loose">
              This platform allows users to purchase social media services such as Instagram followers, likes, comments, shares, TikTok views, Twitter engagement, and similar services across multiple platforms. We are not officially affiliated with Instagram, Facebook, TikTok, or Twitter.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Info Box */}
      <section className="py-20 px-6 bg-ghost border-t border-slate-100">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-[0.6rem] font-black uppercase tracking-[0.5em] opacity-40 mb-4">Effective Date: April 8, 2026</p>
          <p className="text-navy font-bold uppercase tracking-widest text-[0.6rem]">FavTech Official Service Agreement</p>
        </div>
      </section>
    </div>
  );
};

export default Terms;
