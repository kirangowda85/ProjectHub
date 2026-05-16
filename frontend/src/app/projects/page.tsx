'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { projectApi, type Project } from '@/lib/api';
import ProjectCard from '@/components/ProjectCard';

const CATEGORIES = ['All', 'AI/ML', 'Full Stack', 'Java', 'Python', 'MERN'];

function ProjectsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [projects, setProjects] = useState<Project[]>([]);
  const [filtered, setFiltered] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    projectApi.getAll()
      .then(r => { setProjects(r.data); setFiltered(r.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = projects;
    if (category !== 'All') result = result.filter(p => p.category === category);
    if (search) result = result.filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.technology.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  }, [category, search, projects]);

  return (
    <div className="min-h-screen pt-20 sm:pt-24 px-4 sm:px-6 pb-16 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 sm:mb-10">
        <p className="text-xs text-cyan-400 font-semibold uppercase tracking-widest mb-2">Our Collection</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 sm:mb-3">
          All <span className="gradient-text">Projects</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base">Browse {projects.length}+ engineering projects across all categories</p>
      </div>

      {/* Search + Filters */}
      <div className="glass-card rounded-2xl p-3 sm:p-4 mb-6 sm:mb-8 space-y-3">
        {/* Search */}
        <div className="relative">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by title or technology..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-10 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/50 transition-colors" />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
              <X size={14} />
            </button>
          )}
        </div>

        {/* Category chips — horizontally scrollable on mobile */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={13} className="text-slate-400 flex-shrink-0" />
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex-shrink-0 ${
                  category === cat
                    ? 'bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-lg'
                    : 'glass-card text-slate-400 hover:text-white border border-white/10'
                }`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs sm:text-sm text-slate-500 mb-4 sm:mb-6">
        Showing <span className="text-white font-medium">{filtered.length}</span> projects
        {category !== 'All' && <> in <span className="text-cyan-400">{category}</span></>}
        {search && <> matching "<span className="text-cyan-400">{search}</span>"</>}
      </p>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[1,2,3,4,5,6].map(i => <div key={i} className="glass-card rounded-2xl h-72 sm:h-80 animate-pulse" />)}
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filtered.map(project => <ProjectCard key={project.id} project={project} />)}
        </div>
      ) : (
        <div className="text-center py-16 sm:py-24">
          <div className="text-5xl sm:text-6xl mb-4">🔍</div>
          <h3 className="text-white font-semibold text-lg sm:text-xl mb-2">No Projects Found</h3>
          <p className="text-slate-500 text-sm mb-6">Try changing your search or filter criteria</p>
          <button onClick={() => { setSearch(''); setCategory('All'); }}
            className="btn-primary px-6 py-2.5 rounded-full text-sm font-semibold">
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-24 flex items-center justify-center"><div className="text-slate-400 text-sm">Loading...</div></div>}>
      <ProjectsContent />
    </Suspense>
  );
}
