'use client';

import { useState } from 'react';
import { Send, Loader2, Wand2, Lightbulb, Code2 } from 'lucide-react';
import Link from 'next/link';

export default function CustomRequestPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', college: '', title: '', description: '', timeline: '', budget: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setSuccess(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-16 px-4 sm:px-6" style={{ background: 'var(--bg-primary)' }}>
      {/* Orbs background */}
      <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-violet-600/10 blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-cyan-600/10 blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-violet-600 mb-5 sm:mb-6 border border-white/10 shadow-lg">
            <Wand2 size={24} className="text-white sm:w-7 sm:h-7" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Request a <span className="gradient-text-pink">Custom Project</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-lg leading-relaxed px-2">
            Can't find what you need in our catalogue? Tell us your requirements and our expert developers will build it for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10">
          {/* Left: Info */}
          <div className="lg:col-span-1 space-y-5 sm:space-y-6">
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/8 relative overflow-hidden group hover:border-violet-500/30 transition-all duration-300">
              <div className="absolute -right-6 -top-6 w-32 h-32 bg-violet-500/10 rounded-full blur-2xl group-hover:bg-violet-500/20 transition-colors" />
              <Lightbulb size={24} className="text-violet-400 mb-4" />
              <h3 className="text-white font-bold text-base sm:text-lg mb-2">Tailor-Made Solutions</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                Whether it's a unique final year project idea or a specific tech stack requirement, we've got you covered.
              </p>
              <ul className="space-y-3">
                {['100% Original Code', 'Complete Documentation', 'Setup Assistance', 'Post-delivery Support'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                    <CheckCircleIcon /> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/8">
              <Code2 size={24} className="text-cyan-400 mb-4" />
              <h3 className="text-white font-bold text-base sm:text-lg mb-4">Supported Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {['React', 'Next.js', 'Node.js', 'Spring Boot', 'Python', 'ML', 'Flutter', 'IoT'].map(tech => (
                  <span key={tech} className="tech-badge text-[10px] sm:text-[11px]">{tech}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500" />
              
              <div className="p-6 sm:p-10">
                {success ? (
                  <div className="text-center py-12 sm:py-16">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
                      <span className="text-3xl sm:text-4xl">🚀</span>
                    </div>
                    <h3 className="text-white font-bold text-xl sm:text-2xl mb-3">Request Submitted!</h3>
                    <p className="text-slate-400 max-w-md mx-auto mb-8 text-xs sm:text-sm leading-relaxed">
                      Our senior developer will review your requirements and contact you via WhatsApp/Email within 24 hours to discuss feasibility.
                    </p>
                    <button onClick={() => { setSuccess(false); setForm({ name: '', email: '', phone: '', college: '', title: '', description: '', timeline: '', budget: '' }); }} className="btn-primary px-8 py-3 rounded-full text-sm font-semibold">
                      Submit Another Request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                    <div>
                      <h3 className="text-white font-bold text-sm sm:text-base border-b border-white/10 pb-3 mb-5 flex items-center gap-2">
                        <span className="w-1 h-4 bg-violet-400 rounded-full" /> Personal Details
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                          <label className="block text-[10px] sm:text-xs text-slate-500 mb-1.5 font-bold uppercase tracking-wider">Full Name *</label>
                          <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                            placeholder="John Doe"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-400/50 transition-colors" />
                        </div>
                        <div>
                          <label className="block text-[10px] sm:text-xs text-slate-500 mb-1.5 font-bold uppercase tracking-wider">College Name *</label>
                          <input type="text" required value={form.college} onChange={e => setForm({ ...form, college: e.target.value })}
                            placeholder="Engineering College"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-400/50 transition-colors" />
                        </div>
                        <div>
                          <label className="block text-[10px] sm:text-xs text-slate-500 mb-1.5 font-bold uppercase tracking-wider">Email Address *</label>
                          <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                            placeholder="john@example.com"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-400/50 transition-colors" />
                        </div>
                        <div>
                          <label className="block text-[10px] sm:text-xs text-slate-500 mb-1.5 font-bold uppercase tracking-wider">WhatsApp Number *</label>
                          <input type="tel" required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                            placeholder="+91 99999 99999"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-400/50 transition-colors" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-white font-bold text-sm sm:text-base border-b border-white/10 pb-3 mb-5 flex items-center gap-2">
                        <span className="w-1 h-4 bg-cyan-400 rounded-full" /> Project Requirements
                      </h3>
                      <div className="space-y-5 sm:space-y-6">
                        <div>
                          <label className="block text-[10px] sm:text-xs text-slate-500 mb-1.5 font-bold uppercase tracking-wider">Project Title *</label>
                          <input type="text" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                            placeholder="e.g. Real-time Traffic Prediction using AI"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-400/50 transition-colors" />
                        </div>
                        <div>
                          <label className="block text-[10px] sm:text-xs text-slate-500 mb-1.5 font-bold uppercase tracking-wider">Description & Key Features *</label>
                          <textarea required rows={5} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                            placeholder="Describe what the project should do..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-400/50 transition-colors resize-none" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                          <div>
                            <label className="block text-[10px] sm:text-xs text-slate-500 mb-1.5 font-bold uppercase tracking-wider">Expected Timeline</label>
                            <input type="text" value={form.timeline} onChange={e => setForm({ ...form, timeline: e.target.value })}
                              placeholder="e.g. 2-3 weeks"
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-400/50 transition-colors" />
                          </div>
                          <div>
                            <label className="block text-[10px] sm:text-xs text-slate-500 mb-1.5 font-bold uppercase tracking-wider">Budget Range</label>
                            <input type="text" value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })}
                              placeholder="e.g. ₹5,000 - ₹8,000"
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-400/50 transition-colors" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button type="submit" disabled={loading} className="w-full group bg-gradient-to-r from-violet-600 to-pink-500 text-white flex items-center justify-center gap-3 py-4 rounded-xl text-sm sm:text-base font-bold shadow-xl hover:shadow-violet-500/20 hover:scale-[1.01] transition-all">
                        {loading ? <><Loader2 size={20} className="animate-spin" /> Submitting Request...</> : <><Send size={18} /> Request Custom Project</>}
                      </button>
                      <p className="text-center text-[10px] sm:text-xs text-slate-500 mt-4 leading-relaxed px-4">
                        Submitting a request is free. We will get back to you with a personalized proposal.
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-green-400 flex-shrink-0">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
}
