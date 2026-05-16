import Link from 'next/link';
import { Code2, Target, Heart, Users, Award, ChevronRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us – ProjectHub',
  description: 'Learn about ProjectHub – our mission to help engineering students succeed with high-quality academic projects.',
};

const TEAM = [
  { name: 'Rahul Verma', role: 'Founder & Lead Dev', avatar: 'RV', bg: 'from-cyan-500 to-blue-600' },
  { name: 'Ankit Singh', role: 'Full Stack Architect', avatar: 'AS', bg: 'from-violet-500 to-purple-600' },
  { name: 'Pooja Jain', role: 'UI/UX & Frontend', avatar: 'PJ', bg: 'from-pink-500 to-rose-600' },
  { name: 'Deepak Rao', role: 'AI/ML Specialist', avatar: 'DR', bg: 'from-green-500 to-emerald-600' },
];

const VALUES = [
  { icon: Target, title: 'Our Mission', desc: 'To empower every engineering student with professionally built projects that help them stand out.' },
  { icon: Heart, title: 'Our Passion', desc: 'We are developers who were once students. We understand the pressure and want to make it easier.' },
  { icon: Users, title: 'Our Community', desc: 'Over 10,000 students from top engineering colleges trust ProjectHub for their project needs.' },
  { icon: Award, title: 'Our Quality', desc: 'Every project is peer-reviewed, documented, and tested. We guarantee clean, working code.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-16 px-4 sm:px-6" style={{ background: 'var(--bg-primary)' }}>
      {/* Hero */}
      <section className="mb-12 sm:mb-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Code2 size={28} className="text-white" />
          </div>
          <p className="text-[10px] sm:text-xs text-cyan-400 font-semibold uppercase tracking-[0.2em] mb-3">Our Story</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            About <span className="gradient-text">ProjectHub</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-lg leading-relaxed max-w-2xl mx-auto px-2">
            ProjectHub was born out of a simple frustration — finding good, well-documented engineering projects
            is hard. We built the platform we wished we had during our college days.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="mb-12 sm:mb-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {VALUES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="glass-card rounded-2xl p-5 sm:p-6 border border-white/8 hover:border-violet-500/30 transition-all duration-300">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-white/10 flex items-center justify-center mb-4">
                <Icon size={18} className="text-cyan-400 sm:w-5 sm:h-5" />
              </div>
              <h3 className="text-white font-bold text-base sm:text-lg mb-2">{title}</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story Content */}
      <section className="mb-12 sm:mb-20 max-w-4xl mx-auto">
        <div className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-white/8 relative overflow-hidden">
          <div className="absolute -left-10 -top-10 w-40 h-40 bg-cyan-500/5 blur-3xl pointer-events-none" />
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-3">
            The <span className="gradient-text">ProjectHub</span> Story
          </h2>
          <div className="space-y-4 sm:space-y-5 text-slate-400 leading-relaxed text-xs sm:text-sm">
            <p>It started in 2022 when three engineering students were struggling to find a quality final year project. The options were overpriced, poorly documented, or simply didn't work.</p>
            <p>We decided to build them ourselves – clean code, proper documentation, and full support. When friends started asking for our code, we realized there was a real need.</p>
            <p>Today, ProjectHub has helped over <span className="text-white font-semibold">10,000 students</span> across India. We offer everything from AI/ML to Full Stack and Android projects.</p>
            <p>Our process is simple: browse, inquire, and our team personally reaches out within 24 hours. No automated checkout – just human-to-human service.</p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mb-12 sm:mb-20 max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
            Meet the <span className="gradient-text">Team</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">Experienced developers passionate about student success</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {TEAM.map((member) => (
            <div key={member.name} className="glass-card rounded-2xl p-5 sm:p-6 text-center hover:border-violet-500/30 transition-all duration-300">
              <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${member.bg} flex items-center justify-center text-white font-bold text-lg mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                {member.avatar}
              </div>
              <h3 className="text-white font-bold text-sm sm:text-base mb-1">{member.name}</h3>
              <p className="text-slate-500 text-[10px] sm:text-xs">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto text-center">
        <div className="glass-card rounded-2xl sm:rounded-3xl p-8 sm:p-12 border border-white/8">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">Ready to Get Started? 🚀</h2>
          <p className="text-slate-400 text-sm sm:text-base mb-8">Browse 500+ engineering projects and find your perfect match.</p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="/projects" className="btn-primary px-8 py-3.5 rounded-full text-sm font-semibold flex items-center justify-center gap-2">
              Browse Projects <ChevronRight size={14} />
            </Link>
            <Link href="/contact" className="btn-outline px-8 py-3.5 rounded-full text-sm font-semibold flex items-center justify-center">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
