'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Phone, School, Loader2, ArrowRight, Code2 } from 'lucide-react';
import { authApi } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', phone: '', college: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await authApi.register(formData);
      login(res.data);
      router.push('/my-projects');
    } catch (err: any) {
      setError(err.response?.data || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 sm:pt-32 pb-16 px-4 flex items-center justify-center">
      {/* Background Decor */}
      <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-cyan-600/5 blur-[100px] pointer-events-none" />
      
      <div className="w-full max-w-xl relative">
        <div className="glass-card rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          <div className="h-1.5 w-full bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500" />
          <div className="p-8 sm:p-10">
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Code2 size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">Create Account</h1>
              <p className="text-slate-400 text-sm">Join the community and start building</p>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-400/10 border border-red-400/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-[10px] text-slate-500 mb-1.5 font-bold uppercase tracking-wider ml-1">Full Name</label>
                  <div className="relative">
                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                      placeholder="John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-3.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/50 transition-all shadow-inner"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-slate-500 mb-1.5 font-bold uppercase tracking-wider ml-1">Email Address</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                      placeholder="name@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-3.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/50 transition-all shadow-inner"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-slate-500 mb-1.5 font-bold uppercase tracking-wider ml-1">Password</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="password" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})}
                      placeholder="••••••••"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-3.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/50 transition-all shadow-inner"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-slate-500 mb-1.5 font-bold uppercase tracking-wider ml-1">WhatsApp Number</label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                      placeholder="+91 99999 99999"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-3.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/50 transition-all shadow-inner"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-slate-500 mb-1.5 font-bold uppercase tracking-wider ml-1">College Name</label>
                  <div className="relative">
                    <School size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text" required value={formData.college} onChange={e => setFormData({...formData, college: e.target.value})}
                      placeholder="IIT Mumbai"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-3.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/50 transition-all shadow-inner"
                    />
                  </div>
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-bold shadow-xl mt-4">
                {loading ? <><Loader2 size={18} className="animate-spin" /> Creating Account...</> : <>Register Now <ArrowRight size={16} /></>}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-white/5 text-center">
              <p className="text-slate-500 text-sm">
                Already have an account?{' '}
                <Link href="/login" className="text-cyan-400 hover:text-cyan-300 font-bold transition-colors">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
