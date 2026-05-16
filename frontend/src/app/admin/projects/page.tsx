'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Pencil, Trash2, Search, AlertTriangle, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { projectApi, type Project } from '@/lib/api';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filtered, setFiltered] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setLoading(true);
    projectApi.getAll()
      .then(r => { setProjects(r.data); setFiltered(r.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!search) { setFiltered(projects); return; }
    setFiltered(projects.filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
    ));
  }, [search, projects]);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await projectApi.delete(deleteId);
      setProjects(prev => prev.filter(p => p.id !== deleteId));
      setDeleteId(null);
    } catch { alert('Failed to delete project.'); }
    finally { setDeleting(false); }
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white mb-0.5">Projects</h1>
          <p className="text-slate-400 text-xs sm:text-sm">{projects.length} projects in your catalogue</p>
        </div>
        <Link href="/admin/projects/create"
          className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold w-fit flex-shrink-0">
          <Plus size={15} /> Add Project
        </Link>
      </div>

      {/* Search */}
      <div className="relative max-w-xs sm:max-w-sm">
        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input type="text" value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search projects..."
          className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/50 transition-colors" />
      </div>

      {/* Table */}
      <div className="glass-card rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-12 flex items-center justify-center gap-3 text-slate-400">
            <Loader2 size={20} className="animate-spin" /> Loading projects...
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-10 sm:p-12 text-center">
            <p className="text-5xl mb-4">📂</p>
            <p className="text-white font-semibold mb-1">No projects found</p>
            <p className="text-slate-500 text-sm mb-6">{search ? 'Try a different search term' : 'Add your first project to get started'}</p>
            <Link href="/admin/projects/create" className="btn-primary px-6 py-2.5 rounded-xl text-sm font-semibold inline-flex items-center gap-2">
              <Plus size={15} /> Add First Project
            </Link>
          </div>
        ) : (
          /* Horizontal scroll wrapper for small screens */
          <div className="overflow-x-auto -webkit-overflow-scrolling-touch">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="border-b border-white/8">
                  <th className="text-left px-4 sm:px-6 py-3 text-slate-400 font-medium text-xs">Project</th>
                  <th className="text-left px-4 sm:px-6 py-3 text-slate-400 font-medium text-xs">Category</th>
                  <th className="text-left px-4 sm:px-6 py-3 text-slate-400 font-medium text-xs">Price</th>
                  <th className="text-left px-4 sm:px-6 py-3 text-slate-400 font-medium text-xs">Featured</th>
                  <th className="text-left px-4 sm:px-6 py-3 text-slate-400 font-medium text-xs">Added</th>
                  <th className="text-right px-4 sm:px-6 py-3 text-slate-400 font-medium text-xs">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(project => (
                  <tr key={project.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 sm:w-12 h-8 sm:h-9 rounded-lg overflow-hidden flex-shrink-0 bg-slate-800">
                          {project.thumbnail ? (
                            <Image src={project.thumbnail} alt={project.title} fill className="object-cover" sizes="48px" />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-slate-600 text-xs">📦</div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-white font-medium line-clamp-1 max-w-[160px] sm:max-w-[200px] text-xs sm:text-sm">{project.title}</p>
                          <p className="text-slate-500 text-xs line-clamp-1 max-w-[160px] sm:max-w-[200px]">
                            {project.technology?.split(',').slice(0,2).join(', ')}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4"><span className="tech-badge">{project.category}</span></td>
                    <td className="px-4 sm:px-6 py-4"><span className="text-white font-semibold text-sm">₹{project.price.toLocaleString()}</span></td>
                    <td className="px-4 sm:px-6 py-4">
                      {project.featured
                        ? <span className="text-xs px-2 py-1 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">⭐</span>
                        : <span className="text-xs text-slate-500">—</span>}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-slate-500 text-xs whitespace-nowrap">
                      {new Date(project.createdAt).toLocaleDateString('en-IN')}
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-center justify-end gap-1 sm:gap-2">
                        <Link href={`/admin/projects/${project.id}/edit`}
                          className="p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all" title="Edit">
                          <Pencil size={13} />
                        </Link>
                        <button onClick={() => setDeleteId(project.id)}
                          className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-all" title="Delete">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setDeleteId(null)} />
          <div className="glass-card rounded-t-2xl sm:rounded-2xl p-6 w-full sm:max-w-sm relative z-10 border border-red-500/20">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
                <AlertTriangle size={18} className="text-red-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold mb-1">Delete Project?</h3>
                <p className="text-slate-400 text-sm mb-5">This action cannot be undone.</p>
                <div className="flex gap-3">
                  <button onClick={() => setDeleteId(null)} className="btn-outline flex-1 py-2.5 rounded-xl text-sm font-semibold">Cancel</button>
                  <button onClick={handleDelete} disabled={deleting}
                    className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-red-500 hover:bg-red-600 text-white transition-colors flex items-center justify-center gap-2">
                    {deleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />} Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
