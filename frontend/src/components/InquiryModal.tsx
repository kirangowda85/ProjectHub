'use client';

import { useState } from 'react';
import { X, Send, Loader2 } from 'lucide-react';
import { inquiryApi, type InquiryRequest } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface InquiryModalProps {
  projectId: number;
  projectTitle: string;
  onClose: () => void;
}

export default function InquiryModal({ projectId, projectTitle, onClose }: InquiryModalProps) {
  const { user } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState<Omit<InquiryRequest, 'projectId'>>({
    name: user?.name || '', 
    email: user?.email || '', 
    phone: user?.phone || '', 
    college: user?.college || '', 
    message: '',
    userId: user?.id
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await inquiryApi.create({ ...form, projectId });
      setSuccess(true);
    } catch {
      setError('Failed to submit inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    /* Overlay */
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Sheet / Modal */}
      <div
        className="modal-sheet glass-card border border-white/10 w-full sm:max-w-lg relative z-10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gradient bar */}
        <div className="h-1 w-full bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 flex-shrink-0" />

        {/* Drag handle on mobile */}
        <div className="flex justify-center pt-2 pb-0 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-white/20" />
        </div>

        <div className="p-5 sm:p-6 overflow-y-auto max-h-[85vh] sm:max-h-none">
          {/* Header */}
          <div className="flex items-start justify-between mb-5">
            <div>
              <h2 className="text-white font-bold text-lg sm:text-xl mb-0.5">Request Project</h2>
              <p className="text-slate-400 text-xs sm:text-sm line-clamp-1 max-w-[280px]">{projectTitle}</p>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors p-1 flex-shrink-0">
              <X size={20} />
            </button>
          </div>

          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✅</span>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Inquiry Submitted!</h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">
                Our team will contact you within 24 hours on your provided WhatsApp/email.
              </p>
              <button onClick={onClose} className="mt-6 btn-primary px-6 py-2.5 rounded-full text-sm font-semibold">
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {error && (
                <div className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
                  {error}
                </div>
              )}

              {/* Row 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 font-medium">Full Name *</label>
                  <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/50 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 font-medium">Email *</label>
                  <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/50 transition-colors" />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 font-medium">WhatsApp / Phone *</label>
                  <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/50 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 font-medium">College *</label>
                  <input type="text" required value={form.college} onChange={(e) => setForm({ ...form, college: e.target.value })}
                    placeholder="IIT Delhi"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/50 transition-colors" />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs text-slate-400 mb-1.5 font-medium">Message (Optional)</label>
                <textarea rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Any specific requirements or questions..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/50 transition-colors resize-none" />
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                ⚡ Our admin will contact you personally to complete the transaction and deliver the project files.
              </p>

              {!user && (
                <div className="p-3 rounded-xl bg-cyan-400/5 border border-cyan-400/10 text-[10px] text-slate-400">
                  💡 <span className="text-cyan-400 font-bold">Pro-tip:</span> <Link href="/login" className="underline hover:text-cyan-300">Sign in</Link> first to track your purchase status in the "My Projects" dashboard.
                </div>
              )}

              <button type="submit" disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold">
                {loading ? <><Loader2 size={16} className="animate-spin" /> Submitting...</> : <><Send size={16} /> Submit Inquiry</>}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
