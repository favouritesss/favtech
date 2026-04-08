import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useBrand } from '../context/BrandContext';
import { Instagram, Music2, Facebook, Twitter, Youtube, Linkedin } from 'lucide-react';

const ServicesPage = () => {
  const { settings } = useBrand();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const services = [
    { 
      id: 'instagram',
      title: 'Instagram Boosting', 
      icon: <Instagram className="w-10 h-10 text-seafoam" />,
      desc: 'Increase your followers, likes, comments, and story views. Our high-quality profiles ensure your account looks natural and professional.', 
      stats: 'Real High Quality',
      features: ['Followers', 'Likes', 'Comments', 'Story Views']
    },
    { 
      id: 'tiktok',
      title: 'TikTok Viral Growth', 
      icon: <Music2 className="w-10 h-10 text-seafoam" />,
      desc: 'Get more views, shares, and likes to boost your chances of going viral on TikTok. Fast delivery to spark trends.', 
      stats: 'Instant Delivery',
      features: ['Video Views', 'Shares', 'Likes', 'Followers']
    },
    { 
      id: 'youtube',
      title: 'YouTube Channel Growth', 
      icon: <Youtube className="w-10 h-10 text-seafoam" />,
      desc: 'Increase your watch time and subscriber count to reach monetization faster. High retention views available.', 
      stats: 'Monetization Ready',
      features: ['Watch Time', 'Subscribers', 'Video Likes', 'Comments']
    },
    { 
      id: 'facebook',
      title: 'Facebook Page Reach', 
      icon: <Facebook className="w-10 h-10 text-seafoam" />,
      desc: 'Grow your Facebook page likes and post engagement. Build authority and expand your reach across the platform.', 
      stats: 'Targeted Boost',
      features: ['Page Likes', 'Followers', 'Post Reactions', 'Shares']
    },
    { 
      id: 'twitter',
      title: 'Twitter Engagement', 
      icon: <Twitter className="w-10 h-10 text-seafoam" />,
      desc: 'Boost your retweets, likes, and followers. Establish your global presence and join the conversation.', 
      stats: 'Daily Limit Control',
      features: ['Retweets', 'Followers', 'Likes', 'Poll Votes']
    },
    { 
      id: 'linkedin',
      title: 'LinkedIn Network', 
      icon: <Linkedin className="w-10 h-10 text-seafoam" />,
      desc: 'Build your professional authority with LinkedIn followers and post reactions. Perfect for corporate growth.', 
      stats: 'B2B Verified',
      features: ['Followers', 'Connections', 'Post Likes', 'Comments']
    }
  ];

  return (
    <div className="pb-20 bg-white selection:bg-seafoam selection:text-white min-h-screen">
      {/* Hero Header */}
      <section className="py-20 md:py-32 px-6 border-b border-slate-100 bg-[#f8fafc] overflow-hidden relative">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-3xl md:text-5xl font-black text-navy mb-8 tracking-tighter uppercase italic leading-tight" style={{ fontFamily: 'Times New Roman, serif' }}>
            Service <span className="text-seafoam not-italic">Directory.</span>
          </h1>
          <p className="text-sm font-black text-slate-dark max-w-xl mx-auto opacity-60 uppercase tracking-[0.4em]">Comprehensive Growth Solutions for Every Platform</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div key={s.id} id={s.id} className="p-12 bg-white border border-slate-100 rounded-[3rem] hover:shadow-2xl transition-all group overflow-hidden flex flex-col justify-between scroll-mt-32">
               <div>
                 <div className="mb-8 group-hover:scale-110 transition-transform">{s.icon}</div>
                 <h2 className="text-2xl font-black text-navy mb-6 uppercase italic tracking-tight">{s.title}</h2>
                 <p className="text-slate-500 font-medium leading-relaxed mb-8">{s.desc}</p>
                 <ul className="mb-10 space-y-3">
                   {s.features.map(f => (
                     <li key={f} className="text-[0.6rem] font-black text-navy uppercase tracking-widest flex items-center">
                       <span className="w-1.5 h-1.5 bg-seafoam rounded-full mr-3"></span> {f}
                     </li>
                   ))}
                 </ul>
               </div>
               <div className="flex items-center justify-between mt-auto pt-8 border-t border-slate-50">
                  <span className="px-5 py-2 bg-ice rounded-full text-[0.5rem] font-black text-seafoam uppercase tracking-widest border border-seafoam/10">{s.stats}</span>
                  <Link to="/register" className="text-[0.6rem] font-black text-navy uppercase tracking-widest border-b border-navy/10 hover:border-seafoam transition-colors pb-1">Order Now</Link>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reseller Call to Action - Long Section */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto p-16 md:p-24 bg-navy rounded-[4rem] text-center relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(20,184,166,0.1)_0%,_transparent_70%)]"></div>
           <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter uppercase italic leading-tight" style={{ fontFamily: 'Times New Roman, serif' }}>Become a Reseller Today</h2>
           <p className="text-white/60 font-bold max-w-2xl mx-auto mb-12 uppercase tracking-widest leading-relaxed">
             Join our growing network of resellers and start your own SMM business. {settings.site_name} provides the most stable services at competitive prices.
           </p>
           <div className="flex flex-col sm:flex-row justify-center gap-6">
             <button className="px-12 py-5 bg-white text-navy font-black rounded-2xl shadow-xl hover:translate-y-[-2px] transition-all uppercase tracking-widest text-xs">Register Now</button>
             <button className="px-12 py-5 border border-white/20 text-white font-black rounded-2xl hover:bg-white/5 transition-all uppercase tracking-widest text-xs">Contact Sales</button>
           </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
