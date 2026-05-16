'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2, MessageSquare } from 'lucide-react';

const CONTACT_INFO = [
  { icon: Mail, label: 'Email', value: 'admin@projecthub.dev', href: 'mailto:admin@projecthub.dev' },
  { icon: Phone, label: 'WhatsApp', value: '+91 99999 99999', href: 'https://wa.me/919999999999' },
  { icon: MapPin, label: 'Location', value: 'India (Remote Support)', href: '#' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate form submission
    await new Promise(r => setTimeout(r, 1500));
    setSuccess(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-16 px-4 sm:px-6" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-[10px] sm:text-xs text-cyan-400 font-semibold uppercase tracking-[0.2em] mb-3">Get In Touch</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Contact <span className="gradient-text">Us</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-lg max-w-xl mx-auto leading-relaxed px-2">
            Have a question about a project? Want to request something custom? We typically respond within 2 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Left: Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/8">
              <h2 className="text-white font-bold text-base sm:text-lg mb-6 flex items-center gap-2">
                <MessageSquare size={18} className="text-cyan-400" /> Contact Information
              </h2>
              <div className="space-y-5">
                {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
                  <a key={label} href={href} className="flex items-start gap-4 group">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-cyan-400/30 transition-colors">
                      <Icon size={16} className="text-cyan-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-slate-500 text-[10px] sm:text-xs mb-0.5 uppercase tracking-wider">{label}</p>
                      <p className="text-white text-sm sm:text-base group-hover:text-cyan-400 transition-colors truncate">{value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Hours */}
            <div className="glass-card rounded-2xl p-6 border border-white/8">
              <h3 className="text-white font-semibold text-sm sm:text-base mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Response Hours
              </h3>
              <div className="space-y-3">
                {[
                  { day: 'Mon – Fri', time: '9:00 AM – 9:00 PM IST' },
                  { day: 'Saturday', time: '10:00 AM – 6:00 PM IST' },
                  { day: 'Sunday', time: '12:00 PM – 5:00 PM IST' },
                ].map(h => (
                  <div key={h.day} className="flex justify-between text-xs sm:text-sm">
                    <span className="text-slate-400">{h.day}</span>
                    <span className="text-white font-medium">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="block glass-card rounded-2xl p-5 sm:p-6 border border-green-500/20 hover:border-green-500/40 transition-all duration-300 group shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform flex-shrink-0">💬</div>
                <div className="min-w-0">
                  <p className="text-white font-bold text-sm sm:text-base group-hover:text-green-400 transition-colors">Chat on WhatsApp</p>
                  <p className="text-slate-500 text-[10px] sm:text-xs">Get an instant response from our team</p>
                </div>
              </div>
            </a>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-3">
            <div className="glass-card rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500" />
              <div className="p-6 sm:p-10">
                <h2 className="text-white font-bold text-xl sm:text-2xl mb-6">Send a Message</h2>

                {success ? (
                  <div className="text-center py-12 sm:py-16">
                    <div className="text-5xl sm:text-6xl mb-6">🎉</div>
                    <h3 className="text-white font-bold text-2xl mb-3">Message Sent!</h3>
                    <p className="text-slate-400 max-w-xs mx-auto mb-8 text-sm leading-relaxed">
                      We've received your inquiry and will get back to you within 2 hours. Check your inbox!
                    </p>
                    <button onClick={() => { setSuccess(false); setForm({ name: '', email: '', subject: '', message: '' }); }} 
                      className="btn-outline px-8 py-3 rounded-full text-sm font-bold hover:bg-white/5">
                      Send Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                      <div>
                        <label className="block text-[10px] sm:text-xs text-slate-400 mb-1.5 font-semibold uppercase tracking-wider">Your Name *</label>
                        <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                          placeholder="John Doe"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm sm:text-base text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/50 transition-colors" />
                      </div>
                      <div>
                        <label className="block text-[10px] sm:text-xs text-slate-400 mb-1.5 font-semibold uppercase tracking-wider">Email *</label>
                        <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                          placeholder="john@example.com"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm sm:text-base text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/50 transition-colors" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] sm:text-xs text-slate-400 mb-1.5 font-semibold uppercase tracking-wider">Subject *</label>
                      <input type="text" required value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
                        placeholder="e.g. Question about AI project"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm sm:text-base text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/50 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[10px] sm:text-xs text-slate-400 mb-1.5 font-semibold uppercase tracking-wider">Message *</label>
                      <textarea required rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                        placeholder="Tell us what you're looking for in detail..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm sm:text-base text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/50 transition-colors resize-none" />
                    </div>
                    <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-3 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-bold shadow-xl">
                      {loading ? <><Loader2 size={18} className="animate-spin" /> Sending...</> : <><Send size={18} /> Send Message</>}
                    </button>
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
