'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Zap, ChevronRight, Star } from 'lucide-react';
import { projectApi, type Project } from '@/lib/api';
import ProjectCard from '@/components/ProjectCard';

const CATEGORIES = [
  { name: 'AI/ML', icon: '🤖', desc: 'Machine learning & deep learning', color: 'from-cyan-500 to-blue-600' },
  { name: 'Full Stack', icon: '🌐', desc: 'End-to-end web applications', color: 'from-violet-500 to-purple-600' },
  { name: 'Java', icon: '☕', desc: 'Spring Boot & enterprise apps', color: 'from-orange-500 to-red-600' },
  { name: 'Python', icon: '🐍', desc: 'Django, Flask & automation', color: 'from-green-500 to-emerald-600' },
  { name: 'MERN', icon: '⚛️', desc: 'MongoDB, Express, React, Node', color: 'from-blue-500 to-indigo-600' },
];

const TESTIMONIALS = [
  { name: 'Arjun Sharma', college: 'VIT Vellore', text: 'Got my final year AI project with full documentation. Scored 95/100!', avatar: 'AS' },
  { name: 'Priya Mehta', college: 'BITS Pilani', text: 'ProjectHub is a lifesaver. The MERN stack project was production-ready.', avatar: 'PM' },
  { name: 'Rohit Kumar', college: 'NIT Trichy', text: 'Best platform for engineering projects. Exactly what I needed.', avatar: 'RK' },
  { name: 'Sneha Patel', college: 'DAIICT', text: 'Amazing experience! The project came with detailed documentation.', avatar: 'SP' },
];

const STATS = [
  { value: '500+', label: 'Projects' },
  { value: '10K+', label: 'Students' },
  { value: '50+', label: 'Categories' },
  { value: '4.9★', label: 'Rating' },
];

export default function HomePage() {
  const [featured, setFeatured] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    projectApi.getFeatured()
      .then(r => setFeatured(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="relative overflow-x-hidden" style={{ background: 'var(--bg-primary)' }}>
      {/* ── HERO ── */}
      <section className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-violet-600/10 blur-3xl animate-pulse pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-cyan-600/10 blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />
        
        <div className="absolute inset-0 opacity-10 sm:opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(139,92,246,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px sm:60px 60px'
          }}
        />

        <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 glass-card px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-6 sm:mb-8 border border-violet-500/30">
            <Sparkles size={12} className="text-violet-400" />
            <span className="text-[10px] sm:text-xs text-violet-300 font-medium tracking-wide">India's #1 Engineering Project Platform</span>
          </div>

          <h1 className="text-4xl xs:text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-tight">
            Get Your Dream<br />
            <span className="gradient-text">Engineering Project</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2">
            Browse hundreds of professionally built AI, Full Stack, Java, Python &amp; MERN projects. 
            Personalized support included with every purchase.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center px-4 sm:px-0">
            <Link href="/projects" className="btn-primary flex items-center justify-center gap-2 px-8 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-semibold">
              <Zap size={16} /> Explore Projects <ArrowRight size={14} />
            </Link>
            <Link href="/categories" className="btn-outline flex items-center justify-center gap-2 px-8 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-semibold">
              Browse Categories
            </Link>
          </div>

          <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {STATS.map((stat) => (
              <div key={stat.label} className="glass-card rounded-xl sm:rounded-2xl p-3 sm:p-4">
                <div className="text-xl sm:text-2xl font-bold gradient-text mb-0.5">{stat.value}</div>
                <div className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="section-padding px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-[10px] sm:text-xs text-cyan-400 font-semibold uppercase tracking-[0.2em] mb-3">What We Offer</p>
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">
              Browse by <span className="gradient-text">Category</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto px-4">
              Find projects tailored to your tech stack and academic requirements
            </p>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-5 gap-4">
            {CATEGORIES.map((cat) => (
              <Link key={cat.name} href={`/projects?category=${cat.name}`} className="gradient-border group h-full">
                <div className="glass-card rounded-2xl p-5 sm:p-6 text-center h-full transition-all duration-300 group-hover:bg-white/[0.07] flex flex-col items-center">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-xl sm:text-2xl mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    {cat.icon}
                  </div>
                  <h3 className="text-white font-semibold mb-2 text-sm sm:text-base">{cat.name}</h3>
                  <p className="text-slate-500 text-[11px] sm:text-xs leading-relaxed flex-1">{cat.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PROJECTS ── */}
      <section className="section-padding px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between mb-10 sm:mb-14 text-center sm:text-left gap-4">
            <div>
              <p className="text-[10px] sm:text-xs text-violet-400 font-semibold uppercase tracking-[0.2em] mb-3">Handpicked for You</p>
              <h2 className="text-2xl sm:text-4xl font-bold text-white">
                Trending <span className="gradient-text-pink">Projects</span>
              </h2>
            </div>
            <Link href="/projects" className="hidden sm:flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
              View All <ArrowRight size={14} />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[1, 2, 3].map(i => <div key={i} className="glass-card rounded-2xl h-72 sm:h-80 animate-pulse" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {featured.map(project => <ProjectCard key={project.id} project={project} />)}
            </div>
          )}

          <div className="text-center mt-10">
            <Link href="/projects" className="btn-outline px-8 py-3 rounded-full text-sm font-semibold inline-flex items-center gap-2 sm:hidden w-full justify-center">
              See All Projects <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section-padding px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-[10px] sm:text-xs text-pink-400 font-semibold uppercase tracking-[0.2em] mb-3">Student Reviews</p>
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">
              What Students <span className="gradient-text-pink">Say</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="glass-card rounded-2xl p-5 sm:p-6 flex flex-col gap-4">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(i => <Star key={i} size={11} className="text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed flex-1 italic">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center text-[10px] sm:text-xs font-bold text-white flex-shrink-0">
                    {t.avatar}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-white truncate">{t.name}</p>
                    <p className="text-[10px] sm:text-xs text-slate-500 truncate">{t.college}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-padding px-4 sm:px-6 pb-20 sm:pb-32">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl sm:rounded-[2.5rem] overflow-hidden group shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-indigo-600 to-cyan-600 opacity-90 group-hover:scale-105 transition-transform duration-700" />
            <div className="relative z-10 text-center py-12 sm:py-20 px-6 sm:px-8">
              <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
                Ready to Find Your Project? 🚀
              </h2>
              <p className="text-white/80 mb-8 sm:mb-10 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
                Browse our curated collection and submit an inquiry today. Our team will reach out to you within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center max-w-md mx-auto sm:max-w-none">
                <Link href="/projects" className="bg-white text-violet-700 font-bold px-8 py-3.5 rounded-full hover:bg-violet-50 transition-colors shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base">
                  Get Started Now <ArrowRight size={16} />
                </Link>
                <Link href="/contact" className="border border-white/30 text-white font-semibold px-8 py-3.5 rounded-full hover:bg-white/10 transition-colors backdrop-blur-sm text-sm sm:text-base">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
