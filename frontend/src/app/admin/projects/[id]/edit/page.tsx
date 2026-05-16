'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Loader2, ImagePlus, Link2, Star, Sparkles, ChevronRight } from 'lucide-react';
import { projectApi, type ProjectRequest } from '@/lib/api';

const CATEGORIES = ['AI/ML', 'Full Stack', 'Java', 'Python', 'MERN', 'Android', 'IoT', 'Blockchain'];

export default function EditProjectPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState<ProjectRequest>({
    title: '', description: '', category: 'AI/ML', technology: '',
    price: 0, thumbnail: '', screenshots: '', demoLink: '',
    features: '', includedFiles: '', featured: false,
    privateGithubLink: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    projectApi.getById(Number(id))
      .then(r => {
        const p = r.data;
        setForm({
          title: p.title,
          description: p.description,
          category: p.category,
          technology: p.technology,
          price: p.price,
          thumbnail: p.thumbnail || '',
          screenshots: p.screenshots || '',
          demoLink: p.demoLink || '',
          features: p.features || '',
          includedFiles: p.includedFiles || '',
          featured: p.featured,
          privateGithubLink: p.privateGithubLink || '',
        });
      })
      .catch(() => setError('Project not found.'))
      .finally(() => setLoading(false));
  }, [id]);

  const set = (key: keyof ProjectRequest, value: string | number | boolean) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await projectApi.update(Number(id), { ...form, price: Number(form.price) });
      router.push('/admin/projects');
    } catch {
      setError('Failed to update project. Please try again.');
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-32 px-4 gap-4">
      <Loader2 size={32} className="animate-spin text-cyan-400" />
      <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Fetching Project Data...</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between border-b border-white/5 pb-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/projects" className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-slate-400 hover:text-white transition-all active:scale-95">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Edit Project</h1>
            <p className="text-slate-500 text-[10px] sm:text-xs uppercase tracking-widest font-bold mt-0.5">Inventory #ID-{id}</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
          <Sparkles size={14} className="text-violet-400" /> Updating Catalogue
        </div>
      </div>

      {error && (
        <div className="text-red-400 text-xs sm:text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-5 py-4 flex items-center gap-3">
          <span className="text-lg">⚠️</span> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 pb-10">
        {/* Basic Info */}
        <div className="glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-8 space-y-5 sm:space-y-6 shadow-2xl">
          <h2 className="text-white font-bold text-sm sm:text-base border-b border-white/8 pb-4 mb-2 flex items-center gap-3">
            <span className="w-1.5 h-6 rounded-full bg-cyan-400" /> Basic Information
          </h2>

          <div>
            <label className="block text-[10px] sm:text-xs text-slate-500 mb-2 font-bold uppercase tracking-wider">Project Title *</label>
            <input
              type="text" required value={form.title}
              onChange={e => set('title', e.target.value)}
              placeholder="e.g. AI-Powered Attendance System"
              className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-5 py-3.5 sm:py-4 text-sm sm:text-base text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/50 transition-all shadow-inner"
            />
          </div>

          <div>
            <label className="block text-[10px] sm:text-xs text-slate-500 mb-2 font-bold uppercase tracking-wider">Project Description *</label>
            <textarea
              required rows={5} value={form.description}
              onChange={e => set('description', e.target.value)}
              placeholder="Describe the project goals..."
              className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-5 py-3.5 sm:py-4 text-sm sm:text-base text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/50 transition-all resize-none shadow-inner"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            <div>
              <label className="block text-[10px] sm:text-xs text-slate-500 mb-2 font-bold uppercase tracking-wider">Domain Category *</label>
              <div className="relative">
                <select
                  required value={form.category}
                  onChange={e => set('category', e.target.value)}
                  className="w-full appearance-none bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-5 py-3.5 sm:py-4 text-sm sm:text-base text-white focus:outline-none focus:border-cyan-400/50 transition-all cursor-pointer shadow-inner"
                  style={{ background: '#0d1226' }}
                >
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                  <ChevronRight size={18} className="rotate-90" />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-[10px] sm:text-xs text-slate-500 mb-2 font-bold uppercase tracking-wider">Sale Price (₹) *</label>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                <input
                  type="number" required min={0} value={form.price}
                  onChange={e => set('price', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl pl-10 pr-5 py-3.5 sm:py-4 text-sm sm:text-base text-white focus:outline-none focus:border-cyan-400/50 transition-all shadow-inner font-mono"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[10px] sm:text-xs text-slate-500 mb-2 font-bold uppercase tracking-wider">Core Technologies *</label>
            <input
              type="text" required value={form.technology}
              onChange={e => set('technology', e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-5 py-3.5 text-sm text-white focus:outline-none focus:border-cyan-400/50 transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Media */}
        <div className="glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-8 space-y-5 sm:space-y-6">
          <h2 className="text-white font-bold text-sm sm:text-base border-b border-white/8 pb-4 mb-2 flex items-center gap-3">
            <span className="w-1.5 h-6 rounded-full bg-violet-400" /> Media & Visuals
          </h2>

          <div>
            <label className="block text-[10px] sm:text-xs text-slate-500 mb-2 font-bold uppercase tracking-wider">Thumbnail Image URL</label>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <div className="w-full sm:flex-1">
                <input
                  type="url" value={form.thumbnail}
                  onChange={e => set('thumbnail', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-5 py-3.5 text-sm text-white focus:outline-none focus:border-cyan-400/50 transition-all shadow-inner"
                />
              </div>
              {form.thumbnail && (
                <div className="w-full sm:w-32 h-24 sm:h-20 rounded-xl overflow-hidden bg-slate-900 border border-white/10 flex-shrink-0">
                  <img src={form.thumbnail} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            <div>
              <label className="block text-[10px] sm:text-xs text-slate-500 mb-2 font-bold uppercase tracking-wider">Screenshots URL</label>
              <textarea rows={3} value={form.screenshots} onChange={e => set('screenshots', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-5 py-3 text-sm text-white focus:outline-none focus:border-cyan-400/50 transition-all shadow-inner" />
            </div>
            <div>
              <label className="block text-[10px] sm:text-xs text-slate-500 mb-2 font-bold uppercase tracking-wider">Demo / YouTube Link</label>
              <textarea rows={3} value={form.demoLink} onChange={e => set('demoLink', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-5 py-3 text-sm text-white focus:outline-none focus:border-cyan-400/50 transition-all shadow-inner" />
            </div>
          </div>
        </div>

        {/* Features & Files */}
        <div className="glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-8 space-y-5 sm:space-y-6">
          <h2 className="text-white font-bold text-sm sm:text-base border-b border-white/8 pb-4 mb-2 flex items-center gap-3">
            <span className="w-1.5 h-6 rounded-full bg-pink-400" /> Content & Visibility
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            <div>
              <label className="block text-[10px] sm:text-xs text-slate-500 mb-2 font-bold uppercase tracking-wider">Key Features</label>
              <textarea rows={3} value={form.features} onChange={e => set('features', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white focus:outline-none focus:border-pink-400/50 transition-all" />
            </div>
            <div>
              <label className="block text-[10px] sm:text-xs text-slate-500 mb-2 font-bold uppercase tracking-wider">Included Files</label>
              <textarea rows={3} value={form.includedFiles} onChange={e => set('includedFiles', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white focus:outline-none focus:border-pink-400/50 transition-all" />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-[10px] sm:text-xs text-slate-500 mb-2 font-bold uppercase tracking-wider">Private GitHub Repository Link</label>
              <div className="relative">
                <Github size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="url" value={form.privateGithubLink}
                  onChange={e => set('privateGithubLink', e.target.value)}
                  placeholder="https://github.com/your-org/private-repo"
                  className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl pl-12 pr-5 py-3.5 text-sm text-white focus:outline-none focus:border-cyan-400/50 transition-all shadow-inner"
                />
              </div>
              <p className="text-[10px] text-slate-600 mt-2 ml-1 italic">Only visible to users after payment is COMPLETED.</p>
            </div>

            <div className="flex items-center justify-between p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-violet-500/5 border border-violet-500/10 group cursor-pointer"
              onClick={() => set('featured', !form.featured)}>
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all ${form.featured ? 'bg-violet-500 text-white shadow-lg' : 'bg-white/5 text-slate-500'}`}>
                  <Star size={20} className={form.featured ? 'fill-white' : ''} />
                </div>
                <div>
                  <p className="text-white text-sm sm:text-base font-bold">Featured Listing</p>
                  <p className="text-slate-500 text-[10px] sm:text-xs font-medium">Show on homepage trending section</p>
                </div>
              </div>
              <div className={`relative w-12 h-6 sm:w-14 sm:h-7 rounded-full transition-colors flex-shrink-0 ${form.featured ? 'bg-violet-500' : 'bg-white/10'}`}>
                <div className={`absolute top-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white shadow-md transition-transform ${form.featured ? 'translate-x-7 sm:translate-x-8' : 'translate-x-1'}`} />
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
          <Link href="/admin/projects" className="btn-outline flex-1 flex items-center justify-center py-3.5 rounded-xl sm:rounded-2xl text-sm font-bold">
            Cancel Update
          </Link>
          <button
            type="submit" disabled={saving}
            className="btn-primary flex-[2] flex items-center justify-center gap-3 py-3.5 rounded-xl sm:rounded-2xl text-sm font-bold shadow-2xl"
          >
            {saving ? <><Loader2 size={18} className="animate-spin" /> Saving Changes...</> : <><Save size={18} /> Save & Publish Update</>}
          </button>
        </div>
      </form>
    </div>
  );
}
