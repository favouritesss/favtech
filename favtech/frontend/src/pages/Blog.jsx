import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, User, ArrowRight, MessageSquare, BookOpen } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Blog = () => {
  const navigate = useNavigate();
  
  const posts = [
    {
      id: 1,
      title: "How to Grow Your Instagram Followers Fast in 2026",
      desc: "Learn the latest strategies and AI-powered tools that are helping Nigerian creators dominate the explore page.",
      date: "April 5, 2026",
      author: "FavTech Growth Team",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800",
      tag: "Instagram Strategy"
    },
    {
      id: 2,
      title: "Best Time to Post on TikTok for Maximum Viral Potential",
      desc: "Timing is everything. We analyzed 10 million posts to find out when your Nigerian audience is most active.",
      date: "April 2, 2026",
      author: "Social Analyst",
      image: "https://images.unsplash.com/photo-1598128558393-70ff21433be0?auto=format&fit=crop&q=80&w=800",
      tag: "TikTok Tips"
    },
    {
       id: 3,
       title: "Why SMM Panels are the Secret Weapon of Top Digital Marketers",
       desc: "Discover how agencies use FavTech's deep-api to scale businesses and social icons with fractional costs.",
       date: "March 28, 2026",
       author: "Admin",
       image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
       tag: "Marketing News"
    }
  ];

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <Navbar />
      
      {/* Blog Hero */}
      <section className="pt-32 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
           <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 rounded-full text-teal-600 text-[0.65rem] font-black uppercase tracking-widest mb-6 border border-teal-100">
              <BookOpen className="w-3.5 h-3.5" /> Growth Intelligence
           </div>
           <h1 className="text-4xl md:text-6xl font-black text-navy tracking-tighter mb-6 uppercase">
              The FavTech <span className="text-teal-500">Chronicles</span>
           </h1>
           <p className="text-lg text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
              Actionable insights, viral case studies, and the latest in social media marketing technology.
           </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {posts.map(post => (
                <div key={post.id} className="group cursor-pointer">
                   <div className="relative h-64 rounded-[2.5rem] overflow-hidden mb-8 shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                      <div className="absolute top-6 left-6 px-4 py-2 bg-white/20 backdrop-blur-md rounded-xl text-white text-[0.6rem] font-black uppercase tracking-[0.2em] border border-white/20">
                         {post.tag}
                      </div>
                   </div>
                   <div className="space-y-4 px-2">
                      <div className="flex items-center gap-4 text-slate-300 text-[0.6rem] font-black uppercase tracking-widest">
                         <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3 text-teal-500" /> {post.date}</span>
                         <span className="flex items-center gap-1.5"><User className="w-3 h-3 text-teal-500" /> {post.author}</span>
                      </div>
                      <h3 className="text-2xl font-black text-navy leading-tight tracking-tight group-hover:text-teal-500 transition-colors uppercase">
                         {post.title}
                      </h3>
                      <p className="text-sm text-slate-400 font-medium leading-relaxed line-clamp-2">
                         {post.desc}
                      </p>
                      <button className="flex items-center gap-2 text-navy font-black text-[0.65rem] uppercase tracking-widest mt-4 group-hover:translate-x-2 transition-transform">
                         Read Insight <ArrowRight className="w-4 h-4 text-teal-500" />
                      </button>
                   </div>
                </div>
              ))}
           </div>

           {/* Newsletter */}
           <div className="mt-32 p-12 lg:p-20 bg-navy rounded-[4rem] text-center text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 blur-[100px] rounded-full translate-x-32 translate-y-[-100px]" />
              <div className="relative z-10 space-y-10 max-w-2xl mx-auto">
                 <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center mx-auto backdrop-blur-xl">
                    <MessageSquare className="w-8 h-8 text-teal-400" />
                 </div>
                 <div className="space-y-4">
                    <h2 className="text-4xl font-black uppercase tracking-tighter">Stay Synchronized.</h2>
                    <p className="text-white/40 text-sm font-medium leading-relaxed">
                       Subscribe to our weekly "Growth Pulse" and get platform algorithm updates directly to your terminal.
                    </p>
                 </div>
                 <div className="flex flex-col sm:flex-row gap-4">
                    <input placeholder="Enter your terminal address (email)" className="flex-1 px-8 py-5 bg-white/5 border border-white/10 rounded-2xl text-white text-sm outline-none placeholder-white/20 focus:border-teal-500/50" />
                    <button className="px-12 py-5 bg-teal-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-teal-400 transition-all shadow-xl shadow-teal-500/20">
                       Subscribe
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
