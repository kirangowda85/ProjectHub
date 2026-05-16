'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Loader2, Filter, ChevronDown, Phone, Mail, MessageSquare } from 'lucide-react';
import { inquiryApi, type Inquiry } from '@/lib/api';

const STATUSES = ['ALL', 'PENDING', 'CONTACTED', 'PAID', 'COMPLETED'];

const statusClass: Record<string, string> = {
  PENDING: 'status-pending', CONTACTED: 'status-contacted',
  PAID: 'status-paid', COMPLETED: 'status-completed',
};

function InquiriesContent() {
  const searchParams = useSearchParams();
  const initialStatus = searchParams.get('status') || 'ALL';

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [filtered, setFiltered] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeStatus, setActiveStatus] = useState(initialStatus);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    inquiryApi.getAll().then(r => setInquiries(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setFiltered(activeStatus === 'ALL' ? inquiries : inquiries.filter(i => i.status === activeStatus));
  }, [activeStatus, inquiries]);

  const handleStatusChange = async (id: number, status: string) => {
    setUpdatingId(id);
    try {
      const res = await inquiryApi.updateStatus(id, status);
      setInquiries(prev => prev.map(i => i.id === id ? res.data : i));
    } catch { alert('Failed to update status.'); }
    finally { setUpdatingId(null); }
  };

  const counts: Record<string, number> = { ALL: inquiries.length };
  STATUSES.slice(1).forEach(s => { counts[s] = inquiries.filter(i => i.status === s).length; });

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-white mb-1">Inquiries</h1>
        <p className="text-slate-400 text-xs sm:text-sm">{inquiries.length} total inquiries received</p>
      </div>

      {/* Status filter chips — scrollable on mobile */}
      <div className="flex items-center gap-3">
        <Filter size={14} className="text-slate-500 flex-shrink-0" />
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {STATUSES.map(s => (
            <button key={s} onClick={() => setActiveStatus(s)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] sm:text-xs font-bold transition-all flex-shrink-0 border ${
                activeStatus === s
                  ? 'bg-gradient-to-r from-cyan-500 to-violet-500 text-white border-transparent shadow-lg'
                  : 'glass-card text-slate-400 hover:text-white border-white/10'
              }`}>
              {s}
              <span className={`text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full ${activeStatus === s ? 'bg-white/20' : 'bg-white/10'}`}>
                {counts[s] ?? 0}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="glass-card rounded-2xl overflow-hidden shadow-2xl">
        {loading ? (
          <div className="p-16 flex flex-col items-center justify-center gap-4 text-slate-400">
            <Loader2 size={24} className="animate-spin text-cyan-400" />
            <p className="text-xs uppercase tracking-widest font-bold">Loading inquiries...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-16 text-center">
            <p className="text-5xl sm:text-6xl mb-6 opacity-30 grayscale">📬</p>
            <p className="text-white font-bold text-lg mb-1">No inquiries found</p>
            <p className="text-slate-500 text-sm max-w-xs mx-auto">There are no inquiries in the "{activeStatus.toLowerCase()}" category yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto -webkit-overflow-scrolling-touch">
            <table className="w-full text-sm min-w-[800px]">
              <thead>
                <tr className="border-b border-white/8 bg-white/2">
                  <th className="text-left px-5 sm:px-6 py-4 text-slate-500 font-bold text-[10px] uppercase tracking-wider">Student</th>
                  <th className="text-left px-5 sm:px-6 py-4 text-slate-500 font-bold text-[10px] uppercase tracking-wider">Project Title</th>
                  <th className="text-left px-5 sm:px-6 py-4 text-slate-500 font-bold text-[10px] uppercase tracking-wider">Contact</th>
                  <th className="text-left px-5 sm:px-6 py-4 text-slate-500 font-bold text-[10px] uppercase tracking-wider">College</th>
                  <th className="text-left px-5 sm:px-6 py-4 text-slate-500 font-bold text-[10px] uppercase tracking-wider">Status</th>
                  <th className="text-left px-5 sm:px-6 py-4 text-slate-500 font-bold text-[10px] uppercase tracking-wider">Update</th>
                  <th className="text-left px-5 sm:px-6 py-4 text-slate-500 font-bold text-[10px] uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(inq => (
                  <tr key={inq.id} className="border-b border-white/5 hover:bg-white/[0.04] transition-colors">
                    <td className="px-5 sm:px-6 py-4">
                      <p className="text-white font-bold text-sm mb-0.5">{inq.name}</p>
                      <p className="text-slate-500 text-[10px] flex items-center gap-1"><Mail size={10} /> {inq.email}</p>
                    </td>
                    <td className="px-5 sm:px-6 py-4">
                      <p className="text-slate-300 text-xs font-medium max-w-[200px] line-clamp-2 leading-relaxed">{inq.projectTitle}</p>
                    </td>
                    <td className="px-5 sm:px-6 py-4">
                      <a href={`tel:${inq.phone}`} className="text-cyan-400 text-xs font-bold hover:underline flex items-center gap-1 mb-1">
                        <Phone size={10} /> {inq.phone}
                      </a>
                      {inq.message && (
                        <div className="flex items-start gap-1 text-[10px] text-slate-500 max-w-[160px] line-clamp-1 italic" title={inq.message}>
                          <MessageSquare size={10} className="mt-0.5 flex-shrink-0" /> {inq.message}
                        </div>
                      )}
                    </td>
                    <td className="px-5 sm:px-6 py-4 text-slate-400 text-[11px] font-medium">{inq.college}</td>
                    <td className="px-5 sm:px-6 py-4">
                      <span className={`text-[9px] sm:text-[10px] px-2.5 py-1 rounded-full font-black tracking-tight ${statusClass[inq.status]}`}>
                        {inq.status}
                      </span>
                    </td>
                    <td className="px-5 sm:px-6 py-4">
                      <div className="relative">
                        {updatingId === inq.id ? (
                          <div className="flex items-center gap-2 text-[10px] text-cyan-400 font-bold">
                            <Loader2 size={12} className="animate-spin" /> Saving...
                          </div>
                        ) : (
                          <select
                            value={inq.status}
                            onChange={e => handleStatusChange(inq.id, e.target.value)}
                            className="text-[10px] font-bold bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-cyan-400/50 cursor-pointer hover:bg-white/10 transition-colors"
                            style={{ background: '#0d1226' }}
                          >
                            {STATUSES.slice(1).map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        )}
                      </div>
                    </td>
                    <td className="px-5 sm:px-6 py-4 text-slate-500 text-[11px] whitespace-nowrap font-medium">
                      {new Date(inq.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminInquiriesPage() {
  return (
    <Suspense fallback={<div className="p-16 flex justify-center"><Loader2 size={24} className="animate-spin text-slate-400" /></div>}>
      <InquiriesContent />
    </Suspense>
  );
}
