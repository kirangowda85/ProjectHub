'use client';

import Link from 'next/link';
import { 
  Cpu, Code, Globe, Database, Smartphone, Layout, 
  Terminal, ShieldCheck, ChevronRight, ArrowRight
} from 'lucide-react';

const CATEGORIES = [
  { name: 'AI/ML', icon: Cpu, desc: 'Artificial Intelligence and Machine Learning projects including Computer Vision, NLP, and Predictive Analytics.', color: 'from-cyan-500 to-blue-600', count: 124 },
  { name: 'Full Stack', icon: Globe, desc: 'End-to-end web applications built with modern frameworks like Next.js, React, and Node.js.', color: 'from-violet-500 to-purple-600', count: 85 },
  { name: 'Java', icon: Code, desc: 'Enterprise-grade applications using Spring Boot, Hibernate, and robust Java architectures.', color: 'from-orange-500 to-red-600', count: 62 },
  { name: 'Python', icon: Terminal, desc: 'Versatile Python projects covering Django, Flask, automation, and data analysis.', color: 'from-green-500 to-emerald-600', count: 78 },
  { name: 'MERN', icon: Database, desc: 'Modern web stack projects using MongoDB, Express, React, and Node.js.', color: 'from-blue-500 to-indigo-600', count: 54 },
  { name: 'Android', icon: Smartphone, desc: 'Native and hybrid mobile applications for the Android ecosystem.', color: 'from-emerald-500 to-teal-600', count: 41 },
  { name: 'UI/UX', icon: Layout, desc: 'Design-centric projects focusing on user experience and interface aesthetics.', color: 'from-pink-500 to-rose-600', count: 32 },
  { name: 'Blockchain', icon: ShieldCheck, desc: 'Decentralized applications and smart contracts using Ethereum or Solidity.', color: 'from-indigo-500 to-blue-700', count: 19 },
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-16 px-4 sm:px-6" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-[10px] sm:text-xs text-cyan-400 font-semibold uppercase tracking-[0.2em] mb-3">Explore Domains</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Project <span className="gradient-text">Categories</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto px-2 leading-relaxed">
            Discover a wide range of engineering projects across various technical domains. 
            From AI to Web Development, find the perfect topic for your academics.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link key={cat.name} href={`/projects?category=${cat.name}`} className="gradient-border group h-full">
                <div className="glass-card rounded-2xl p-5 sm:p-8 h-full transition-all duration-500 group-hover:bg-white/[0.08] flex flex-col relative overflow-hidden">
                  {/* Background Glow */}
                  <div className={`absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br ${cat.color} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity`} />
                  
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white mb-5 sm:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-xl`}>
                    <Icon size={24} className="sm:w-7 sm:h-7" />
                  </div>

                  <div className="flex justify-between items-start mb-3 sm:mb-4">
                    <h2 className="text-white font-bold text-lg sm:text-xl group-hover:text-cyan-400 transition-colors">
                      {cat.name}
                    </h2>
                    <span className="text-[10px] sm:text-xs font-semibold px-2 py-1 rounded-lg bg-white/5 text-slate-500 border border-white/5">
                      {cat.count} Items
                    </span>
                  </div>

                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8 flex-1 line-clamp-3">
                    {cat.desc}
                  </p>

                  <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 group-hover:gap-3 transition-all mt-auto pt-4 border-t border-white/5">
                    Explore Projects <ChevronRight size={14} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Custom Request Banner */}
        <div className="mt-12 sm:mt-20">
          <div className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-violet-500/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 blur-[100px] pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 text-center md:text-left">
              <div className="max-w-2xl">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
                  Can't find a <span className="text-violet-400">specific domain?</span>
                </h2>
                <p className="text-slate-400 text-sm sm:text-base">
                  We handle custom project requests across all engineering branches including 
                  Mechanical, Civil, Electronics, and specialized IT sub-domains.
                </p>
              </div>
              <Link href="/custom-request" className="btn-primary px-8 py-3.5 rounded-full text-sm font-semibold flex-shrink-0 flex items-center gap-2 w-full md:w-auto justify-center group-hover:scale-105 transition-transform">
                Request Custom Domain <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
