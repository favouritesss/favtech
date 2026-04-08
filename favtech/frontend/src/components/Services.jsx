import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Music2, Facebook, Twitter, Youtube, Linkedin, ArrowRight } from 'lucide-react';

const Services = () => {
  const services = [
    { title: 'Instagram Growth', icon: <Instagram className="w-8 h-8 text-seafoam" />, desc: 'Secure likes, followers, and engagement with instant delivery.', id: 'instagram' },
    { title: 'TikTok Trends', icon: <Music2 className="w-8 h-8 text-seafoam" />, desc: 'Be the next viral sensation with views and share automation.', id: 'tiktok' },
    { title: 'Facebook Ads', icon: <Facebook className="w-8 h-8 text-seafoam" />, desc: 'Enterprise-grade ad management and page optimization.', id: 'facebook' },
    { title: 'Twitter Reach', icon: <Twitter className="w-8 h-8 text-seafoam" />, desc: 'Retweets and quote tweets to boost your global conversations.', id: 'twitter' },
    { title: 'YouTube SEO', icon: <Youtube className="w-8 h-8 text-seafoam" />, desc: 'Real watch time and subscribers to monetize your channel fast.', id: 'youtube' },
    { title: 'LinkedIn Authority', icon: <Linkedin className="w-8 h-8 text-seafoam" />, desc: 'B2B engagement to establish professional dominance.', id: 'linkedin' },
  ];

  return (
    <section className="py-32 bg-ghost/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24 reveal">
          <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase italic" style={{ fontFamily: 'Times New Roman, serif' }}>Expert Social Services</h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-bold uppercase tracking-widest leading-relaxed opacity-70">
            Professional engagement solutions built for speed, security, and real growth.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div key={index} className="reveal bg-white p-12 rounded-[3rem] border border-slate-100 shadow-xl hover:shadow-2xl transition-all group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-0 bg-seafoam transition-all duration-300 group-hover:h-full" />
              <div className="mb-8 w-16 h-16 rounded-2xl bg-ice flex items-center justify-center group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-2xl font-black text-navy mb-4 uppercase italic tracking-tight">{service.title}</h3>
              <p className="text-slate-500 leading-relaxed font-bold uppercase text-xs tracking-widest opacity-70 mb-8">{service.desc}</p>
              <Link to={`/services#${service.id}`} className="inline-flex items-center text-navy font-black text-xs tracking-[0.2em] uppercase cursor-pointer hover:text-seafoam transition-colors">
                Learn More <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
