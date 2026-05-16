'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FolderOpen, MessageSquare, Clock, PhoneCall, CreditCard, CheckCircle2, ArrowRight, TrendingUp } from 'lucide-react';
import { inquiryApi, type DashboardStats, type Inquiry } from '@/lib/api';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recent, setRecent] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      inquiryApi.getStats(),
      inquiryApi.getAll(),
    ]).then(([statsRes, inquiriesRes]) => {
      setStats(statsRes.data);
      setRecent(inquiriesRes.data.slice(0, 5));
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      PENDING: 'status-pending',
      CONTACTED: 'status-contacted',
      PAID: 'status-paid',
      COMPLETED: 'status-completed',
    };
    return (
      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${map[status] || ''}`}>
        {status}
      </span>
    );
  };

  const STAT_CARDS = stats ? [
    { label: 'Total Projects', value: stats.totalProjects, icon: FolderOpen, color: 'from-cyan-500 to-blue-600', bg: 'rgba(6,182,212,0.1)', href: '/admin/projects' },
    { label: 'Total Inquiries', value: stats.totalInquiries, icon: MessageSquare, color: 'from-violet-500 to-purple-600', bg: 'rgba(139,92,246,0.1)', href: '/admin/inquiries' },
    { label: 'Pending', value: stats.pendingInquiries, icon: Clock, color: 'from-yellow-500 to-orange-500', bg: 'rgba(234,179,8,0.1)', href: '/admin/inquiries?status=PENDING' },
    { label: 'Contacted', value: stats.contactedInquiries, icon: PhoneCall, color: 'from-blue-500 to-indigo-600', bg: 'rgba(59,130,246,0.1)', href: '/admin/inquiries?status=CONTACTED' },
    { label: 'Paid', value: stats.paidInquiries, icon: CreditCard, color: 'from-green-500 to-emerald-600', bg: 'rgba(16,185,129,0.1)', href: '/admin/inquiries?status=PAID' },
    { label: 'Completed', value: stats.completedInquiries, icon: CheckCircle2, color: 'from-pink-500 to-rose-600', bg: 'rgba(236,72,153,0.1)', href: '/admin/inquiries?status=COMPLETED' },
  ] : [];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-white mb-1">Dashboard</h1>
        <p className="text-slate-400 text-xs sm:text-sm">Overview of your ProjectHub platform</p>
      </div>

      {/* Stats Grid */}
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {[1,2,3,4,5,6].map(i => <div key={i} className="glass-card rounded-xl sm:rounded-2xl h-24 sm:h-28 animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {STAT_CARDS.map(({ label, value, icon: Icon, color, bg, href }) => (
            <Link key={label} href={href} className="gradient-border group block">
              <div className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-5 h-full transition-all group-hover:bg-white/[0.07]" style={{ background: bg }}>
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}>
                    <Icon size={16} className="text-white" />
                  </div>
                  <ArrowRight size={12} className="text-slate-600 group-hover:text-slate-400 transition-colors mt-1" />
                </div>
                <p className="text-2xl sm:text-3xl font-black text-white mb-0.5">{value}</p>
                <p className="text-slate-500 text-[10px] sm:text-xs uppercase tracking-wider font-semibold">{label}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Quick Actions + Pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-card rounded-2xl p-5 sm:p-6">
          <h2 className="text-white font-bold text-sm sm:text-base mb-5 flex items-center gap-2">
            <TrendingUp size={16} className="text-cyan-400" /> Quick Actions
          </h2>
          <div className="space-y-3">
            <Link href="/admin/projects/create" className="btn-primary w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs sm:text-sm font-bold">
              + Add New Project
            </Link>
            <Link href="/admin/inquiries" className="btn-outline w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs sm:text-sm font-bold">
              View All Inquiries
            </Link>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 sm:p-6">
          <h2 className="text-white font-bold text-sm sm:text-base mb-5">Inquiry Pipeline</h2>
          {stats && (
            <div className="space-y-4">
              {[
                { label: 'Pending', value: stats.pendingInquiries, total: stats.totalInquiries, color: 'bg-yellow-500' },
                { label: 'Contacted', value: stats.contactedInquiries, total: stats.totalInquiries, color: 'bg-blue-500' },
                { label: 'Paid', value: stats.paidInquiries, total: stats.totalInquiries, color: 'bg-green-500' },
                { label: 'Completed', value: stats.completedInquiries, total: stats.totalInquiries, color: 'bg-violet-500' },
              ].map(({ label, value, total, color }) => (
                <div key={label}>
                  <div className="flex justify-between text-[10px] sm:text-xs mb-1.5">
                    <span className="text-slate-400 font-medium uppercase tracking-wider">{label}</span>
                    <span className="text-white font-bold">{value}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${color}`}
                      style={{ width: total > 0 ? `${(value / total) * 100}%` : '0%' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Inquiries Table */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="px-5 sm:px-6 py-4 border-b border-white/8 flex items-center justify-between">
          <h2 className="text-white font-bold text-sm sm:text-base">Recent Inquiries</h2>
          <Link href="/admin/inquiries" className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1">
            View All <ArrowRight size={12} />
          </Link>
        </div>
        
        {loading ? (
          <div className="p-6 space-y-3">
            {[1,2,3].map(i => <div key={i} className="h-12 bg-white/3 rounded-xl animate-pulse" />)}
          </div>
        ) : recent.length === 0 ? (
          <div className="p-12 text-center text-slate-600">
            <MessageSquare size={32} className="mx-auto mb-3 opacity-20" />
            <p className="text-sm">No inquiries yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto -webkit-overflow-scrolling-touch">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="border-b border-white/8">
                  <th className="text-left px-5 sm:px-6 py-3 text-slate-500 font-bold text-[10px] uppercase tracking-wider">Student</th>
                  <th className="text-left px-5 sm:px-6 py-3 text-slate-500 font-bold text-[10px] uppercase tracking-wider">Project</th>
                  <th className="text-left px-5 sm:px-6 py-3 text-slate-500 font-bold text-[10px] uppercase tracking-wider">College</th>
                  <th className="text-left px-5 sm:px-6 py-3 text-slate-500 font-bold text-[10px] uppercase tracking-wider">Status</th>
                  <th className="text-left px-5 sm:px-6 py-3 text-slate-500 font-bold text-[10px] uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((inq) => (
                  <tr key={inq.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                    <td className="px-5 sm:px-6 py-4">
                      <p className="text-white font-semibold text-xs sm:text-sm truncate max-w-[140px]">{inq.name}</p>
                      <p className="text-slate-500 text-[10px] truncate max-w-[140px]">{inq.email}</p>
                    </td>
                    <td className="px-5 sm:px-6 py-4 text-slate-300 text-[11px] max-w-xs truncate">{inq.projectTitle}</td>
                    <td className="px-5 sm:px-6 py-4 text-slate-500 text-[11px] truncate max-w-[120px]">{inq.college}</td>
                    <td className="px-5 sm:px-6 py-4">{statusBadge(inq.status)}</td>
                    <td className="px-5 sm:px-6 py-4 text-slate-500 text-[11px] whitespace-nowrap">
                      {new Date(inq.createdAt).toLocaleDateString('en-IN')}
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
